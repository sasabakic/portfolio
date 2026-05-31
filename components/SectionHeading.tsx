import { profile } from "@/data/portfolio";

/** Renders a shell-prompt-styled heading: `sasa@portfolio:~$ <command>` + a title. */
export default function SectionHeading({
  command,
  title,
  id,
}: {
  command: string;
  title: string;
  id: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm text-text-muted">
        <span className="text-matrix-dim">{profile.handle}@portfolio</span>
        <span className="text-text-faint">:</span>
        <span className="text-cyan">~/{id}</span>
        <span className="text-text-faint">$ </span>
        <span className="text-text">{command}</span>
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-matrix text-glow sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
