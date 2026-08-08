"use client";

import { useRef } from "react";
import styles from "./MobileExperience.module.css";
import { EXPERIENCES } from "@/lib/data";
import { useCareerProgress } from "@/lib/mobile/useCareerProgress";

export default function MobileExperience() {
  const rowsRef = useRef<HTMLDivElement>(null);
  useCareerProgress(rowsRef);

  return (
    <section id="experience" className={styles.section}>
      <div data-rv className={styles.eyebrow}>
        03 — EXPERIENCE
      </div>
      <h2 data-rv className={styles.heading}>
        Career journey.
      </h2>
      <p className={styles.intro}>
        From full-stack intern to owning frontend architecture on an AI platform — each step
        traded scope for depth.
      </p>

      <div className={styles.layout}>
        <div className={styles.railCol}>
          <div className={styles.rail}>
            <div data-rail-fill className={styles.fill} />
            <div data-rail-orb className={styles.orb}>
              <span className={`${styles.orbCore} anim-mPulse`} />
              <span className={styles.orbBloom} />
            </div>
          </div>
        </div>

        <div ref={rowsRef} className={styles.rows}>
          {EXPERIENCES.map((e) => (
            <div key={e.company} data-row className={styles.row}>
              <div data-period className={styles.period}>
                {e.period}
              </div>
              <div data-company className={styles.company}>
                {e.company}
              </div>
              <div className={styles.roleRow}>
                <span className={styles.roleLabel}>{e.role}</span>
                <span className={styles.roleDot} />
                <span className={styles.locationLabel}>{e.location}</span>
              </div>
              <p data-desc className={styles.desc}>
                {e.desc}
              </p>
              <div data-chips className={styles.chips}>
                {e.stack.map((t) => (
                  <span key={t} className={styles.chip}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
