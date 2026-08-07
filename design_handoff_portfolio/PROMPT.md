# Prompt for Claude Code

Copy everything below the line into Claude Code, with this folder available in the repo
(e.g. drop `design_handoff_portfolio/` at the project root first).

---

I want you to rebuild my existing portfolio website so it matches a new design **exactly**.

**Source of truth:** `design_handoff_portfolio/reference/portfolio-design.dc.html`.
Open and read that file completely before writing any code. It is a working HTML prototype —
every section, color, font size, animation timing, easing curve and piece of copy in it is
final and intentional. `design_handoff_portfolio/README.md` documents the same thing in prose;
where the two disagree, **the HTML file wins**.

## Rules

1. **Pixel-exact.** Same layout, spacing, type scale, colors, radii, shadows, borders, easing,
   durations, and copy. Do not "improve", simplify, re-order sections, or substitute fonts.
   If something looks unusual (e.g. the loader's iris wipe, the desaturating card stack),
   it is deliberate — reproduce it.
2. **Port, don't paste.** Recreate the design using my repo's existing framework and conventions
   (components, styling approach, routing, file layout). Read the codebase first and follow
   what is already there. The HTML is a reference, not code to drop in.
3. **Keep my content.** All copy, company names, dates, metrics and links in the reference are
   real and already correct. Carry them over verbatim.
4. **Behavior counts as design.** The scroll-linked animations, the custom cursor, the terminal,
   the simulated AI voice pipeline, the marquees and the easter eggs are all part of the design.
   Port them, including their trigger conditions and timings.
5. **Performance.** Keep the prototype's discipline: IntersectionObserver-gated animation,
   a single rAF loop with a read phase then a write phase, quantised style writes, no permanent
   `will-change`, marquees paused off-screen, and full `prefers-reduced-motion` support.
   Target a steady 60fps on a mid-range laptop.
6. **Accessibility.** Preserve semantic landmarks, heading order, focus-visible outlines,
   `aria-label`s on icon-only controls, and keyboard operability of the terminal and buttons.

## What to build (in order)

Work section by section, in this order, committing after each so I can review:

1. Global shell — fonts, resets, color tokens, keyframes, scrollbars hidden site-wide.
2. Aperture loader + custom spring cursor + hero particle canvas.
3. Hero.
4. About + Numbers.
5. Experience ("Career journey") — the two-column scroll panel. Read its logic carefully:
   the active row and the glowing orb are both derived from the **same** scroll fraction of
   the inner scroll container, so they can never desync.
6. AI section (simulated voice-agent pipeline).
7. Selected Work (tinted card stack).
8. Tech Stack marquees.
9. Terminal.
10. Contact + footer + floating Résumé button.
11. Easter eggs (Konami dev mode, double-click logo → terminal, achievement toasts, sound toggle).

## Deliverables

- The updated site building and running cleanly with no console errors.
- A short note listing anything you had to adapt because of a framework constraint, and why.
- Responsive down to 390px wide without horizontal scroll or overlapping text.

Before you start: read the reference file and the README, then tell me your implementation plan
and which existing files you intend to replace. Wait for my go-ahead before making changes.
