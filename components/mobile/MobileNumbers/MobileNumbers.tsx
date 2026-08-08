import styles from "./MobileNumbers.module.css";

const STATS = [
  { count: 3, plus: true, label: "YEARS BUILDING" },
  { count: 15, plus: true, label: "PROJECTS SHIPPED" },
  { count: 5, plus: false, label: "INDUSTRIES" },
  { count: 1, plus: false, label: "SDK IN PRODUCTION" },
];

export default function MobileNumbers() {
  return (
    <section className={styles.section}>
      <div data-rv className={styles.eyebrow}>
        01 — BY THE NUMBERS
      </div>
      <div className={styles.grid}>
        {STATS.map((s) => (
          <div key={s.label} data-rv className={styles.cell}>
            <div className={styles.cellTop}>
              <span data-count={s.count} className={styles.num}>
                0
              </span>
              {s.plus && <span className={styles.plus}>+</span>}
            </div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
