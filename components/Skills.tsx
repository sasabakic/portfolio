import { motion } from "framer-motion";
import { Layout, Server, Terminal, type LucideIcon } from "lucide-react";
import { skillGroups, type Tier } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  terminal: Terminal,
};

// Order + styling for each proficiency tier.
const TIERS: { key: Tier; label: string; tag: string }[] = [
  {
    key: "core",
    label: "core",
    tag: "border-matrix/50 bg-matrix/10 text-matrix",
  },
  {
    key: "proficient",
    label: "proficient",
    tag: "border-cyan/40 bg-cyan/10 text-cyan",
  },
  {
    key: "familiar",
    label: "familiar",
    tag: "border-edge bg-surface-2 text-text-muted",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-5xl px-5 py-24">
      <Reveal>
        <SectionHeading id="skills" command="ls ./skills --tree" title="// skills" />
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mb-8 max-w-2xl text-sm text-text-muted">
          <span className="text-matrix"># legend:</span> grouped by how I actually
          work with each — <span className="text-matrix">core</span> ·{" "}
          <span className="text-cyan">proficient</span> ·{" "}
          <span className="text-text-muted">familiar</span>.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = icons[group.icon] ?? Terminal;
          return (
            <Reveal key={group.label} delay={gi * 0.08}>
              <TerminalWindow title={`${group.label.toLowerCase()}/`} className="h-full">
                <div className="mb-5 flex items-center gap-2 text-matrix">
                  <Icon className="h-5 w-5" />
                  <h3 className="font-semibold">{group.label}</h3>
                </div>

                <div className="space-y-4">
                  {TIERS.map((tier) => {
                    const skills = group.skills.filter((s) => s.tier === tier.key);
                    if (skills.length === 0) return null;
                    return (
                      <div key={tier.key}>
                        <p className="mb-2 text-xs uppercase tracking-wider text-text-faint">
                          {tier.label}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <motion.li
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3 }}
                            >
                              <span
                                className={`inline-block rounded border px-2.5 py-1 text-sm transition hover:text-glow ${tier.tag}`}
                              >
                                {skill.name}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </TerminalWindow>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
