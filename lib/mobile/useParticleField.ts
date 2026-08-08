"use client";

import { useEffect, type RefObject } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

/**
 * Lightweight ambient particle field for mobile hero/contact canvases.
 * Deliberately separate from the desktop Engine's field() — different
 * budget (~w*h/22000 dots vs desktop's density-scaled 110), no mouse
 * repulsion (touch has no hover), and gated to stop entirely when
 * off-screen so it never costs anything on sections the user hasn't
 * scrolled to.
 */
export function useParticleField(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let visible = true;
    let raf = 0;

    const seed = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width || canvas.clientWidth || 1;
      h = rect?.height || canvas.clientHeight || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(12, Math.round((w * h) / 22000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.5 + Math.random() * 1.3,
        a: 0.15 + Math.random() * 0.4,
      }));
    };
    seed();

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => seed());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || reduce || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -4) d.x = w + 4;
        else if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4;
        else if (d.y > h + 4) d.y = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(120,165,255,${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, 6.2832);
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [canvasRef]);
}
