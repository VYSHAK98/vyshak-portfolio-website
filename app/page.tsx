"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { Engine } from "@/lib/engine";
import { useMediaQuery } from "@/lib/useMediaQuery";
import Loader from "@/components/Loader/Loader";
import Cursor from "@/components/Cursor/Cursor";
import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Numbers from "@/components/Numbers/Numbers";
import Experience from "@/components/Experience/Experience";
// import AiPipeline from "@/components/AiPipeline/AiPipeline"; // temporarily disabled
import Work from "@/components/Work/Work";
import TechStack from "@/components/TechStack/TechStack";
import Terminal from "@/components/Terminal/Terminal";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import ResumeButton from "@/components/ResumeButton/ResumeButton";
import Toast from "@/components/Toast/Toast";
import DevOverlay from "@/components/DevOverlay/DevOverlay";
import MobileShell from "@/components/mobile/MobileShell";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  // matches the desktop nav's own CSS breakpoint, so "mobile" here means
  // the same viewport range that already loses the desktop nav links
  const isMobile = useMediaQuery("(max-width: 760px)");

  useEffect(() => {
    // the desktop Engine (custom cursor, magnetic/tilt, stack-card
    // desaturation, sticky cols, career-rail scroll math, marquee pause)
    // never boots on mobile — the mobile tree has its own hooks for the
    // pieces it needs and none of the desktop-only interactions the spec
    // explicitly excludes (cursor, magnetic buttons, 3D tilt, sticky stack)
    if (isMobile) return;
    if (!rootRef.current) return;
    const engine = new Engine(rootRef.current);
    // boot on next frame, matching the reference's rootRef -> requestAnimationFrame(boot)
    const raf = requestAnimationFrame(() => engine.boot());
    return () => {
      cancelAnimationFrame(raf);
      engine.destroy();
    };
  }, [isMobile]);

  return (
    <div ref={rootRef} className={styles.root}>
      {isMobile ? (
        <MobileShell />
      ) : (
        <>
          <Nav />
          <Hero />
          <About />
          <Numbers />
          <Experience />
          {/* <AiPipeline /> temporarily disabled */}
          <Work />
          <TechStack />
          <Terminal />
          <Contact />
          <Footer />
          <ResumeButton />
        </>
      )}

      <Loader />
      {!isMobile && <Cursor />}
      <Toast />
      <DevOverlay />
    </div>
  );
}
