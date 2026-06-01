import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Mail,
  Download,
  Github,
  Linkedin,
  TerminalSquare,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { scrollToSection } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  run: () => void;
  keywords?: string;
};

export default function CommandPalette({
  open,
  setOpen,
  onOpenTerminal,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onOpenTerminal: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const actions: Action[] = useMemo(() => {
    const go = (id: string) => () => {
      setOpen(false);
      scrollToSection(id);
    };
    const open_ = (href: string) => () => {
      setOpen(false);
      window.open(href, href.startsWith("http") ? "_blank" : "_self");
    };
    const list: (Action | false)[] = [
      { id: "home", label: "Go to Home", hint: "section", icon: Home, run: go("home") },
      { id: "about", label: "Go to About", hint: "section", icon: User, run: go("about") },
      { id: "skills", label: "Go to Skills", hint: "section", icon: Cpu, run: go("skills") },
      { id: "projects", label: "Go to Projects", hint: "section", icon: FolderGit2, run: go("projects") },
      { id: "experience", label: "Go to Experience", hint: "section", icon: Briefcase, run: go("experience") },
      { id: "contact", label: "Go to Contact", hint: "section", icon: Mail, run: go("contact") },
      {
        id: "terminal",
        label: "Open interactive terminal",
        hint: "run",
        icon: TerminalSquare,
        run: () => {
          setOpen(false);
          onOpenTerminal();
        },
        keywords: "shell bash cli command",
      },
      profile.resumeUrl
        ? {
            id: "resume",
            label: "Download résumé (PDF)",
            hint: "download",
            icon: Download,
            run: () => {
              setOpen(false);
              const a = document.createElement("a");
              a.href = profile.resumeUrl;
              a.download = "";
              a.click();
            },
            keywords: "cv resume",
          }
        : false,
      { id: "email", label: "Send an email", hint: "link", icon: Mail, run: open_(`mailto:${profile.email}`) },
      profile.social.github
        ? {
            id: "github",
            label: "Open GitHub",
            hint: "link",
            icon: Github,
            run: open_(profile.social.github),
          }
        : false,
      profile.social.linkedin
        ? {
            id: "linkedin",
            label: "Open LinkedIn",
            hint: "link",
            icon: Linkedin,
            run: open_(profile.social.linkedin),
          }
        : false,
    ];
    return list.filter(Boolean) as Action[];
  }, [setOpen, onOpenTerminal]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.hint} ${a.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // global ⌘K / ctrl+K toggle + esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // focus after the open animation paints
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[selected]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="terminal box-glow relative w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
              <span className="text-matrix">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command or search…"
                className="w-full bg-transparent text-text placeholder:text-text-faint focus:outline-none"
              />
              <kbd className="rounded border border-edge px-1.5 py-0.5 text-[10px] text-text-faint">
                esc
              </kbd>
            </div>

            <ul ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-text-faint">
                  command not found: <span className="text-amber">{query}</span>
                </li>
              )}
              {results.map((a, i) => {
                const Icon = a.icon;
                const isSel = i === selected;
                return (
                  <li key={a.id}>
                    <button
                      onMouseEnter={() => setSelected(i)}
                      onClick={() => a.run()}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                        isSel ? "bg-matrix/15 text-matrix" : "text-text hover:bg-surface-2"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{a.label}</span>
                      <span className="text-[10px] uppercase tracking-wider text-text-faint">
                        {a.hint}
                      </span>
                      {isSel && <CornerDownLeft className="h-3.5 w-3.5 text-matrix" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
