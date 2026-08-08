import styles from "./Experience.module.css";
import { EXPERIENCES } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" data-screen-label="Experience" className={styles.section}>
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          04 — EXPERIENCE
        </div>
        <h2 data-rv className={styles.heading}>
          Career journey.
        </h2>
        <p className={styles.intro}>
          From full-stack intern to owning frontend architecture on an AI platform — each step
          traded scope for depth.
        </p>

        <div className={styles.layout}>
          <div className={styles.trackCol}>
            <div className={styles.track}>
              <div data-exp-fill className={styles.fill} />
              <div data-exp-orb className={styles.orb}>
                <span className={`${styles.orbCore} anim-vPulse`} />
                <span className={styles.orbBloom} />
              </div>
            </div>
            <div className={styles.yearsBlock}>
              <div className={styles.years}>
                3+ <span className={styles.yearsUnit}>years</span>
              </div>
              <div className={styles.companiesLabel}>4 COMPANIES</div>
            </div>
          </div>

          <div data-exp-rows className={styles.rows}>
            {EXPERIENCES.map((e) => (
              <div key={e.company} data-exp-row className={styles.row}>
                <div className={styles.rowHead}>
                  <h3 data-exp-name className={styles.name}>
                    {e.company}
                  </h3>
                  <span data-exp-date className={styles.date}>
                    {e.period}
                  </span>
                </div>
                <div className={styles.roleRow}>
                  <span className={styles.roleLabel}>{e.role}</span>
                  <span className={styles.roleDot} />
                  <span className={styles.locationLabel}>{e.location}</span>
                </div>
                <p data-exp-desc className={styles.desc}>
                  {e.desc}
                </p>
                <div data-exp-pills className={styles.pills}>
                  {e.stack.map((t) => (
                    <span key={t} className={styles.pill}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mobile-only stand-in for .yearsBlock, see the media query in Experience.module.css */}
        <div className={styles.yearsBlockMobile}>
          <div className={styles.years}>
            3+ <span className={styles.yearsUnit}>years</span>
          </div>
          <div className={styles.companiesLabel}>4 COMPANIES</div>
        </div>
      </div>
    </section>
  );
}
