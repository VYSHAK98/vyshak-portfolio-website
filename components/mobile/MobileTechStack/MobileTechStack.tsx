"use client";

import { useEffect, useRef } from "react";
import styles from "./MobileTechStack.module.css";
import { MOBILE_MARQUEE_ROWS } from "@/lib/data";

const itemColor = (i: number) => (i % 3 === 2 ? "var(--accent)" : "var(--text)");

export default function MobileTechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const track = (e.target as HTMLElement).querySelector<HTMLElement>("[data-mobile-marquee-track]");
          if (track) track.style.animationPlayState = e.isIntersecting ? "" : "paused";
        }),
      { rootMargin: "80px" }
    );
    section.querySelectorAll<HTMLElement>("[data-mobile-marquee-row]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div data-rv className={styles.eyebrow}>
          06 — STACK
        </div>
        <h2 data-rv className={styles.heading}>
          Everything I reach for.
        </h2>
      </div>

      {MOBILE_MARQUEE_ROWS.map((row) => {
        const repeated = [...row.items, ...row.items, ...row.items, ...row.items];
        return (
          <div key={row.label} data-mobile-marquee-row className={styles.row}>
            <div className={styles.rowLabel}>{row.label}</div>
            <div
              data-mobile-marquee-track
              className={`${styles.track} anim-mMarquee ${row.reverse ? styles.trackReverse : ""}`}
              style={{ animationDuration: row.dur }}
            >
              {repeated.map((name, i) => (
                <span key={i} className={styles.item} style={{ color: itemColor(i) }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
