import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" data-screen-label="About" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div data-sticky-col className={styles.left}>
            <div data-rv className={`${styles.rv} ${styles.eyebrow}`}>
              02 — ABOUT
            </div>
            <h2 data-rv className={`${styles.rv} ${styles.heading}`}>
              Interfaces are where the product becomes real.
            </h2>
            <div data-rv className={`${styles.rv} ${styles.currently}`}>
              <span className="uiPulseDot" />
              <span className={styles.currentlyLabel}>CURRENTLY AT VERVEO SOLUTIONS</span>
            </div>
          </div>

          <div className={styles.right}>
            <p data-rv className={`${styles.rv} ${styles.pLead}`}>
              Three years in, I&apos;ve spent most of my time on software that people are paid to
              use — aviation revenue systems, learning platforms for schools across India, fintech
              tooling, and now an AI agent platform that places and answers real calls.
            </p>
            <p data-rv className={`${styles.rv} ${styles.pBody1}`}>
              That work rewards a particular discipline: architecture that survives the second
              year, component systems a team can move quickly inside, and state that stays honest
              when the data is streaming in live. I care about the render path as much as the
              layout.
            </p>
            <p data-rv className={`${styles.rv} ${styles.pBody2}`}>
              The craft side matters too. Motion, timing and restraint are how an interface signals
              quality before anyone reads a word of it — which is roughly the argument this page is
              making.
            </p>
            <div data-rv className={`${styles.rv} ${styles.metaGrid}`}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>BASED IN</div>
                <div className={styles.metaValue}>Bengaluru, India</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>EDUCATION</div>
                <div className={styles.metaValue}>B.Tech — APJ Abdul Kalam Technological University</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>FOCUS</div>
                <div className={styles.metaValue}>AI interfaces &amp; scale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
