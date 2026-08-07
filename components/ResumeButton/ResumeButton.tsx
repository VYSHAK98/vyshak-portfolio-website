import styles from "./ResumeButton.module.css";

/**
 * The reference points this at #contact (a design placeholder — the
 * prototype has no real file to download). We have the actual résumé
 * in public/, so this links straight to it.
 */
export default function ResumeButton() {
  return (
    <a
      href="/Vyshak_Harikumar_Front_End.pdf"
      download
      target="_blank"
      rel="noopener"
      data-magnetic
      data-cursor="RESUME"
      aria-label="Download résumé"
      className={`${styles.button} anim-vRise`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4F8CFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 1v8.2M3.6 6.1 7 9.5l3.4-3.4M2 12.4h10" />
      </svg>
      <span>Résumé</span>
    </a>
  );
}
