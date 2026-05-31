/* ------------------------------------------------------------------ *
 *  PORTFOLIO CONTENT — edit everything here.
 *  All placeholder copy is marked with TODO. Replace with your details.
 * ------------------------------------------------------------------ */

export const profile = {
  // TODO: your real name
  name: "Saša Bakić",
  handle: "sasa", // used as the terminal user (e.g. sasa@portfolio:~$)
  // TODO: tweak roles — these rotate in the hero typewriter
  roles: [
    "Full-Stack Engineer",
    "Frontend Developer",
    "React Specialist",
    "Symfony / PHP Developer",
  ],
  // TODO: one-line tagline
  tagline: "I build fast, accessible interfaces and the APIs behind them.",
  // TODO: short bio (about section). Keep it punchy.
  bio: [
    "Frontend developer turned full-stack engineer. I started in the browser — React, TypeScript, design systems — and grew into owning features end to end, from Symfony APIs and database schemas to the pixels users actually touch.",
    "I care about performance, clean abstractions, and shipping things that don't break at 2am. Comfortable across the stack, happiest where product and engineering meet.",
  ],
  location: "Serbia", // TODO
  availability: "Open to interesting work", // TODO
  email: "sasa.bakic@infostud.com", // TODO
  social: {
    // TODO: replace with your real profiles (leave "" to hide a link)
    github: "https://github.com/your-handle",
    linkedin: "https://www.linkedin.com/in/your-handle",
    twitter: "",
  },
  // Path to your CV in /public. Drop your real PDF at public/resume.pdf
  resumeUrl: "/resume.pdf",
};

// Tier reflects how you actually work with a tool — not a made-up percentage.
//   core       = daily drivers, deep knowledge
//   proficient = comfortable, reach for regularly
//   familiar   = working knowledge, have shipped with it
export type Tier = "core" | "proficient" | "familiar";
export type Skill = { name: string; tier: Tier };
export type SkillGroup = { label: string; icon: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", tier: "core" },
      { name: "TypeScript", tier: "core" },
      { name: "HTML / CSS / a11y", tier: "core" },
      { name: "Tailwind CSS", tier: "core" },
      { name: "Next.js", tier: "proficient" },
      { name: "Redux / Zustand", tier: "proficient" },
    ],
  },
  {
    label: "Backend",
    icon: "server",
    skills: [
      { name: "Symfony", tier: "core" },
      { name: "PHP", tier: "core" },
      { name: "REST APIs", tier: "core" },
      { name: "Doctrine ORM", tier: "proficient" },
      { name: "MySQL / PostgreSQL", tier: "proficient" },
      { name: "Node.js", tier: "familiar" },
    ],
  },
  {
    label: "Tooling & Infra",
    icon: "terminal",
    skills: [
      { name: "Git", tier: "core" },
      { name: "Vite / Webpack", tier: "proficient" },
      { name: "Docker", tier: "proficient" },
      { name: "Testing (Jest/PHPUnit)", tier: "proficient" },
      { name: "CI/CD", tier: "familiar" },
      { name: "Cloudflare", tier: "familiar" },
    ],
  },
];

export type Project = {
  codename: string; // anonymized name (NDA-safe)
  domain: string; // industry / type of product
  summary: string; // what the product was, generically
  role: string;
  contributions: string[]; // what YOU did — safe to disclose
  stack: string[];
  nda: boolean;
};

export const projects: Project[] = [
  {
    codename: "Project Atlas",
    domain: "B2B SaaS · Logistics",
    summary:
      "A multi-tenant platform for managing operations at scale, used daily by hundreds of internal users.",
    role: "Full-Stack Engineer",
    contributions: [
      "Rebuilt the core dashboard in React + TypeScript, cutting initial load time by ~40%.",
      "Designed and shipped Symfony REST endpoints powering real-time data tables.",
      "Introduced a shared component library that standardized UI across 3 product areas.",
    ],
    stack: ["React", "TypeScript", "Symfony", "MySQL", "Docker"],
    nda: true,
  },
  {
    codename: "Project Helios",
    domain: "Consumer Web · Fintech",
    summary:
      "A customer-facing web app handling sensitive transactions with strict performance and accessibility budgets.",
    role: "Frontend Developer",
    contributions: [
      "Owned the checkout flow end to end, improving conversion through UX and perf work.",
      "Implemented WCAG-compliant components and keyboard navigation across the app.",
      "Integrated the frontend with a Symfony backend and third-party payment APIs.",
    ],
    stack: ["React", "Next.js", "Tailwind", "REST", "PHP"],
    nda: true,
  },
  {
    codename: "Project Orbit",
    domain: "Internal Tooling",
    summary:
      "A suite of internal tools that replaced manual spreadsheet workflows for an operations team.",
    role: "Full-Stack Engineer",
    contributions: [
      "Modeled the domain in Doctrine and built CRUD + reporting APIs in Symfony.",
      "Built data-heavy React views with virtualized tables and CSV export.",
      "Set up CI and Dockerized the dev environment for the team.",
    ],
    stack: ["Symfony", "Doctrine", "React", "TypeScript", "CI/CD"],
    nda: false,
  },
];

export type Job = {
  role: string;
  company: string; // can be anonymized if needed
  period: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Full-Stack Engineer",
    company: "Current Company", // TODO
    period: "2023 — Present",
    location: "Hybrid",
    points: [
      "Expanded from frontend into full-stack, owning features across React and Symfony.",
      "Ship and maintain production APIs alongside the interfaces that consume them.",
      "Collaborate with product and design to turn requirements into shipped software.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Previous Company", // TODO
    period: "2021 — 2023",
    location: "On-site",
    points: [
      "Built and maintained React/TypeScript applications used by thousands of users.",
      "Drove adoption of a component library and improved frontend performance.",
      "Partnered with backend engineers to design clean, typed API contracts.",
    ],
  },
];
