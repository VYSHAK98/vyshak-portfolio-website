import styles from "./MobileResumeButton.module.css";
import shellStyles from "../MobileShell.module.css";

export default function MobileResumeButton() {
  return (
    <div className={`${shellStyles.fixedWrap} ${styles.wrap}`} style={{ bottom: 0 }}>
      <div className={`${shellStyles.fixedInner} ${styles.inner}`}>
        <a
          href="/Vyshak_Harikumar_Frontend_Resume.pdf"
          download
          target="_blank"
          rel="noopener"
          aria-label="Download résumé"
          className={styles.pill}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 1v8.2M3.6 6.1 7 9.5l3.4-3.4M2 12.4h10" />
          </svg>
          <span>Résumé</span>
        </a>
      </div>
    </div>
  );
}
