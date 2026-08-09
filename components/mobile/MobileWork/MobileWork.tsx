"use client";

import { useRef } from "react";
import styles from "./MobileWork.module.css";
import { PROJECTS } from "@/lib/data";
import { useStackCards } from "@/lib/mobile/useStackCards";

const TINTS = [
  { bg: "#0d1220", glow: "rgba(79,140,255,.2)" },
  { bg: "#141018", glow: "rgba(168,120,255,.18)" },
  { bg: "#0c1614", glow: "rgba(60,220,180,.16)" },
  { bg: "#161109", glow: "rgba(255,180,80,.15)" },
];

export default function MobileWork() {
  const cardsRef = useRef<HTMLDivElement>(null);
  useStackCards(cardsRef);

  return (
    <section id="work" className={styles.section}>
      <div data-rv className={styles.eyebrow}>
        05 — SELECTED WORK
      </div>
      <h2 data-rv className={styles.heading}>
        Four platforms in production.
      </h2>
      <p data-rv className={styles.intro}>
        Commercial products built with teams at Verveo, Digiblock and Navneet Toptech.
      </p>

      <div ref={cardsRef} className={styles.cards}>
        {PROJECTS.map((p, i) => {
          const tint = TINTS[i % TINTS.length];
          return (
            <div key={p.title} data-stack-card data-rv className={styles.cardWrap} style={{ top: `${76 + i * 14}px` }}>
              <article className={styles.card} style={{ background: `linear-gradient(160deg, ${tint.bg} 0%, #080808 100%)` }}>
                <div className={styles.glowBlob} style={{ background: `radial-gradient(circle,${tint.glow},transparent 70%)` }} />

                <div className={styles.topRow}>
                  <span className={styles.indexNum}>{p.index}</span>
                  <span className={styles.rule} />
                  <span className={styles.sector}>{p.sector}</span>
                </div>

                <div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.blurb}>{p.blurb}</p>
                </div>

                <div className={styles.statGrid}>
                  <div className={styles.statCell}>
                    <div className={styles.statValue}>{p.statA}</div>
                    <div className={styles.statCaption}>{p.statALabel}</div>
                  </div>
                  <div className={styles.statCell}>
                    <div className={styles.statValue}>{p.statB}</div>
                    <div className={styles.statCaption}>{p.statBLabel}</div>
                  </div>
                </div>

                <div className={styles.roleBox}>
                  <div className={styles.roleLabel}>MY ROLE</div>
                  <div className={styles.roleText}>{p.role}</div>
                </div>

                <div className={styles.chipRow}>
                  {p.stack.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* <div className={styles.actions}>
                  <span className={styles.liveDemo}>Live Demo</span>
                  <span className={styles.caseStudy}>Case Study</span>
                </div> */}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
