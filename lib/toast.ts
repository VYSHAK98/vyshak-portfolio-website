"use client";

/**
 * Tiny event bus for achievement toasts. Anything can fire one (the
 * terminal's `hire` command, the engine's Konami/logo-dblclick easter
 * eggs) without needing a React context wired through every consumer —
 * mirrors the reference's `this.unlock(text)`, callable from anywhere
 * on the one shared Component instance.
 */
export const TOAST_EVENT = "portfolio:toast";

export function emitToast(text: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: text }));
}
