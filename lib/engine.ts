"use client";

/**
 * Shared imperative engine for the portfolio's scroll/pointer-driven motion.
 *
 * Ported closely from the design reference's single `Component` class:
 * one rAF loop (read phase, then write phase), IntersectionObserver-gated
 * reveals, a spring cursor, magnetic/tilt hover, and canvas particle fields.
 * State that only motion needs (cursor position, sound on/off, stack-card
 * progress) is kept out of React entirely and written straight to the DOM,
 * quantised, so re-renders never fight the animation loop.
 *
 * Grows across the build: this file starts with the pieces every early
 * section needs (reveals, cursor, magnetic/tilt, particle fields, the
 * scroll-progress bar, sticky columns) and later tasks add the terminal,
 * AI demo, marquee pause-when-offscreen and Konami/dev-mode handlers as
 * those sections come online — mirroring how the reference class grew.
 */

import { emitToast } from "./toast";
import { emitDevMode, emitFps } from "./devMode";

interface FieldParticle {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  a: boolean;
}

interface StackItem {
  card: HTMLElement;
  next: HTMLElement | null;
  live: boolean;
  lastP: number;
}

interface ParallaxItem {
  el: HTMLElement;
  amt: number;
  live: boolean;
  lastV: number | null;
}

const EASE = "cubic-bezier(.16,1,.3,1)";

export class Engine {
  private root: HTMLElement;
  private particleDensity: number;
  reduce = false;
  soundOn = false;
  devMode = false;

  private timers: ReturnType<typeof setTimeout>[] = [];
  private raf = 0;
  private audio: AudioContext | null = null;
  private fields: (() => void)[] = [];
  private cursorTick: (() => void) | null = null;
  private mouseN: { x: number; y: number } | null = null;
  private frames = 0;
  private fpsT = 0;
  private cleanups: (() => void)[] = [];
  private konami: string[] = [];

  constructor(root: HTMLElement, particleDensity = 1) {
    this.root = root;
    this.particleDensity = particleDensity;
  }

  boot() {
    this.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.root.querySelectorAll<HTMLCanvasElement>("canvas[data-field]").forEach((c) => this.field(c));
    this.initReveals();
    this.initCursor();
    this.initInteractive();
    this.initStickyCols();
    this.initMarquees();
    this.initKeys();
    this.loop();

    document.body.style.overflow = "hidden";
    this.timers.push(
      setTimeout(
        () => {
          document.body.style.overflow = "";
          const l = this.root.querySelector<HTMLElement>("[data-loader]");
          if (l) l.style.display = "none";
        },
        this.reduce ? 200 : 4100
      )
    );
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.timers.forEach(clearTimeout);
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }

  /* ---------- particles ---------- */
  private field(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let CW = 0,
      CH = 0;
    let grad: CanvasGradient | null = null;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      CW = r.width;
      CH = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };
    if (!size()) {
      requestAnimationFrame(() => this.field(canvas));
      return;
    }
    grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 260);
    grad.addColorStop(0, "rgba(79,140,255,.085)");
    grad.addColorStop(1, "rgba(79,140,255,0)");

    let visible = true; // fail open: paint until an observer tells us we are off-screen
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
    }, { rootMargin: "120px" });
    io.observe(canvas);
    this.cleanups.push(() => io.disconnect());

    const N = Math.round(110 * this.particleDensity);
    const pts: FieldParticle[] = Array.from({ length: N }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.9 + 0.1,
      r: Math.random() * 1.35 + 0.35,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00016,
      a: i % 12 === 0,
    }));

    const m = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999 };
    const host = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.px = e.clientX - r.left;
      m.py = e.clientY - r.top;
      m.tx = (m.px / r.width - 0.5) * 2;
      m.ty = (m.py / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      m.tx = 0;
      m.ty = 0;
      m.px = -9999;
      m.py = -9999;
    };
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);
    this.cleanups.push(() => {
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    });

    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(size, 150);
    };
    addEventListener("resize", onResize);
    this.cleanups.push(() => removeEventListener("resize", onResize));

    const buckets: number[][] = Array.from({ length: 12 }, () => []);
    const draw = () => {
      if (!visible || !CW || !CH) return;
      const w = CW,
        h = CH;
      ctx.clearRect(0, 0, w, h);
      m.x += (m.tx - m.x) * 0.055;
      m.y += (m.ty - m.y) * 0.055;
      if (m.px > -9000 && grad) {
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(m.px, m.py);
        ctx.fillStyle = grad;
        ctx.fillRect(-260, -260, 520, 520);
        ctx.restore();
      }
      // bucket by colour x quantised alpha so N particles cost ~12 fills, not N
      const BUCKETS = 6;
      for (let i = 0; i < buckets.length; i++) buckets[i].length = 0;
      for (const p of pts) {
        if (!this.reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < -0.05) p.x += 1.1;
        else if (p.x > 1.05) p.x -= 1.1;
        if (p.y < -0.05) p.y += 1.1;
        else if (p.y > 1.05) p.y -= 1.1;
        const px = p.x * w + m.x * p.z * 32,
          py = p.y * h + m.y * p.z * 22;
        let a = 0.05 + p.z * 0.3;
        if (m.px > -9000) {
          const dx = px - m.px,
            dy = py - m.py,
            d2 = dx * dx + dy * dy;
          if (d2 < 32400) a += (1 - Math.sqrt(d2) / 180) * 0.42 * p.z;
        }
        const bi = Math.min(BUCKETS - 1, Math.round((Math.min(a, 0.85) / 0.85) * (BUCKETS - 1)));
        buckets[(p.a ? BUCKETS : 0) + bi].push(px, py, p.r * (0.45 + p.z));
      }
      for (let b = 0; b < buckets.length; b++) {
        const arr = buckets[b];
        if (!arr.length) continue;
        ctx.globalAlpha = ((b % BUCKETS) / (BUCKETS - 1)) * 0.85 || 0.04;
        ctx.fillStyle = b >= BUCKETS ? "#4F8CFF" : "#ffffff";
        ctx.beginPath();
        for (let i = 0; i < arr.length; i += 3) {
          ctx.moveTo(arr[i] + arr[i + 2], arr[i + 1]);
          ctx.arc(arr[i], arr[i + 1], arr[i + 2], 0, 6.2832);
        }
        ctx.fill();
      }
    };
    this.fields.push(draw);
  }

  /* ---------- reveals + counters + dividers ---------- */
  private initReveals() {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translate(0,0)";
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    this.root.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => io.observe(el));
    this.cleanups.push(() => io.disconnect());

    // fail open: if observers never fire, content must still be readable
    this.timers.push(
      setTimeout(() => {
        this.root.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => {
          if (getComputedStyle(el).opacity !== "0") return;
          el.style.transition = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        this.root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          if (el.textContent === "0") el.textContent = el.dataset.count ?? "0";
        });
        this.root.querySelectorAll<HTMLElement>("[data-divider]").forEach((el) => {
          el.style.transform = "scaleX(1)";
        });
      }, 1600)
    );

    const co = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          co.unobserve(e.target);
          const target = parseFloat((e.target as HTMLElement).dataset.count || "0") || 0;
          const t0 = performance.now(),
            dur = 1500;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur),
              v = 1 - Math.pow(1 - p, 3);
            (e.target as HTMLElement).textContent = String(Math.round(v * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.5 }
    );
    this.root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => co.observe(el));
    this.cleanups.push(() => co.disconnect());

    const fo = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transform = "scaleX(1)";
            fo.unobserve(e.target);
          }
        }),
      { threshold: 0.6 }
    );
    this.root.querySelectorAll<HTMLElement>("[data-divider]").forEach((el) => fo.observe(el));
    this.cleanups.push(() => fo.disconnect());
  }

  /* marquee rows only animate while on screen */
  initMarquees() {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const t = (e.target as HTMLElement).querySelector<HTMLElement>('[style*="vMarquee"], [data-marquee-track]');
          if (t) t.style.animationPlayState = e.isIntersecting ? "" : "paused";
        }),
      { rootMargin: "80px" }
    );
    this.root.querySelectorAll<HTMLElement>("[data-marquee-row]").forEach((el) => io.observe(el));
    this.cleanups.push(() => io.disconnect());
  }

  /**
   * Career journey panel: page-scroll driven (no inner scroll container).
   * Progress is where a fixed viewport "focus line" (50% of innerHeight)
   * falls across the rows column's own bounding rect — that single number
   * drives the fill height, the orb's top, AND which row counts as active
   * (nearest row-center to the same focus line). One source of truth, so
   * the orb and the highlighted row can't desync. Read once per frame in
   * Engine.loop()'s shared read phase, written in its write phase —
   * folded into that loop's step() rather than its own listener, since
   * this now reads page scroll like everything else that loop drives.
   */
  private prepExperience(): {
    read: () => { p: number; idx: number } | null;
    write: (v: { p: number; idx: number }) => void;
  } | null {
    const root = this.root;
    const rowsCol = root.querySelector<HTMLElement>("[data-exp-rows]");
    if (!rowsCol) return null;
    const rows = [...rowsCol.querySelectorAll<HTMLElement>("[data-exp-row]")].map((row) => ({
      row,
      name: row.querySelector<HTMLElement>("[data-exp-name]"),
      date: row.querySelector<HTMLElement>("[data-exp-date]"),
      desc: row.querySelector<HTMLElement>("[data-exp-desc]"),
      pills: row.querySelector<HTMLElement>("[data-exp-pills]"),
    }));
    const fill = root.querySelector<HTMLElement>("[data-exp-fill]");
    const orb = root.querySelector<HTMLElement>("[data-exp-orb]");
    let lastP = -1,
      lastIdx = -1;

    const read = () => {
      const r = rowsCol.getBoundingClientRect();
      const focus = innerHeight * 0.5;
      const raw = r.height > 0 ? (focus - r.top) / r.height : 0;
      const p = Math.round(Math.max(0, Math.min(1, raw)) * 100);
      let idx = 0,
        bestDist = Infinity;
      rows.forEach((it, i) => {
        const rr = it.row.getBoundingClientRect();
        const dist = Math.abs(rr.top + rr.height / 2 - focus);
        if (dist < bestDist) {
          bestDist = dist;
          idx = i;
        }
      });
      return { p, idx };
    };

    const write = ({ p, idx }: { p: number; idx: number }) => {
      if (p !== lastP) {
        lastP = p;
        if (fill) fill.style.height = p + "%";
        if (orb) orb.style.top = p + "%";
      }
      if (idx === lastIdx) return;
      lastIdx = idx;
      rows.forEach((it, i) => {
        const on = i === idx;
        const passed = i < idx;
        it.row.style.opacity = on ? "1" : passed ? ".5" : ".32";
        it.row.style.transform = on ? "translateY(0)" : passed ? "translateY(-4px)" : "translateY(6px)";
        if (it.name) {
          it.name.style.color = on ? "#fff" : "#5a5a5a";
          it.name.style.transform = on ? "scale(1.02)" : "scale(1)";
        }
        if (it.date) it.date.style.color = on ? "#9dbcff" : "#6b6b6b";
        if (it.desc) it.desc.style.color = on ? "rgba(255,255,255,.78)" : "#6f6f6f";
        if (it.pills) {
          it.pills.style.transform = on ? "translateY(0)" : "translateY(6px)";
          it.pills.style.opacity = on ? "1" : ".55";
        }
      });
    };

    return { read, write };
  }

  /* sticky only while the columns are genuinely side by side */
  private initStickyCols() {
    const cols = [...this.root.querySelectorAll<HTMLElement>("[data-sticky-col]")];
    if (!cols.length) return;
    const apply = () =>
      cols.forEach((c) => {
        const sib = c.parentElement?.children;
        const sideBySide = !!sib && sib.length > 1 && sib[0].getBoundingClientRect().top === sib[1].getBoundingClientRect().top;
        c.style.position = sideBySide && innerWidth >= 1000 ? "sticky" : "static";
      });
    cols.forEach((c) => {
      c.style.position = "static";
    });
    requestAnimationFrame(apply);
    const onResize = () => {
      cols.forEach((c) => {
        c.style.position = "static";
      });
      requestAnimationFrame(apply);
    };
    addEventListener("resize", onResize);
    this.cleanups.push(() => removeEventListener("resize", onResize));
  }

  /* ---------- cursor / magnetic / tilt ---------- */
  private initCursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = this.root.querySelector<HTMLElement>("[data-cursor-dot]");
    const ring = this.root.querySelector<HTMLElement>("[data-cursor-ring]");
    const label = this.root.querySelector<HTMLElement>("[data-cursor-label]");
    if (!dot || !ring || !label) return;
    const c = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2 };
    let ctxt: string | undefined;
    const onMove = (e: PointerEvent) => {
      c.x = e.clientX;
      c.y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${c.x}px,${c.y}px)`;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const txt = t ? t.dataset.cursor : "";
      if (txt !== ctxt) {
        ctxt = txt;
        if (txt) {
          ring.style.width = ring.style.height = "58px";
          ring.style.margin = "-29px 0 0 -29px";
          ring.style.background = "#fff";
          ring.style.borderColor = "#fff";
          label.textContent = txt;
          label.style.opacity = "1";
        } else {
          ring.style.width = ring.style.height = "38px";
          ring.style.margin = "-19px 0 0 -19px";
          ring.style.background = "transparent";
          ring.style.borderColor = "rgba(255,255,255,.4)";
          label.style.opacity = "0";
        }
      }
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerleave", onLeave);
    this.cleanups.push(() => {
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerleave", onLeave);
    });
    this.cursorTick = () => {
      c.rx += (c.x - c.rx) * 0.17;
      c.ry += (c.y - c.ry) * 0.17;
      ring.style.transform = `translate(${c.rx}px,${c.ry}px)`;
    };
  }

  private initInteractive() {
    this.root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.38;
        el.style.transition = "transform .18s ease-out";
        el.style.transform = `translate(${dx}px,${dy}px)`;
      };
      const onLeave = () => {
        el.style.transition = `transform .6s ${EASE}`;
        el.style.transform = "translate(0,0)";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      this.cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    this.root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        el.style.transition = "transform .2s ease-out";
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const onLeave = () => {
        el.style.transition = `transform .8s ${EASE}`;
        el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      this.cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    this.root.querySelectorAll<HTMLElement>("a[href],button,[data-magnetic]").forEach((el) => {
      const onEnter = () => this.tick(880, 0.03);
      el.addEventListener("pointerenter", onEnter);
      this.cleanups.push(() => el.removeEventListener("pointerenter", onEnter));
    });

    const soundBtn = this.root.querySelector<HTMLElement>("[data-sound]");
    const soundDot = this.root.querySelector<HTMLElement>("[data-sound-dot]");
    if (soundBtn && soundDot) {
      const onClick = () => {
        this.soundOn = !this.soundOn;
        soundDot.style.background = this.soundOn ? "#4F8CFF" : "#3a3a3a";
        soundDot.style.boxShadow = this.soundOn ? "0 0 10px rgba(79,140,255,.9)" : "none";
        if (this.soundOn) this.tick(1200, 0.05);
      };
      soundBtn.addEventListener("click", onClick);
      this.cleanups.push(() => soundBtn.removeEventListener("click", onClick));
    }

    const logo = this.root.querySelector<HTMLElement>("[data-logo]");
    if (logo) {
      const onDbl = () => {
        const t = this.root.querySelector<HTMLElement>("#terminal");
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 60, behavior: "smooth" });
        setTimeout(() => this.focusTerminal(), 700);
        this.unlock("Hidden terminal found");
      };
      logo.addEventListener("dblclick", onDbl);
      this.cleanups.push(() => logo.removeEventListener("dblclick", onDbl));
    }
  }

  focusTerminal() {
    const i = this.root.querySelector<HTMLInputElement>("[data-term-input]");
    if (i) i.focus();
  }

  /* ---------- easter eggs ---------- */
  private initKeys() {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKeydown = (e: KeyboardEvent) => {
      this.konami.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      if (this.konami.length > code.length) this.konami.shift();
      if (this.konami.join(",") === code.join(",")) {
        this.devMode = !this.devMode;
        emitDevMode(this.devMode);
        this.unlock(this.devMode ? "Konami code — dev mode on" : "Dev mode off");
        this.konami = [];
      }
    };
    addEventListener("keydown", onKeydown);
    this.cleanups.push(() => removeEventListener("keydown", onKeydown));
  }

  tick(freq: number, gain: number) {
    if (!this.soundOn) return;
    try {
      this.audio = this.audio || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const o = this.audio.createOscillator(),
        g = this.audio.createGain();
      o.frequency.value = freq;
      o.type = "sine";
      g.gain.setValueAtTime(gain, this.audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.audio.currentTime + 0.08);
      o.connect(g).connect(this.audio.destination);
      o.start();
      o.stop(this.audio.currentTime + 0.09);
    } catch {
      /* no audio */
    }
  }

  unlock(text: string) {
    emitToast(text);
  }

  /* ---------- scroll engine ---------- */
  private loop() {
    const root = this.root;
    const bar = root.querySelector<HTMLElement>("[data-progress]");
    const hp = root.querySelector<HTMLElement>("[data-hero-parallax]");
    const parallax = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];

    // one flat list of {card, next, live} - no per-frame querySelectorAll
    const groups = [...root.querySelectorAll<HTMLElement>("[data-stack]")].map((s) => [
      ...s.querySelectorAll<HTMLElement>("[data-stack-card]"),
    ]);
    const items: StackItem[] = [];
    groups.forEach((cards) =>
      cards.forEach((card, i) => {
        const rec: StackItem = { card, next: cards[i + 1] || null, live: false, lastP: -1 };
        items.push(rec);
        const io = new IntersectionObserver((es) => {
          rec.live = es[0].isIntersecting;
        }, { rootMargin: "60% 0px" });
        io.observe(card);
        this.cleanups.push(() => io.disconnect());
      })
    );

    const pItems: ParallaxItem[] = parallax.map((el) => {
      const rec: ParallaxItem = { el, amt: parseFloat(el.dataset.parallax || "0"), live: false, lastV: null };
      const io = new IntersectionObserver((es) => {
        rec.live = es[0].isIntersecting;
      }, { rootMargin: "30% 0px" });
      io.observe(el);
      this.cleanups.push(() => io.disconnect());
      return rec;
    });

    const experience = this.prepExperience();

    let docMax = 0;
    const remeasure = () => {
      docMax = document.documentElement.scrollHeight - innerHeight;
    };
    remeasure();
    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(remeasure, 150);
    };
    addEventListener("resize", onResize);
    let sTO: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (!sTO)
        sTO = setTimeout(() => {
          sTO = null;
          remeasure();
        }, 400);
    };
    addEventListener("scroll", onScroll, { passive: true });
    this.cleanups.push(() => {
      removeEventListener("resize", onResize);
      removeEventListener("scroll", onScroll);
    });

    const step = () => {
      // ---- READ PHASE (no writes) ----
      const sy = scrollY,
        vh = innerHeight;
      const reads = items.map((it) => {
        if (!it.live || !it.next) return null;
        const r = it.card.getBoundingClientRect(),
          nr = it.next.getBoundingClientRect();
        return Math.max(0, Math.min(1, (r.bottom - nr.top) / (r.height * 0.9)));
      });
      const pReads = pItems.map((it) => {
        if (!it.live) return null;
        const r = it.el.getBoundingClientRect();
        return Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      });
      const expRead = experience?.read() ?? null;

      // ---- WRITE PHASE ----
      if (bar) bar.style.transform = `scaleX(${docMax > 0 ? Math.min(1, sy / docMax) : 0})`;
      if (experience && expRead) experience.write(expRead);
      items.forEach((it, i) => {
        const raw = reads[i];
        if (raw === null) {
          if (it.lastP !== 0) {
            it.card.style.transform = "none";
            it.card.style.filter = "none";
            it.lastP = 0;
          }
          return;
        }
        const p = Math.round(raw * 50) / 50; // quantise - skip sub-perceptual writes
        if (p === it.lastP) return;
        it.lastP = p;
        it.card.style.transform = p > 0 ? `scale(${1 - p * 0.045}) translateY(${-p * 10}px)` : "none";
        it.card.style.filter = p > 0.02 ? `brightness(${(1 - p * 0.34).toFixed(3)}) saturate(${(1 - p * 0.25).toFixed(3)})` : "none";
      });
      pItems.forEach((it, i) => {
        const c = pReads[i];
        if (c === null) return;
        const v = Math.round(c * it.amt);
        if (v === it.lastV) return;
        it.lastV = v;
        it.el.style.transform = `translateY(${v}px)`;
      });
      if (hp && this.mouseN) hp.style.transform = `translate(${(this.mouseN.x * 8).toFixed(1)}px,${(this.mouseN.y * 6).toFixed(1)}px)`;
      if (this.cursorTick) this.cursorTick();
      if (this.fields.length && !this.reduce) this.fields.forEach((f) => f());

      if (this.devMode) {
        const now = performance.now();
        this.frames++;
        if (!this.fpsT) this.fpsT = now;
        if (now - this.fpsT > 500) {
          emitFps(Math.round((this.frames * 1000) / (now - this.fpsT)));
          this.frames = 0;
          this.fpsT = now;
        }
      }
      this.raf = requestAnimationFrame(step);
    };
    const onPointerMove = (e: PointerEvent) => {
      this.mouseN = { x: (e.clientX / innerWidth - 0.5) * 2, y: (e.clientY / innerHeight - 0.5) * 2 };
    };
    addEventListener("pointermove", onPointerMove, { passive: true });
    this.cleanups.push(() => removeEventListener("pointermove", onPointerMove));
    step();
  }
}
