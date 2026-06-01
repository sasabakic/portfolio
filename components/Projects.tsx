import { Lock, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-5xl px-5 py-24">
      <Reveal>
        <SectionHeading id="projects" command="ls ./projects -la" title="// projects" />
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mb-8 max-w-2xl text-sm text-text-muted">
          <span className="text-amber"># note:</span> a mix of internal and
          public products I&apos;ve shipped. Kept intentionally high-level —
          role and stack, no internals.
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.07}>
            <TerminalWindow title={`${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}.proj`} className="h-full">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-matrix text-glow">
                    {project.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-cyan">
                    {project.domain}
                  </p>
                </div>
                {project.nda && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded border border-amber/40 bg-amber/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-amber">
                    <Lock className="h-3 w-3" />
                    NDA
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {project.summary}
              </p>

              <p className="mt-4 text-xs text-text-faint">
                role: <span className="text-text">{project.role}</span>
              </p>

              {project.contributions && project.contributions.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex gap-2 text-text">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-matrix" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-2 border-t border-edge pt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-edge bg-surface-2 px-2 py-0.5 text-xs text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TerminalWindow>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
