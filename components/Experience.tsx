import { Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-4xl px-5 py-24">
      <Reveal>
        <SectionHeading
          id="experience"
          command="cat experience.log"
          title="// experience"
        />
      </Reveal>

      <div className="relative ml-2 border-l border-edge pl-8">
        {experience.map((job, i) => (
          <Reveal key={job.role + job.company} delay={i * 0.08}>
            <div className="relative pb-12 last:pb-0">
              {/* node */}
              <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border border-matrix bg-bg">
                <span className="h-2 w-2 rounded-full bg-matrix" style={{ boxShadow: "0 0 8px #00ff7f" }} />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-text">
                  <Briefcase className="h-4 w-4 text-matrix" />
                  {job.role}
                </h3>
                <span className="font-mono text-xs text-cyan">{job.period}</span>
              </div>

              <p className="mt-0.5 text-sm text-matrix-dim">
                {job.company} · <span className="text-text-faint">{job.location}</span>
              </p>

              <ul className="mt-3 space-y-1.5">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-text-muted">
                    <span className="text-matrix">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
