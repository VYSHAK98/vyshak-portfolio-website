"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { HELP, PROJECTS } from "@/lib/data";
import { emitToast } from "@/lib/toast";

interface Line {
  text: string;
  color: string;
}

const MUTED = "#8f8f8f";
const DIM = "#9B9B9B";
const BRIGHT = "#c9c9c9";
const WHITE = "#ffffff";
const ACCENT = "#4F8CFF";

const INITIAL_LINES: Line[] = [
  { text: "vyshak-portfolio v1.0.0 — interactive shell", color: MUTED },
  { text: "type 'help' to see what this thing does", color: MUTED },
  { text: "", color: MUTED },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const push = (newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
    requestAnimationFrame(() => {
      const box = scrollRef.current;
      if (box) box.scrollTop = box.scrollHeight;
    });
  };

  const runCommand = (raw: string) => {
    const cmd = raw.toLowerCase();
    const out: Line[] = [{ text: `➜  ${raw}`, color: ACCENT }];
    if (!cmd) {
      push([]);
      return;
    }
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "help") {
      out.push(...HELP.map(([c, d]) => ({ text: `  ${c.padEnd(12)} ${d}`, color: DIM })), { text: "", color: MUTED });
    } else if (cmd === "whoami") {
      out.push(
        { text: "Vyshak Harikumar", color: WHITE },
        { text: "  Frontend Engineer — React · TypeScript · Next.js", color: DIM },
        { text: "  AI interfaces, micro-frontend architecture, enterprise scale", color: DIM },
        { text: "  Bengaluru, India · 3+ years", color: DIM },
        { text: "", color: MUTED }
      );
    } else if (cmd === "skills") {
      out.push(
        { text: "core      React · TypeScript · Next.js · Redux · React Query", color: DIM },
        { text: "ui        Tailwind · Material UI · design systems", color: DIM },
        { text: "backend   Node · Express · MongoDB · PostgreSQL · REST", color: DIM },
        { text: "ai        STT · voice capture · streaming transcripts · LLM UX", color: DIM },
        { text: "craft     GSAP · Three.js · motion design", color: DIM },
        { text: "", color: MUTED }
      );
    } else if (cmd === "projects") {
      out.push(
        ...PROJECTS.map((p) => ({ text: `  ${p.index}  ${p.title.padEnd(30)} ${p.sector}`, color: BRIGHT })),
        { text: "", color: MUTED }
      );
    } else if (cmd === "experience") {
      out.push(
        { text: "  2025 → now   Verveo Solutions      Frontend Developer, platform lead", color: BRIGHT },
        { text: "  2024 → 2025  Navneet Toptech       SDE I, LMS at national scale", color: BRIGHT },
        { text: "  2024         Digiblock Network     Frontend, Solana platform E2E", color: BRIGHT },
        { text: "  2023         Luminar Technolab     MERN intern", color: BRIGHT },
        { text: "", color: MUTED }
      );
    } else if (cmd === "contact") {
      out.push(
        { text: "  email      vyshakharikumar98@gmail.com", color: BRIGHT },
        { text: "  github     github.com/VYSHAK98", color: BRIGHT },
        { text: "  linkedin   linkedin.com/in/vyshak-harikumar98", color: BRIGHT },
        { text: "", color: MUTED }
      );
    } else if (cmd === "hire" || cmd.includes("hire-vyshak")) {
      push(out);
      const seq = [
        { text: "  resolving candidates…", color: MUTED, d: 260 },
        { text: "  ✓ react            compatible", color: DIM, d: 520 },
        { text: "  ✓ typescript       compatible", color: DIM, d: 700 },
        { text: "  ✓ ai-interfaces    compatible", color: DIM, d: 880 },
        { text: "", color: MUTED, d: 1000 },
        { text: "  Hiring Successful ✦", color: ACCENT, d: 1200 },
        { text: "  reach out: vyshakharikumar98@gmail.com", color: WHITE, d: 1340 },
        { text: "", color: MUTED, d: 1400 },
      ];
      seq.forEach((l) => {
        timers.current.push(setTimeout(() => push([{ text: l.text, color: l.color }]), l.d));
      });
      timers.current.push(setTimeout(() => emitToast("npm run hire-vyshak — successful"), 1400));
      return;
    } else {
      out.push({ text: `  command not found: ${raw} — try 'help'`, color: MUTED }, { text: "", color: MUTED });
    }
    push(out);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = e.currentTarget.value.trim();
    e.currentTarget.value = "";
    runCommand(cmd);
  };

  return (
    <section id="terminal" data-screen-label="Terminal" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div data-rv className={styles.eyebrow}>
              08 — TERMINAL
            </div>
            <h2 data-rv className={styles.heading}>
              Prefer the command line?
            </h2>
          </div>
          <div data-rv className={styles.hint}>
            TRY: help · whoami · skills · projects · hire
          </div>
        </div>

        <div
          data-rv
          data-cursor="TYPE"
          onClick={() => inputRef.current?.focus()}
          className={styles.card}
        >
          <div className={styles.titlebar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.titlebarText}>vyshak@portfolio — zsh</span>
          </div>
          <div data-term-scroll ref={scrollRef} className={styles.scroll}>
            {lines.map((l, i) => (
              <div key={i} className={styles.line} style={{ color: l.color }}>
                {l.text}
              </div>
            ))}
            <div className={styles.inputRow}>
              <span className={styles.prompt}>➜</span>
              <input
                data-term-input
                ref={inputRef}
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
                onKeyDown={onKeyDown}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
