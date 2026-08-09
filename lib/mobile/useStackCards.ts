"use client";

import { useEffect, type RefObject } from "react";

interface StackItem {
  card: HTMLElement;
  next: HTMLElement | null;
  live: boolean;
  lastP: number;
}

/**
 * Same sticky-card desaturate/scale-down transition as the desktop
 * Work section (Engine.loop's stack-card logic), ported 1:1 for
 * mobile's own card markup: as the next card's top overtakes the
 * current card's bottom, the current card scales down and desaturates
 * quantised to 1/50 steps, skipping writes when unchanged. Doesn't
 * touch the desktop Engine — this is the mobile tree's own rAF loop,
 * gated the same way (IntersectionObserver "live" flag) so it costs
 * nothing for off-screen cards.
 */
export function useStackCards(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = [...container.querySelectorAll<HTMLElement>("[data-stack-card]")];
    const items: StackItem[] = cards.map((card, i) => ({
      card,
      next: cards[i + 1] || null,
      live: false,
      lastP: -1,
    }));

    const observers = items.map((it) => {
      const io = new IntersectionObserver(
        (entries) => {
          it.live = entries[0]?.isIntersecting ?? false;
        },
        { rootMargin: "60% 0px" }
      );
      io.observe(it.card);
      return io;
    });

    let raf = 0;
    const step = () => {
      raf = requestAnimationFrame(step);
      // read phase
      const reads = items.map((it) => {
        if (!it.live || !it.next) return null;
        const r = it.card.getBoundingClientRect();
        const nr = it.next.getBoundingClientRect();
        return Math.max(0, Math.min(1, (r.bottom - nr.top) / (r.height * 0.9)));
      });
      // write phase
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
        const p = Math.round(raw * 50) / 50;
        if (p === it.lastP) return;
        it.lastP = p;
        it.card.style.transform = p > 0 ? `scale(${1 - p * 0.045}) translateY(${-p * 10}px)` : "none";
        it.card.style.filter = p > 0.02 ? `brightness(${(1 - p * 0.34).toFixed(3)}) saturate(${(1 - p * 0.25).toFixed(3)})` : "none";
      });
    };
    step();

    return () => {
      cancelAnimationFrame(raf);
      observers.forEach((io) => io.disconnect());
    };
  }, [containerRef]);
}
