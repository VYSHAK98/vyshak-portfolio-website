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
