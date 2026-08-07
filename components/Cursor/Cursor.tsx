import styles from "./Cursor.module.css";

/**
 * Custom spring cursor: a dot plus a ring that eases toward the pointer
 * and swaps to a contextual label from nearby `data-cursor` attributes.
 * All motion is driven imperatively by Engine (initCursor/cursorTick) —
 * this component only renders the two target elements it looks for.
 */
export default function Cursor() {
  return (
    <>
      <div data-cursor-ring className={styles.ring}>
        <span data-cursor-label className={styles.label} />
      </div>
      <div data-cursor-dot className={styles.dot} />
    </>
  );
}
