import styles from "./Hero.module.css";
import ParticleField from "@/components/ParticleField/ParticleField";

const H1_LINES: { text: string; delay: number; dim?: boolean; last?: boolean }[] = [
  { text: "Crafting", delay: 3.35 },
  { text: "Modern Digital", delay: 3.46 },
  { text: "Experiences", delay: 3.57, dim: true, last: true },
];

const TECH_PILLS = [
  { label: "React", delay: 4.05 },
  { label: "Next.js", delay: 4.11 },
  { label: "TypeScript", delay: 4.17 },
  { label: "AI Interfaces", delay: 4.23 },
  { label: "Micro-Frontends", delay: 4.29 },
];

const FOOTER_TECH = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE", "THREE.JS", "GSAP"];

export default function Hero() {
  return (
    <header className={styles.header}>
      <ParticleField />
      <div className={styles.noise} />
      <div className={styles.glow} />

      <div data-hero-parallax className={styles.parallax}>
        <div className={styles.inner}>
          <div className={styles.topRow}>
            <div className={styles.eyebrow}>FRONTEND ENGINEER — AI INTERFACES</div>
            <div className={styles.openWork}>
              <span className="uiPulseDot" />
              <span className={styles.openWorkLabel}>OPEN TO WORK</span>
            </div>
          </div>

          <h1 className={styles.h1}>
            {H1_LINES.map((line) => (
              <span key={line.text} className={line.last ? styles.lineWrapLast : styles.lineWrap}>
                <span
                  className={`${styles.lineInner} ${line.dim ? styles.lineDim : ""}`}
                  style={{ animationDelay: `${line.delay}s` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className={styles.intro}>
            Enterprise frontend architecture in React, Next.js and TypeScript — voice AI, real-time
            transcript streaming, and platforms that carry real revenue for real businesses.
          </p>

          <div className={styles.pills}>
            {TECH_PILLS.map((p) => (
              <span key={p.label} className={styles.pill} style={{ animationDelay: `${p.delay}s` }}>
                {p.label}
              </span>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <a href="#work" data-magnetic data-cursor="EXPLORE" className={styles.ctaPrimary}>
              Explore Work
            </a>
            <a href="#contact" data-magnetic data-cursor="OPEN" className={styles.ctaSecondary}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerStrip}>
        <div className={styles.techList}>
          {FOOTER_TECH.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className={styles.scrollGroup}>
          <span className={styles.scrollLabel}>SCROLL</span>
          <span className={styles.scrollLine}>
            <span className={styles.scrollDot} />
          </span>
        </div>
      </div>
    </header>
  );
}
