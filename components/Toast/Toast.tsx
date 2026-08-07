"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Toast.module.css";
import { TOAST_EVENT } from "@/lib/toast";

export default function Toast() {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setToast({ text, id: Date.now() });
      hideTimer.current = setTimeout(() => setToast(null), 4200);
    };
    window.addEventListener(TOAST_EVENT, handler);
    return () => {
      window.removeEventListener(TOAST_EVENT, handler);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (!toast) return null;

  return (
    <div key={toast.id} className={styles.toast}>
      <div className={styles.icon}>★</div>
      <div>
        <div className={styles.label}>ACHIEVEMENT UNLOCKED</div>
        <div className={styles.text}>{toast.text}</div>
      </div>
    </div>
  );
}
