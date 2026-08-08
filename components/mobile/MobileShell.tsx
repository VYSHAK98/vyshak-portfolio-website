"use client";

import { useRef } from "react";
import styles from "./MobileShell.module.css";
import { useReveal } from "@/lib/mobile/useReveal";
import MobileHeader from "./MobileHeader/MobileHeader";
import MobileHero from "./MobileHero/MobileHero";
import MobileNumbers from "./MobileNumbers/MobileNumbers";
import MobileAbout from "./MobileAbout/MobileAbout";
import MobileExperience from "./MobileExperience/MobileExperience";
import MobileAi from "./MobileAi/MobileAi";
import MobileWork from "./MobileWork/MobileWork";
import MobileTechStack from "./MobileTechStack/MobileTechStack";
import MobileContact from "./MobileContact/MobileContact";
import MobileFooter from "./MobileFooter/MobileFooter";
import MobileResumeButton from "./MobileResumeButton/MobileResumeButton";

/**
 * Dedicated mobile composition — a completely separate component tree
 * from the desktop one (see app/page.tsx), not a CSS reflow of it, per
 * the mobile design spec. Mounted only under useMediaQuery(max-width:760px);
 * the desktop Engine never boots while this is showing, and this never
 * renders while the desktop tree is.
 */
export default function MobileShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef} className={styles.shell}>
      <MobileHeader />
      <MobileHero />
      <MobileNumbers />
      <MobileAbout />
      <MobileExperience />
      <MobileAi />
      <MobileWork />
      <MobileTechStack />
      <MobileContact />
      <MobileFooter />
      <MobileResumeButton />
    </div>
  );
}
