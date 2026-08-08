"use client";

import { useEffect, type RefObject } from "react";

/**
 * Mobile "Career journey" rail: page-scroll driven, single source of
 * truth for both the fill/orb position and the active row — same
 * principle as the desktop Experience section, different focus line
 * (46% of viewport height here vs 50% on desktop, per the mobile spec).
 */
export function useCareerProgress(rowsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rowsCol = rowsRef.current;
    if (!rowsCol) return;

    const rows = [...rowsCol.querySelectorAll<HTMLElement>("[data-row]")].map((row) => ({
      row,
      company: row.querySelector<HTMLElement>("[data-company]"),
      period: row.querySelector<HTMLElement>("[data-period]"),
      desc: row.querySelector<HTMLElement>("[data-desc]"),
      chips: row.querySelector<HTMLElement>("[data-chips]"),
    }));
    const fill = rowsCol.parentElement?.querySelector<HTMLElement>("[data-rail-fill]") ?? null;
    const orb = rowsCol.parentElement?.querySelector<HTMLElement>("[data-rail-orb]") ?? null;

    let lastP = -1;
    let lastIdx = -1;
    let raf = 0;
    let scheduled = false;

    const apply = () => {
      scheduled = false;
      const r = rowsCol.getBoundingClientRect();
      const focus = innerHeight * 0.46;
      const raw = r.height > 0 ? (focus - r.top) / r.height : 0;
      const p = Math.round(Math.max(0, Math.min(1, raw)) * 100);

      if (p !== lastP) {
        lastP = p;
        if (fill) fill.style.height = p + "%";
        if (orb) orb.style.top = p + "%";
      }

      let idx = 0;
      let bestDist = Infinity;
      rows.forEach((it, i) => {
        const rr = it.row.getBoundingClientRect();
        const dist = Math.abs(rr.top + rr.height / 2 - focus);
        if (dist < bestDist) {
          bestDist = dist;
          idx = i;
        }
      });
      if (idx === lastIdx) return;
      lastIdx = idx;
      rows.forEach((it, i) => {
        const on = i === idx;
        const passed = i < idx;
        it.row.style.opacity = on ? "1" : passed ? ".5" : ".3";
        it.row.style.transform = on ? "translateY(0)" : passed ? "translateY(-3px)" : "translateY(6px)";
        if (it.company) it.company.style.color = on ? "#fff" : "#5a5a5a";
        if (it.period) it.period.style.color = on ? "#9dbcff" : "#6b6b6b";
        if (it.desc) it.desc.style.color = on ? "rgba(255,255,255,.78)" : "#6f6f6f";
        if (it.chips) {
          it.chips.style.opacity = on ? "1" : ".55";
          it.chips.style.transform = on ? "translateY(0)" : "translateY(6px)";
        }
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(apply);
    };

    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    apply();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [rowsRef]);
}
