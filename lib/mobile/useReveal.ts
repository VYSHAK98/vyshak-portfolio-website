"use client";

import { useEffect, type RefObject } from "react";

/**
 * Mobile reveal-on-scroll: one IntersectionObserver over every [data-rv]
 * inside `containerRef`, plus the [data-count] count-up, exactly mirroring
 * the desktop engine's initReveals but scoped to the mobile subtree so it
 * doesn't double up with the desktop Engine (which never boots on mobile).
 */
export function useReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "none";
          io.unobserve(e.target);
        }),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => io.observe(el));

    const co = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          co.unobserve(e.target);
          const target = parseFloat((e.target as HTMLElement).dataset.count || "0") || 0;
          const t0 = performance.now();
          const dur = 1300;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const v = 1 - Math.pow(1 - p, 3);
            (e.target as HTMLElement).textContent = String(Math.round(v * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.5 }
    );
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => co.observe(el));

    // fail open
    const failOpen = setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => {
        if (getComputedStyle(el).opacity !== "0") return;
        el.style.transition = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (el.textContent === "0") el.textContent = el.dataset.count ?? "0";
      });
    }, 1600);

    return () => {
      io.disconnect();
      co.disconnect();
      clearTimeout(failOpen);
    };
  }, [containerRef]);
}
