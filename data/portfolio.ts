/* ------------------------------------------------------------------ *
 *  PORTFOLIO CONTENT — edit everything here.
 * ------------------------------------------------------------------ */

export const profile = {
  name: "Saša Bakić",
  handle: "sasa", // used as the terminal user (e.g. sasa@portfolio:~$)
  // these rotate in the hero typewriter
  roles: [
    "Full-Stack Engineer",
    "Next.js / React Developer",
    "Symfony / PHP Developer",
  ],
  tagline: "I build fast, accessible interfaces and the APIs behind them.",
  bio: [
    "Frontend developer turned full-stack engineer. I started out working with React and TypeScript on the frontend, then got interested in the backend and grew into owning features end to end — from Symfony APIs and database schemas to the interface users actually interact with.",
    "I care about performance, clean abstractions, and shipping things that hold up in production. Comfortable across the stack, and most useful where product and engineering overlap.",
  ],
  location: "Subotica, Serbia",
  availability: "Open to interesting work",
  email: "sasabakiic@outlook.com",
  social: {
    github: "https://github.com/sasabakic",
    linkedin: "https://www.linkedin.com/in/sasabakic",
    twitter: "",
  },
  // Path to your CV in /public. Set to "/resume.pdf" once you drop the file in,
  // and the download buttons / commands re-appear automatically. "" hides them.
  resumeUrl: "",
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
      { name: "Next.js", tier: "core" },
      { name: "TypeScript", tier: "core" },
      { name: "HTML / CSS", tier: "core" },
      { name: "Tailwind CSS", tier: "core" },
      { name: "styled-components", tier: "proficient" },
      { name: "Apollo Client (GraphQL)", tier: "proficient" },
      { name: "Redux / Redux Toolkit", tier: "proficient" },
      { name: "Framer Motion", tier: "familiar" },
      { name: "Sass / SCSS", tier: "familiar" },
      { name: "Google Analytics (GA4)", tier: "familiar" },
    ],
  },
  {
    label: "Backend",
    icon: "server",
    skills: [
      { name: "Symfony", tier: "core" },
      { name: "PHP", tier: "core" },
      { name: "GraphQL", tier: "core" },
      { name: "REST APIs", tier: "core" },
      { name: "Doctrine ORM", tier: "proficient" },
      { name: "MySQL / PostgreSQL", tier: "proficient" },
      { name: "Memcached", tier: "proficient" },
      { name: "RabbitMQ", tier: "familiar" },
      { name: "Elasticsearch", tier: "familiar" },
    ],
  },
  {
    label: "Tooling & Infra",
    icon: "terminal",
    skills: [
      { name: "Git", tier: "core" },
      { name: "Docker", tier: "proficient" },
      { name: "Vite / Webpack", tier: "proficient" },
      { name: "Testing (Jest / PHPUnit)", tier: "familiar" },
      { name: "Playwright", tier: "familiar" },
      { name: "CI/CD", tier: "familiar" },
      { name: "Cloudflare", tier: "familiar" },
    ],
  },
];

export type Project = {
  name: string; // product name, or an anonymized codename for NDA work
  domain: string; // industry / type of product
  summary: string; // what the product is
  role: string;
  contributions?: string[]; // optional: what YOU did — safe to disclose
  stack: string[];
  nda: boolean;
};

export const projects: Project[] = [
  {
    name: "ATS",
    domain: "HR Tech · Recruitment",
    summary:
      "A feature-heavy applicant tracking and selection tool for recruiters — by far the most complex of these, spanning the full stack from data model to UI.",
    role: "Full-Stack Engineer",
    stack: [
      "Next.js",
      "React",
      "styled-components",
      "Apollo",
      "Redux",
      "Symfony",
      "Doctrine",
      "MySQL",
      "Memcached",
    ],
    nda: false,
  },
  {
    name: "Infostud CRM",
    domain: "Internal Tooling · CRM",
    summary:
      "An internal platform used company-wide for sales, account management, customer support, and day-to-day operations.",
    role: "Frontend Developer",
    stack: ["React", "Redux Toolkit", "styled-components"],
    nda: false,
  },
  {
    name: "helloworld.rs",
    domain: "Consumer Web · IT Job Platform",
    summary:
      "A public job-listing platform focused on the IT industry, connecting candidates with tech companies across the region.",
    role: "Frontend Developer",
    stack: ["Next.js", "React", "Tailwind CSS", "Apollo", "Redux"],
    nda: false,
  },
  {
    name: "Tools Webshop",
    domain: "E-commerce · Client work",
    summary:
      "An online store for tools and equipment, covering catalog browsing, cart, and checkout.",
    role: "Frontend Developer",
    stack: ["React", "Redux", "Sass"],
    nda: true,
  },
  {
    name: "Crypto Insights",
    domain: "Fintech · Crypto",
    summary:
      "A cryptocurrency analytics platform with market data, charts, and an expert's predictions and analyses.",
    role: "Frontend Developer",
    stack: ["React", "Redux", "Recharts", "Sass"],
    nda: true,
  },
  {
    name: "Delivery App",
    domain: "Mobile · Logistics",
    summary:
      "A cross-platform mobile app for on-demand delivery.",
    role: "Frontend Developer",
    stack: ["React Native", "Expo"],
    nda: true,
  },
  {
    name: "Materials Marketplace",
    domain: "Mobile · Marketplace",
    summary:
      "A cross-platform mobile marketplace app for building and construction materials.",
    role: "Frontend Developer",
    stack: ["React Native", "Expo"],
    nda: true,
  },
  {
    name: "Clinic Website",
    domain: "Healthcare · Presentational",
    summary:
      "A presentational marketing website for a medical clinic.",
    role: "Frontend Developer",
    stack: ["React", "Sass"],
    nda: true,
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
    company: "Infostud",
    period: "Apr 2023 — Present",
    location: "Subotica, Serbia · Hybrid",
    points: [
      "Build and ship full-stack features across React / Next.js frontends and Symfony / PHP APIs.",
      "Rotated through product teams — an internal CRM, the helloworld.rs job platform, and currently an applicant tracking system (ATS).",
      "Work closely with product and design to take features from requirements to production.",
    ],
  },
  {
    role: "Frontend Developer → Team Lead",
    company: "Concordsoft Solutions",
    period: "Aug 2021 — Mar 2023",
    location: "Subotica, Serbia · On-site",
    points: [
      "Delivered web and mobile frontends for international clients in an outsourcing setup.",
      "Built presentational websites and e-commerce webshops with a focus on responsive, pixel-accurate UI.",
      "Grew into a Team Lead / Project Manager role, coordinating delivery and mentoring developers.",
    ],
  },
];
