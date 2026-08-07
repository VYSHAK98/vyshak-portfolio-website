/**
 * Content constants, copied verbatim from the design reference's inline
 * PROJECTS/EXPERIENCES/etc. arrays. Grows as later sections need their
 * own data (AI pipeline, work, terminal).
 */

export interface MarqueeRow {
  label: string;
  items: string[];
  dur: string;
  reverse: boolean;
}

export const MARQUEE_ROWS: MarqueeRow[] = [
  {
    label: "FRONTEND",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "React Query", "Zustand", "Tailwind", "Material UI"],
    dur: "38s",
    reverse: false,
  },
  {
    label: "BACKEND",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST", "Zod", "WebSockets"],
    dur: "32s",
    reverse: true,
  },
  {
    label: "AI & CLOUD",
    items: ["Speech-to-Text", "LLM Interfaces", "Voice Capture", "AWS", "Azure", "OAuth", "JWT"],
    dur: "36s",
    reverse: false,
  },
  {
    label: "CRAFT",
    items: ["GSAP", "Three.js", "Framer Motion", "Lenis", "Figma", "Git", "Agile"],
    dur: "30s",
    reverse: true,
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  desc: string;
  stack: string[];
}

export interface Project {
  index: string;
  sector: string;
  title: string;
  shot: string;
  role: string;
  blurb: string;
  statA: string;
  statALabel: string;
  statB: string;
  statBLabel: string;
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    sector: "AI · SAAS",
    title: "AI Agent Platform",
    shot: "AGENT CONSOLE — DASHBOARD",
    role: "Frontend lead at Verveo Solutions — platform architecture, the live call console, and the Chatbot SDK the whole product speaks through.",
    blurb:
      "A platform that runs inbound and outbound voice, SMS and email on behalf of businesses. Agents are configured, grounded in a knowledge base, and set loose on real conversations — with a live console watching every one.",
    statA: "4",
    statALabel: "CHANNELS",
    statB: "REAL-TIME",
    statBLabel: "TRANSCRIPTS",
    stack: ["React", "TypeScript", "Redux", "React Query", "WebSockets"],
  },
  {
    index: "02",
    sector: "AVIATION · ENTERPRISE",
    title: "Airport Revenue Management",
    shot: "REVENUE DASHBOARD",
    role: "Lead frontend engineer at Verveo Solutions — empty repository to production system, owned end to end for US clients.",
    blurb:
      "Built from zero as lead frontend for US-based clients: lease management, rent collection, revenue tracking and the reporting layer airports run their commercial operations on.",
    statA: "0→1",
    statALabel: "BUILT FROM SCRATCH",
    statB: "US",
    statBLabel: "CLIENT BASE",
    stack: ["React", "TypeScript", "Material UI", "REST"],
  },
  {
    index: "03",
    sector: "WEB3 · SOLANA",
    title: "Solana Platform",
    shot: "WALLET & TRANSACTION FLOW",
    role: "Frontend and Node services at Digiblock Network Solutions — the full surface, plus the component library the team built inside.",
    blurb:
      "An end-to-end Solana product — Next.js interface, Node services behind it. Wallet-aware flows, transaction state and on-chain data presented so that nothing about it feels experimental.",
    statA: "E2E",
    statALabel: "FRONT + BACK",
    statB: "Next.js",
    statBLabel: "RENDER LAYER",
    stack: ["Next.js", "Node.js", "Express", "Solana"],
  },
  {
    index: "04",
    sector: "EDTECH · SCALE",
    title: "Learning Management System",
    shot: "CLASSROOM MODULE",
    role: "Feature development and the performance pass at Navneet Toptech — complex academic logic, then making it load fast on school hardware.",
    blurb:
      "Used by schools across India. Complex academic business logic, dynamic content management, and a performance pass that mattered because a slow load means a stalled classroom.",
    statA: "India",
    statALabel: "SCHOOL NETWORK",
    statB: "↓ LCP",
    statBLabel: "PERF WORK",
    stack: ["React", "Node.js", "TypeScript", "MongoDB"],
  },
];

export interface PipelineNode {
  label: string;
  meta: string;
}

export const NODES: PipelineNode[] = [
  { label: "Voice Capture", meta: "MIC STREAM · VAD" },
  { label: "Speech-to-Text", meta: "STREAMING STT" },
  { label: "LLM Agent", meta: "TOOL CALLING" },
  { label: "Knowledge Base", meta: "GROUNDED RETRIEVAL" },
  { label: "Transcript Stream", meta: "LIVE TO CLIENT" },
  { label: "Workflow Automation", meta: "CRM · SMS · EMAIL" },
];

export interface ScriptLine {
  who: "AGENT" | "CALLER";
  text: string;
  stage: number;
}

export const SCRIPT: ScriptLine[] = [
  { who: "AGENT", text: "Thanks for calling Northgate Aviation — this is Ava. How can I help today?", stage: 5 },
  { who: "CALLER", text: "Hi, I need to check the rent invoice for our terminal lease.", stage: 0 },
  { who: "AGENT", text: "Of course. Pulling up the lease record now — one moment.", stage: 3 },
  {
    who: "AGENT",
    text: "Invoice #4482 was issued on the 1st for ₹2,40,000, due in eleven days. Want me to email a copy?",
    stage: 4,
  },
  { who: "CALLER", text: "Yes please, and add a reminder two days before.", stage: 0 },
  { who: "AGENT", text: "Sent, and the reminder is scheduled. Anything else I can take care of?", stage: 5 },
];

export const REPLIES = {
  default:
    "Good question. In production this routes to the agent with knowledge-base grounding — here it is a scripted stand-in for the real SDK.",
  stack:
    "The console is React and TypeScript with Redux and React Query, streaming transcripts over WebSockets, wrapped in a published Chatbot SDK.",
  hire: "Vyshak is open to frontend and AI-interface roles. vyshakharikumar98@gmail.com is the fastest route.",
  latency:
    "Perceived latency is handled with optimistic UI, token streaming and interruption support — the user never waits on a spinner.",
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Verveo Solutions",
    role: "Frontend Developer — Platform Lead",
    period: "NOV 2025 → PRESENT",
    location: "BENGALURU · CURRENT",
    desc: "Lead the frontend of an AI agent platform running inbound/outbound calls, SMS and email — knowledge bases, workflow automation and live conversation in one console.",
    stack: ["React", "TypeScript", "Redux", "React Query", "WebSockets"],
  },
  {
    company: "Navneet Toptech",
    role: "Software Development Engineer I",
    period: "SEP 2024 → NOV 2025",
    location: "BENGALURU · EDTECH",
    desc: "A learning management system used by schools across India — complex academic logic, and a performance pass felt by an entire classroom at once.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    company: "Digiblock Network",
    role: "Front-End Developer",
    period: "JAN 2024 → AUG 2024",
    location: "REMOTE · WEB3",
    desc: "A Solana-based platform taken end to end — wallet-aware flows, transaction states and on-chain data, plus a reusable component library for the team.",
    stack: ["Next.js", "Solana", "Node.js", "Express"],
  },
  {
    company: "Luminar Technolab",
    role: "MERN Stack Development Intern",
    period: "JUL 2023 → DEC 2023",
    location: "ERNAKULAM · THE START",
    desc: "Where the fundamentals were built: full-stack apps in React, Node, Express and MongoDB, and the debugging instinct that comes from owning something end to end.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
];
