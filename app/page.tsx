"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { Engine } from "@/lib/engine";
import Loader from "@/components/Loader/Loader";
import Cursor from "@/components/Cursor/Cursor";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const engine = new Engine(rootRef.current);
    // boot on next frame, matching the reference's rootRef -> requestAnimationFrame(boot)
    const raf = requestAnimationFrame(() => engine.boot());
    return () => {
      cancelAnimationFrame(raf);
      engine.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <main>
        <p style={{ padding: "160px 48px", color: "var(--text-secondary)" }}>
          Portfolio rebuild in progress — sections land one at a time.
        </p>
      </main>

      <Loader />
      <Cursor />
    </div>
  );
}
