import styles from "./Loader.module.css";

const NAME = ["V", "Y", "S", "H", "A", "K"];
const LETTER_DELAYS = [0.72, 0.56, 0.4, 0.4, 0.56, 0.72];

/**
 * Full-viewport aperture loader. Purely CSS-driven — the engine (boot())
 * hides this element via `[data-loader]` once the intro timeline finishes
 * (or immediately under prefers-reduced-motion), it holds no state itself.
 *
 * The `anim-v*` classes (defined once in globals.css) carry animation-name;
 * see the comment there for why that can't live in this .module.css file.
 */
export default function Loader() {
  return (
    <div data-loader className={`${styles.loader} anim-vIris`} aria-hidden="true">
      <div className={`${styles.inner} anim-vFadeOut`}>
        <div className={`${styles.ring} anim-vRing`} />
        <div className={`${styles.ringOuter} anim-vRing`} />
        <div className={styles.content}>
          <div className={styles.name}>
            {NAME.map((letter, i) => (
              <span
                key={i}
                className={`${styles.letter} anim-vBlurIn`}
                style={{ animationDelay: `${LETTER_DELAYS[i]}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className={styles.roleWrap}>
            <div
              className={`${styles.role} anim-vRoleCycle`}
              style={{ color: "var(--text-secondary)", animationDuration: "0.75s", animationDelay: "1.6s" }}
            >
              REACT DEVELOPER
            </div>
            <div
              className={`${styles.role} anim-vRoleCycle`}
              style={{ color: "var(--accent)", animationDuration: "0.95s", animationDelay: "2.15s" }}
            >
              CREATIVE FRONTEND ENGINEER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
