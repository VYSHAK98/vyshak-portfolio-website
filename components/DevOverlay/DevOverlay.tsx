"use client";

import { useEffect, useState } from "react";
import styles from "./DevOverlay.module.css";
import { DEV_MODE_EVENT, FPS_EVENT } from "@/lib/devMode";

export default function DevOverlay() {
  const [devMode, setDevMode] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const onDevMode = (e: Event) => setDevMode((e as CustomEvent<boolean>).detail);
    const onFps = (e: Event) => setFps((e as CustomEvent<number>).detail);
    window.addEventListener(DEV_MODE_EVENT, onDevMode);
    window.addEventListener(FPS_EVENT, onFps);
    return () => {
      window.removeEventListener(DEV_MODE_EVENT, onDevMode);
      window.removeEventListener(FPS_EVENT, onFps);
    };
  }, []);

  if (!devMode) return null;

  return (
    <>
      <div className={styles.grid} />
      <div className={styles.pill}>
        <span className={styles.dot} />
        <span className={styles.text}>DEV MODE · {fps} FPS · GRID 12</span>
      </div>
    </>
  );
}
