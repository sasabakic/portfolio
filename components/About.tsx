import { MapPin, Radio, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-4xl px-5 py-24">
      <Reveal>
        <SectionHeading id="about" command="cat about.md" title="// about" />
      </Reveal>

      <Reveal delay={0.05}>
        <TerminalWindow title="about.md — markdown preview">
          <div className="space-y-4 leading-relaxed text-text">
            {profile.bio.map((para, i) => (
              <p key={i}>
                {i === 0 && <span className="mr-2 text-matrix">#</span>}
                {para}
              </p>
            ))}

            <div className="grid gap-3 border-t border-edge pt-5 text-sm sm:grid-cols-3">
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="h-4 w-4 text-matrix" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Radio className="h-4 w-4 text-matrix" />
                {profile.availability}
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-text-muted transition hover:text-matrix"
              >
                <Mail className="h-4 w-4 text-matrix" />
                {profile.email}
              </a>
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
