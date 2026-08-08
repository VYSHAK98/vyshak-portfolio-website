import styles from "./Nav.module.css";

const LINKS = [
  { href: "#work", label: "WORK" },
  { href: "#experience", label: "EXPERIENCE" },
  // { href: "#ai", label: "AI" },
  { href: "#about", label: "ABOUT" },
];

export default function Nav() {
  return (
    <>
      <div className={styles.progressTrack}>
        <div data-progress className={styles.progressBar} />
      </div>

      <nav className={`${styles.nav} anim-vFadeIn`}>
        <button
          data-logo
          data-cursor="TERMINAL"
          aria-label="Vyshak Harikumar — double-click for terminal"
          className={styles.logo}
        >
          <span className={styles.logoText}>
            VH<span className={styles.logoDot}>.</span>
          </span>
        </button>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-cursor="VIEW" className={styles.navLink}>
              {l.label}
            </a>
          ))}
          <button data-sound aria-label="Toggle interface sound" data-cursor="SOUND" className={styles.soundBtn}>
            <span data-sound-dot className={styles.soundDot} />
            <span className={styles.soundLabel}>SOUND</span>
          </button>
          <a href="#contact" data-magnetic data-cursor="SAY HI" className={styles.talkPill}>
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </>
  );
}
