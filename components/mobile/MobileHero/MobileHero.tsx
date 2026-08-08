import styles from "./MobileHero.module.css";
import MobileParticleCanvas from "@/components/mobile/MobileParticleCanvas/MobileParticleCanvas";

const LINES: { text: string; delay: number; dim?: boolean }[] = [
  { text: "Crafting", delay: 0.15 },
  { text: "Modern Digital", delay: 0.24 },
  { text: "Experiences", delay: 0.33, dim: true },
];

const CHIPS = ["React", "Next.js", "TypeScript", "AI Interfaces", "Micro-Frontends"];

export default function MobileHero() {
  return (
    <header id="top" className={styles.hero}>
      <MobileParticleCanvas />
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className={styles.statusRow}>
          <span className={`${styles.statusDot} anim-mPulse`} />
          <span className={styles.statusText}>OPEN TO WORK · BENGALURU</span>
        </div>

        <h1 className={styles.h1}>
          {LINES.map((line) => (
            <span key={line.text} className={styles.lineWrap}>
              <span
                className={`${styles.lineInner} anim-mMask ${line.dim ? styles.lineDim : ""}`}
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

        <div className={styles.chips}>
          {CHIPS.map((c) => (
            <span key={c} className={styles.chip}>
              {c}
            </span>
          ))}
        </div>

        <div className={styles.ctas}>
          <a href="#work" className={styles.ctaPrimary}>
            Explore Work
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Get in Touch
          </a>
        </div>

        <div className={styles.footerStrip}>
          <span className={styles.footerLabel}>3+ YRS · 15+ SHIPPED</span>
          <div className={styles.scrollGroup}>
            <span className={styles.scrollLabel}>SCROLL</span>
            <span className={styles.scrollLine}>
              <span className={`${styles.scrollDot} anim-mScrollDot`} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
