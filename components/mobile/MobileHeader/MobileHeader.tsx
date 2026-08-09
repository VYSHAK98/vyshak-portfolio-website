"use client";

import { useEffect, useState } from "react";
import styles from "./MobileHeader.module.css";
import shellStyles from "../MobileShell.module.css";

const NAV_ITEMS = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Experience", href: "#experience" },
  // { index: "03", label: "AI", href: "#ai" }, // temporarily disabled, section is commented out
  { index: "03", label: "Work", href: "#work" },
  { index: "04", label: "Contact", href: "#contact" },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-mobile-progress]");
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.progressTrack}>
        <div data-mobile-progress className={styles.progressBar} />
      </div>

      <div className={`${shellStyles.fixedWrap} ${styles.bar}`} style={{ top: 0 }}>
        <div className={shellStyles.fixedInner}>
          <div className={styles.barInner}>
            <a href="#top" className={styles.logo}>
              VH<span className={styles.logoDot}>.</span>
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className={styles.menuBtn}
            >
              <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`}>
                <span />
                <span />
              </span>
              <span className={styles.menuLabel}>{open ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        <div className={styles.overlayInner}>
          <div className={styles.navigateLabel}>NAVIGATE</div>
          <nav className={styles.navRows}>
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`${styles.navRow} ${open ? "anim-mRise" : ""}`}
                style={open ? { animationDuration: "0.5s", animationDelay: `${0.06 + i * 0.05}s`, animationFillMode: "both" } : undefined}
              >
                <span className={styles.navIndex}>{item.index}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className={styles.overlayActions}>
            <a href="mailto:vyshakharikumar98@gmail.com" onClick={() => setOpen(false)} className={styles.emailBtn}>
              vyshakharikumar98@gmail.com
            </a>
            <div className={styles.socialRow}>
              <a
                href="https://www.linkedin.com/in/vyshak-harikumar98/"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className={styles.socialBtn}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/VYSHAK98"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className={styles.socialBtn}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
