import styles from "./Numbers.module.css";

const STATS = [
  { count: 3, plus: true, label: "YEARS BUILDING" },
  { count: 15, plus: true, label: "PROJECTS SHIPPED" },
  { count: 5, plus: false, label: "INDUSTRIES" },
  { count: 1, plus: false, label: "SDK IN PRODUCTION" },
];

export default function Numbers() {
  return (
    <section data-screen-label="Numbers" className={styles.section}>
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          03 — BY THE NUMBERS
        </div>
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div key={s.label} data-rv className={styles.stat}>
              <div className={styles.statTop}>
                <span data-count={s.count} className={styles.statNum}>
                  0
                </span>
                {s.plus && <span className={styles.statPlus}>+</span>}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
