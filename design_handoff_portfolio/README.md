# Handoff: Vyshak Harikumar — Portfolio Redesign

## Overview
A single-page personal portfolio for a frontend engineer specialising in AI interfaces.
Ten sections on a near-black canvas, driven by scroll-linked motion: an aperture loader,
a hero, an about block, a scroll-linked "Career journey" experience panel, a live simulated
AI voice-agent pipeline, a stacked-card work section, marquee tech rows, an interactive
terminal, and a contact close.

## About the design files
`reference/portfolio-design.dc.html` is a **design reference created in HTML** — a working
prototype of the intended look and behavior, not production code to ship. The task is to
recreate it inside the target repository's existing environment (React/Next/Vue/etc.),
using that codebase's established patterns, component structure and styling approach.
If the repo has no established environment, choose the most appropriate framework
(Next.js + TypeScript is a safe default for this design) and implement it there.

The prototype's markup uses inline styles throughout, because of the tool it was authored in.
**Do not treat inline styling as part of the design.** Move those values into whatever the
codebase uses (CSS modules, Tailwind, styled-components). The *values* are the spec; the
delivery mechanism is not.

## Fidelity
**High-fidelity.** Colors, typography, spacing, timings and copy are final. Recreate pixel-exactly.

## Design tokens

**Color**
| Token | Value | Use |
| --- | --- | --- |
| Background | `#050505` | page canvas |
| Surface | `#0B0B0B` | terminal, AI panels |
| Accent | `#4F8CFF` | primary accent, glows, active states |
| Accent tint text | `#9dbcff` | active dates, in-card eyebrows |
| Text primary | `#FFFFFF` | headings, active rows |
| Text secondary | `#9B9B9B` | body copy |
| Text muted | `#8f8f8f` | mono eyebrows, labels |
| Text dim | `#6b6b6b` / `#5a5a5a` | inactive rows |
| Hairline | `rgba(255,255,255,.06 – .14)` | section rules, card borders |

Card tints (Selected Work + Experience cards), applied in order:
`linear-gradient(158deg, oklch(.285 .062 262), oklch(.17 .04 262) 80%)` (blue),
`…232` (steel), `…292` (indigo), `oklch(.245 .024 70) → oklch(.152 .016 70)` (warm black).
Each card carries a 480px radial glow blob at `top:-190px; right:-110px`, tinted to match.

**Type** — Clash Display 400/500/600/700 (display), Satoshi, General Sans 400/500/600 (UI/body),
Geist Mono 300/400/500 (labels, terminal). Loaded from Fontshare + Google Fonts.
- Section headings: Clash Display 600, `clamp(38px, 5vw, 72px)`, line-height 1, letter-spacing −.04em
- Hero H1: Clash Display 600, `clamp(52px, 9vw, 150px)`, letter-spacing −.045em
- Body: General Sans 400, 15–17px, line-height 1.72–1.78
- Mono eyebrows: Geist Mono 400, 9.5–11px, letter-spacing .16–.26em, uppercase

**Motion** — single easing curve `cubic-bezier(.16, 1, .3, 1)` for everything.
Reveal transitions .9–1.1s with 0–.18s stagger; hovers .35s; color/opacity state changes .5s.
Keyframes in the reference: `vMask` (line reveal), `vRise`, `vFadeIn/Out`, `vBlurIn`,
`vIris` (loader wipe), `vRing` (loader rings), `vPulse`, `vFloat`, `vMarquee`, `vCaret`,
`vWave`, `vToast`, `vRoleCycle`, `vScrollDot`.

**Layout** — content column `min(1280px, calc(100% - 96px))`, centred. Sections separated by
`border-top: 1px solid rgba(255,255,255,.06)`, vertical padding 120–150px.
Radii: 28px large cards, 24px work cards, 20/16px panels, 5–6px pills, 22–30px buttons.

## Screens / sections

### 1. Loader
Full-viewport `#050505` overlay, z-index 100. Expanding light rings (`vRing`), the name resolves
centre-out, then an iris wipe (`vIris`, `clip-path: circle()`, 1.15s, delay 2.95s) reveals the page.
Total ≈ 4.1s. Everything downstream is delay-scheduled against this.

### 2. Header / nav
Fixed top bar: `VH.` logo left (double-click = easter egg), WORK / EXPERIENCE / AI / ABOUT centre-right
(Geist Mono 11px, .14em), sound toggle pill, and a white "Let's talk" pill.
A 2px scroll-progress bar spans the very top, `scaleX` from 0→1, accent gradient.

### 3. Hero
Full-height. Particle canvas + noise texture + radial accent glow behind.
Eyebrow "FRONTEND ENGINEER — AI INTERFACES" left, "OPEN TO WORK" marker right.
H1 in three masked lines: "Crafting" / "Modern Digital" / "Experiences" (third line `#9B9B9B`),
each line rising through `vMask` with 0.11s stagger. Intro paragraph, tech pills,
then two magnetic buttons: "Explore Work" (white fill) and "Get in Touch" (outlined).
Footer strip: tech list in mono + scroll indicator.

### 4. About
Two columns. Sticky left column holds the "currently at Verveo Solutions" pulsing marker.
Right column: three paragraphs, then a meta grid — BASED IN / EDUCATION
("B.Tech — APJ Abdul Kalam Technological University") / etc.

### 5. Numbers
Four counters that animate on first intersection: 3+ years, 15+ projects, 5+ industries, 100% responsive.

### 6. Experience — "Career journey"  ⚠ most intricate section
Heading "Career journey." then a full-width intro paragraph, then a two-column panel:

- **Left column** (`clamp(96px, 9%, 118px)` wide, 560px tall): a 2px vertical track flush to the
  left edge (aligned with the heading), `rgba(255,255,255,.09)`. Inside it: an accent gradient
  fill growing from the top with a 16px accent glow; four tick dots at 0 / 33.3 / 66.6 / 100%;
  and a glowing orb (13px, `#eaf1ff`, layered accent glows + blurred radial bloom, `vPulse` breathing).
  **The orb's centering offsets must not live on `transform`** — the pulse animation animates
  `transform` and will knock it off the line; position it with `left`/`top` offsets on a wrapper.
  Below the track: "3+ years" and "4 COMPANIES".
- **Right column**: its own scroll container, 560px tall, `overflow-y: auto`, scrollbar hidden.
  Four rows separated by hairlines: company (Clash Display, `clamp(26px,3.2vw,44px)`), period (mono,
  right-aligned), role + location line, description, tech pills.
- **The scroll logic**: progress is `scrollTop / (scrollHeight − clientHeight)` of that inner
  container — **not** page scroll. Fill height and orb top are both set to that percentage.
  The active row index is derived from the *same* fraction:
  `idx = round(pct × (rows − 1))` — i.e. the row whose tick the orb is nearest. Deriving it any
  other way (row rects, offsetTop) lets the highlight and the orb desync; this was a real bug.
  Updates are rAF-throttled off a passive `scroll` listener, and skip when the index is unchanged.
- **Active row**: white name at `scale(1.02)`, accent-tinted date, `rgba(255,255,255,.78)` body,
  pills at `translateY(0)` / opacity 1, row opacity 1. Passed rows .6, upcoming .4.
  Passed ticks turn `#eaf1ff` with an accent glow.

Companies, in order: Verveo Solutions (Frontend Developer — Platform Lead, Nov 2025 → present),
Navneet Toptech (SDE I, Sep 2024 → Nov 2025), Digiblock Network (Front-End Developer, Jan → Aug 2024),
Luminar Technolab (MERN Intern, Jul → Dec 2023). Exact copy is in the reference file.

### 7. AI engineering
Two panels. Left: a simulated voice-agent transcript that types out stage by stage, with a status
dot, call timer, animated waveform bars (`vWave`), a start/stop button and a text input that accepts
typed questions. Right: a six-node pipeline (Voice Capture → STT → LLM Agent → Knowledge Base →
Transcript Stream → Workflow Automation) whose nodes light and shift as the active stage advances.

### 8. Selected Work
Four sticky stacked cards (`top: 104 + i×16px`), each with one of the four gradient tints and its
glow blob. Split layout: copy left (index, sector, title, blurb, "MY ROLE" attribution box, two
stats, tech pills, Live Demo / Case Study buttons), placeholder screenshot panel right
(diagonal hatch + radial accent). Cards desaturate, dim and scale down as the next card overlaps —
driven by the shared rAF loop, quantised to 1/50 steps.

### 9. Tech stack
Four full-bleed marquee rows (Frontend / Backend / AI & Cloud / Craft), alternating direction,
30–38s durations, with a gradient-masked label pinned left. Paused when off-screen.

### 10. Terminal
A real command line: `help`, `whoami`, `skills`, `projects`, `experience`, `contact`, `hire`, `clear`.
Unknown commands return a not-found line. `hire` plays a timed sequence and fires an achievement toast.

### 11. Contact + footer
Centred close on a particle field, with email / LinkedIn / GitHub pills.

### Persistent UI
- Floating Résumé pill, bottom-right, fixed, glass background, download icon, rises in after the loader.
- Custom cursor: a dot plus a spring-following ring that swaps to a contextual label from
  `data-cursor` attributes. Disabled on touch/coarse pointers.
- `data-magnetic` elements pull slightly toward the pointer; `data-tilt` cards do a 3D tilt.

### Easter eggs
Konami code → dev mode (live FPS readout); double-click the logo → jump to and focus the terminal;
achievement toasts; sound toggle driving small WebAudio ticks on hover/typing.

## Interactions & behavior
- Reveals: elements with `data-rv` start at `opacity:0; translateY(24–30px)` and animate in on
  intersection. **Fail open** — a timeout forces everything visible if the observer never fires.
- One rAF loop drives page-scroll effects: read all rects first, then write. Every write is
  quantised and skipped if unchanged.
- Reduced motion: all animation/transition durations collapse to ~0 and smooth scroll is disabled.
- Scrollbars are hidden globally (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`)
  while scrolling still works.

## State
Loader progress; AI demo (call state, timer, stage index, transcript messages, waveform on/off);
terminal (line buffer, history); toast queue; sound on/off; dev mode + FPS; experience panel
progress + active index (DOM-driven, not framework state — keep it out of the render loop).

## Assets
None binary. Fonts come from Fontshare (Clash Display, Satoshi, General Sans) and Google Fonts
(Geist Mono). Hero/contact particle fields are canvas-drawn. Project screenshots and company logos
are **placeholders** — real images can be dropped in later; keep the slots.

## Files
- `reference/portfolio-design.dc.html` — the complete design, all sections, all logic.
- `PROMPT.md` — a ready-to-paste prompt for Claude Code.
