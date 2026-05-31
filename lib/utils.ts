import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, de-duplicating conflicting Tailwind classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Section ids used for nav, the command palette, and the interactive terminal. */
export const SECTIONS = [
  { id: "home", label: "home", cmd: "~" },
  { id: "about", label: "about", cmd: "cat about.md" },
  { id: "skills", label: "skills", cmd: "ls ./skills" },
  { id: "projects", label: "projects", cmd: "ls ./projects" },
  { id: "experience", label: "experience", cmd: "cat experience.log" },
  { id: "contact", label: "contact", cmd: "./contact.sh" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
