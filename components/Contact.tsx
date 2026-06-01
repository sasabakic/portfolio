import { Mail, Github, Linkedin, Twitter, Download, type LucideIcon } from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/Reveal";

type Link = { label: string; value: string; href: string; icon: LucideIcon };

export default function Contact() {
  const links: Link[] = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    profile.social.github && {
      label: "github",
      value: profile.social.github.replace(/^https?:\/\//, ""),
      href: profile.social.github,
      icon: Github,
    },
    profile.social.linkedin && {
      label: "linkedin",
      value: profile.social.linkedin.replace(/^https?:\/\//, ""),
      href: profile.social.linkedin,
      icon: Linkedin,
    },
    profile.social.twitter && {
      label: "twitter",
      value: profile.social.twitter.replace(/^https?:\/\//, ""),
      href: profile.social.twitter,
      icon: Twitter,
    },
  ].filter(Boolean) as Link[];

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-3xl px-5 py-24">
      <Reveal>
        <SectionHeading id="contact" command="./contact.sh" title="// get in touch" />
      </Reveal>

      <Reveal delay={0.05}>
        <TerminalWindow title="contact.sh — running" scanlines>
          <p className="mb-5 text-sm text-text-muted">
            <span className="text-matrix">$</span> echo &quot;Let&apos;s build
            something. Pick a channel:&quot;
          </p>

          <ul className="divide-y divide-edge">
            {links.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 py-3 transition hover:text-matrix"
                >
                  <Icon className="h-5 w-5 text-matrix" />
                  <span className="w-20 shrink-0 text-xs uppercase tracking-wider text-text-faint">
                    {label}
                  </span>
                  <span className="truncate text-sm text-text group-hover:text-matrix">
                    {value}
                  </span>
                  <span className="ml-auto text-text-faint transition group-hover:translate-x-1 group-hover:text-matrix">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-matrix bg-matrix/10 px-5 py-2.5 font-medium text-matrix transition hover:bg-matrix/20"
            >
              <Download className="h-4 w-4" />
              Download résumé (PDF)
            </a>
          )}
        </TerminalWindow>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-xs text-text-faint">
          <span className="text-matrix-dim">{profile.handle}@portfolio</span>:~$
          exit 0 — built with Next.js · deployed on Cloudflare ·{" "}
          {profile.name}
        </p>
      </Reveal>
    </section>
  );
}
