import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div data-divider className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.copyright}>© 2026 VYSHAK HARIKUMAR — BENGALURU, IN</div>
          <div className={styles.links}>
            <a href="https://github.com/VYSHAK98" target="_blank" rel="noopener" data-cursor="OPEN" className={styles.link}>
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/vyshak-harikumar98/"
              target="_blank"
              rel="noopener"
              data-cursor="OPEN"
              className={styles.link}
            >
              LINKEDIN
            </a>
            <a href="mailto:vyshakharikumar98@gmail.com" data-cursor="EMAIL" className={styles.link}>
              EMAIL
            </a>
          </div>
          <div className={styles.tagline}>BUILT WITH INTENT · ↑↑↓↓←→←→BA</div>
        </div>
      </div>
    </footer>
  );
}
