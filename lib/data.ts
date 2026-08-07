/**
 * Content constants, copied verbatim from the design reference's inline
 * PROJECTS/EXPERIENCES/etc. arrays. Grows as later sections need their
 * own data (AI pipeline, work, terminal).
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  desc: string;
  stack: string[];
}

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
