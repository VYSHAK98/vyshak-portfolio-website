import styles from "./Work.module.css";
import { PROJECTS } from "@/lib/data";

const TINTS = [
  { bg: "linear-gradient(158deg,oklch(.285 .062 262) 0%,oklch(.17 .04 262) 80%)", glow: "rgba(79,140,255,.2)" },
  { bg: "linear-gradient(158deg,oklch(.275 .055 232) 0%,oklch(.165 .036 232) 80%)", glow: "rgba(79,180,255,.16)" },
  { bg: "linear-gradient(158deg,oklch(.275 .062 292) 0%,oklch(.165 .04 292) 80%)", glow: "rgba(139,120,255,.16)" },
  { bg: "linear-gradient(158deg,oklch(.245 .024 70) 0%,oklch(.152 .016 70) 80%)", glow: "rgba(255,214,160,.1)" },
];

export default function Work() {
  return (
    <section id="work" data-screen-label="Featured Projects" className={styles.section}>
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          06 — SELECTED WORK
        </div>
        <h2 data-rv className={styles.heading}>
          Four platforms
          <br />
          in production.
        </h2>
        <p data-rv className={styles.intro}>
          Commercial products built with teams at Verveo, Digiblock and Navneet Toptech. Screens
          are placeholders — the architecture, the ownership and the outcomes are not.
        </p>

        <div data-stack className={styles.stack}>
          {PROJECTS.map((p, i) => {
            const tint = TINTS[i % TINTS.length];
            return (
              <div key={p.title} data-stack-card className={styles.card} style={{ top: `${104 + i * 16}px` }}>
                <article
                  data-tilt
                  data-cursor="VIEW"
                  className={styles.article}
                  style={{ background: tint.bg }}
                >
                  <div className={styles.glowBlob} style={{ background: `radial-gradient(circle,${tint.glow},transparent 70%)` }} />

                  <div className={styles.topRow}>
                    <div className={styles.indexGroup}>
                      <span className={styles.indexNum}>{p.index}</span>
                      <span className={styles.indexRule} />
                      <span className={styles.sector}>{p.sector}</span>
                    </div>
                    <div className={styles.stats}>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>{p.statA}</div>
                        <div className={styles.statLabel}>{p.statALabel}</div>
                      </div>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>{p.statB}</div>
                        <div className={styles.statLabel}>{p.statBLabel}</div>
                      </div>
                    </div>
                  </div>

                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.blurb}>{p.blurb}</p>

                  <div className={styles.roleBox}>
                    <span className={styles.roleLabel}>MY ROLE</span>
                    <span className={styles.roleText}>{p.role}</span>
                  </div>

                  <div className={styles.pills}>
                    {p.stack.map((t) => (
                      <span key={t} className={styles.pill}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* <div className={styles.actions}>
                    <span data-magnetic data-cursor="OPEN" className={styles.liveDemo}>
                      Live Demo
                    </span>
                    <span data-magnetic data-cursor="OPEN" className={styles.caseStudy}>
                      Case Study
                    </span>
                  </div> */}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
