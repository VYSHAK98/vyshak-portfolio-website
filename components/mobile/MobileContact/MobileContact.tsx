import styles from "./MobileContact.module.css";
import MobileParticleCanvas from "@/components/mobile/MobileParticleCanvas/MobileParticleCanvas";

export default function MobileContact() {
  return (
    <section id="contact" className={styles.section}>
      <MobileParticleCanvas />
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          07 — CONTACT
        </div>
        <h2 data-rv className={styles.heading}>
          Let&apos;s build something worth using.
        </h2>
        <p data-rv className={styles.line}>
          Open to frontend and AI-interface roles. Bengaluru or remote.
        </p>
        <div data-rv className={styles.actions}>
          <a href="mailto:vyshakharikumar98@gmail.com" className={styles.emailBtn}>
            vyshakharikumar98@gmail.com
          </a>
          <div className={styles.socialRow}>
            <a href="https://www.linkedin.com/in/vyshak-harikumar98/" target="_blank" rel="noopener" className={styles.socialBtn}>
              LinkedIn
            </a>
            <a href="https://github.com/VYSHAK98" target="_blank" rel="noopener" className={styles.socialBtn}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
