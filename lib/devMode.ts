"use client";

/**
 * Same pattern as lib/toast.ts: the Konami-triggered dev mode and its
 * FPS readout live inside Engine (DOM/rAF-driven), but the overlay that
 * displays them is a React component — these events bridge the two
 * without threading engine state through page.tsx props.
 */
export const DEV_MODE_EVENT = "portfolio:devmode";
export const FPS_EVENT = "portfolio:fps";

export function emitDevMode(on: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<boolean>(DEV_MODE_EVENT, { detail: on }));
}

export function emitFps(fps: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<number>(FPS_EVENT, { detail: fps }));
}
