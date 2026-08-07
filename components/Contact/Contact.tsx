import styles from "./Contact.module.css";
import ParticleField from "@/components/ParticleField/ParticleField";

export default function Contact() {
  return (
    <section id="contact" data-screen-label="Contact" className={styles.section}>
      <ParticleField opacity={0.85} />
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          09 — CONTACT
        </div>
        <h2 data-rv className={styles.heading}>
          Let&apos;s build something worth using.
        </h2>
        <p data-rv className={styles.intro}>
          Open to frontend and AI-interface roles, and to teams who care how the thing feels.
          Bengaluru or remote.
        </p>
        <div data-rv className={styles.pills}>
          <a href="mailto:vyshakharikumar98@gmail.com" data-magnetic data-cursor="EMAIL" className={styles.emailPill}>
            vyshakharikumar98@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/vyshak-harikumar98/"
            target="_blank"
            rel="noopener"
            data-magnetic
            data-cursor="OPEN"
            className={styles.outlinePill}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/VYSHAK98"
            target="_blank"
            rel="noopener"
            data-magnetic
            data-cursor="OPEN"
            className={styles.outlinePill}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
