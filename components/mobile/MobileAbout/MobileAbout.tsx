import styles from "./MobileAbout.module.css";

const META = [
  { key: "BASED IN", value: "Bengaluru, India" },
  { key: "EDUCATION", value: "B.Tech — APJ Abdul Kalam Technological University" },
  { key: "FOCUS", value: "AI interfaces & scale" },
];

export default function MobileAbout() {
  return (
    <section id="about" className={styles.section}>
      <div data-rv className={styles.eyebrow}>
        02 — ABOUT
      </div>
      <h2 data-rv className={styles.heading}>
        Interfaces are where the product becomes real.
      </h2>
      <p data-rv className={styles.p1}>
        Three years in, I&apos;ve spent most of my time on software that people are paid to use —
        aviation revenue systems, learning platforms for schools across India, fintech tooling,
        and now an AI agent platform that places and answers real calls.
      </p>
      <p data-rv className={styles.p2}>
        That work rewards a particular discipline: architecture that survives the second year,
        component systems a team can move quickly inside, and state that stays honest when the
        data is streaming in live.
      </p>

      <div data-rv className={styles.meta}>
        {META.map((m) => (
          <div key={m.key} className={styles.metaRow}>
            <span className={styles.metaKey}>{m.key}</span>
            <span className={styles.metaValue}>{m.value}</span>
          </div>
        ))}
      </div>

      <div data-rv className={styles.currently}>
        <span className="uiPulseDot" />
        <span className={styles.currentlyLabel}>CURRENTLY AT VERVEO SOLUTIONS</span>
      </div>
    </section>
  );
}
