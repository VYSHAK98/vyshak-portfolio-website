import styles from "./TechStack.module.css";
import { MARQUEE_ROWS } from "@/lib/data";

const itemColor = (i: number) => (i % 3 === 1 ? "var(--accent)" : i % 3 === 2 ? "var(--text-secondary)" : "var(--text)");

export default function TechStack() {
  return (
    <section data-screen-label="Tech stack" className={styles.section}>
      <div className={styles.header}>
        <div data-rv className={styles.eyebrow}>
          07 — STACK
        </div>
        <h2 data-rv className={styles.heading}>
          Everything I reach for.
        </h2>
      </div>

      {MARQUEE_ROWS.map((row) => {
        const doubled = [...row.items, ...row.items];
        return (
          <div key={row.label} data-marquee-row className={styles.row}>
            <div className={styles.label}>{row.label}</div>
            <div
              data-marquee-track
              className={`${styles.track} ${row.reverse ? styles.trackReverse : ""}`}
              style={{ animationDuration: row.dur }}
            >
              {doubled.map((name, i) => (
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
