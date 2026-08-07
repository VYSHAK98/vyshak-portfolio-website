import styles from "./ParticleField.module.css";

/**
 * Canvas particle field. Rendering is entirely owned by Engine.field(),
 * which discovers every `canvas[data-field]` under the root on boot —
 * this component is just the mount point (used behind the hero and
 * again behind the contact section).
 */
export default function ParticleField({ opacity }: { opacity?: number }) {
  return <canvas data-field className={styles.canvas} style={opacity !== undefined ? { opacity } : undefined} />;
}
