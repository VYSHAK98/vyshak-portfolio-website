"use client";

import { useRef } from "react";
import { useParticleField } from "@/lib/mobile/useParticleField";
import styles from "./MobileParticleCanvas.module.css";

export default function MobileParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useParticleField(ref);
  return <canvas ref={ref} className={styles.canvas} />;
}
