import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, X } from "lucide-react";
import { profile, skillGroups, projects, experience } from "@/data/portfolio";
import { SECTIONS, scrollToSection } from "@/lib/utils";

type Line = { type: "in" | "out"; node: ReactNode };

const prompt = (
  <>
    <span className="text-matrix-dim">{profile.handle}@portfolio</span>
    <span className="text-text-faint">:</span>
    <span className="text-cyan">~</span>
    <span className="text-text-faint">$ </span>
  </>
);

const HELP: [string, string][] = [
  ["help", "show this list"],
  ["whoami", "who is this guy"],
  ["about", "print bio"],
  ["skills", "list the tech stack"],
  ["projects", "list projects"],
  ["experience", "print work history"],
  ["contact / social", "ways to reach me"],
  ["resume", "download my CV"],
  ["goto <section>", "jump to a section"],
  ["echo <text>", "say something"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

export default function InteractiveTerminal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const banner: Line[] = [
    {
      type: "out",
      node: (
        <pre
          className="overflow-x-auto text-[0.6rem] leading-tight text-matrix sm:text-xs"
          style={{ textShadow: "0 0 6px rgba(0, 255, 127, 0.45)" }}
        >{String.raw`
                   _    __       _ _
  _ __   ___  _ __| |_ / _| ___ | (_) ___
 | '_ \ / _ \| '__| __| |_ / _ \| | |/ _ \
 | |_) | (_) | |  | |_|  _| (_) | | | (_) |
 | .__/ \___/|_|   \__|_|  \___/|_|_|\___/
 |_|
`}</pre>
      ),
    },
    {
      type: "out",
      node: (
        <span className="text-text-muted">
          Interactive shell. Type <span className="text-matrix">help</span> to
          get started.
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (open) {
      if (lines.length === 0) setLines(banner);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  const push = (nodes: ReactNode[]) =>
    setLines((prev) => [...prev, ...nodes.map((node) => ({ type: "out" as const, node }))]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const echo: Line = {
      type: "in",
      node: (
        <span>
          {prompt}
          <span className="text-text">{cmd}</span>
        </span>
      ),
    };
    setLines((prev) => [...prev, echo]);
    if (!cmd) return;

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        push([
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2" key="h">
            {HELP.map(([c, d]) => (
              <div key={c}>
                <span className="text-matrix">{c.padEnd(16)}</span>
                <span className="text-text-muted">{d}</span>
              </div>
            ))}
          </div>,
        ]);
        break;
      case "whoami":
        push([
          <span key="w" className="text-text">
            {profile.name} — {profile.roles.join(" · ")}
          </span>,
        ]);
        break;
      case "about":
        push(profile.bio.map((p, i) => <span key={i} className="text-text-muted">{p}</span>));
        break;
      case "skills":
        push(
          skillGroups.map((g) => (
            <div key={g.label}>
              <span className="text-matrix">{g.label}:</span>{" "}
              <span className="text-text-muted">
                {g.skills.map((s) => s.name).join(", ")}
              </span>
            </div>
          )),
        );
        break;
      case "projects":
        push(
          projects.map((p) => (
            <div key={p.name}>
              <span className="text-cyan">{p.name}</span>{" "}
              <span className="text-text-faint">— {p.domain}</span>
            </div>
          )),
        );
        break;
      case "experience":
        push(
          experience.map((j) => (
            <div key={j.role + j.company}>
              <span className="text-text">{j.role}</span>{" "}
              <span className="text-text-faint">@ {j.company}</span>{" "}
              <span className="text-cyan">({j.period})</span>
            </div>
          )),
        );
        break;
      case "contact":
      case "social":
        push([
          <div key="c">
            <div><span className="text-matrix">email   </span><a className="text-text-muted underline" href={`mailto:${profile.email}`}>{profile.email}</a></div>
            {profile.social.github && <div><span className="text-matrix">github  </span><a className="text-text-muted underline" href={profile.social.github} target="_blank" rel="noreferrer">{profile.social.github}</a></div>}
            {profile.social.linkedin && <div><span className="text-matrix">linkedin</span> <a className="text-text-muted underline" href={profile.social.linkedin} target="_blank" rel="noreferrer">{profile.social.linkedin}</a></div>}
          </div>,
        ]);
        break;
      case "resume":
      case "cv": {
        if (!profile.resumeUrl) {
          push([<span key="r" className="text-amber">résumé not available right now.</span>]);
          break;
        }
        const a = document.createElement("a");
        a.href = profile.resumeUrl;
        a.download = "";
        a.click();
        push([<span key="r" className="text-text-muted">downloading {profile.resumeUrl} …</span>]);
        break;
      }
      case "ls":
        push([
          <span key="ls" className="text-text-muted">
            {SECTIONS.map((s) => s.id).join("  ")}
            {profile.resumeUrl ? "  resume.pdf" : ""}
          </span>,
        ]);
        break;
      case "goto":
      case "cd": {
        const target = SECTIONS.find((s) => s.id === arg.toLowerCase());
        if (target) {
          push([<span key="g" className="text-text-muted">→ {target.id}</span>]);
          setOpen(false);
          setTimeout(() => scrollToSection(target.id), 250);
        } else {
          push([<span key="g" className="text-amber">no such section: {arg || "(none)"}</span>]);
        }
        break;
      }
      case "echo":
        push([<span key="e" className="text-text">{arg}</span>]);
        break;
      case "date":
        push([<span key="d" className="text-text-muted">{new Date().toString()}</span>]);
        break;
      case "sudo":
        push([<span key="s" className="text-amber">nice try. permission denied. 😏</span>]);
        break;
      case "matrix":
        push([<span key="m" className="text-matrix text-glow">Wake up… the rain never stopped. 🟢</span>]);
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        setOpen(false);
        return;
      default:
        push([
          <span key="nf" className="text-amber">
            command not found: {name}. try <span className="text-matrix">help</span>.
          </span>,
        ]);
    }
  };

  const submit = () => {
    run(value);
    if (value.trim()) {
      setHistory((h) => [...h, value]);
    }
    setHistIdx(-1);
    setValue("");
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistory((h) => {
        if (h.length === 0) return h;
        const idx = histIdx === -1 ? h.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setValue(h[idx]);
        return h;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistory((h) => {
        if (histIdx === -1) return h;
        const idx = histIdx + 1;
        if (idx >= h.length) {
          setHistIdx(-1);
          setValue("");
        } else {
          setHistIdx(idx);
          setValue(h[idx]);
        }
        return h;
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            className="terminal box-glow relative flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="terminal-bar">
              <span className="dot" style={{ background: "#ff5f56" }} />
              <span className="dot" style={{ background: "#ffbd2e" }} />
              <span className="dot" style={{ background: "#27c93f" }} />
              <span className="ml-2 text-xs text-text-muted">
                {profile.handle}@portfolio: ~ — zsh
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="ml-auto text-text-faint transition hover:text-matrix"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="scanlines flex-1 cursor-text space-y-1.5 overflow-y-auto p-4 text-sm"
            >
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {line.node}
                </div>
              ))}
              <div className="flex items-center">
                {prompt}
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  enterKeyHint="send"
                  aria-label="Terminal input"
                  className="ml-0 flex-1 bg-transparent text-text caret-matrix focus:outline-none"
                />
                <button
                  type="button"
                  onClick={submit}
                  aria-label="Run command"
                  className="ml-2 flex shrink-0 items-center gap-1 rounded border border-edge px-2 py-1 text-xs text-text-muted transition hover:border-matrix hover:text-matrix lg:hidden"
                >
                  <CornerDownLeft className="h-3.5 w-3.5" />
                  enter
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
