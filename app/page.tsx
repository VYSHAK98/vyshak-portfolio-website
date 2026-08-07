"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { Engine } from "@/lib/engine";
import Loader from "@/components/Loader/Loader";
import Cursor from "@/components/Cursor/Cursor";
import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Numbers from "@/components/Numbers/Numbers";
import Experience from "@/components/Experience/Experience";
import AiPipeline from "@/components/AiPipeline/AiPipeline";

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
      <Nav />
      <Hero />
      <About />
      <Numbers />
      <Experience />
      <AiPipeline />

      <Loader />
      <Cursor />
    </div>
  );
}
