import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal as TermIcon, Command } from "lucide-react";
import { profile } from "@/data/portfolio";
import { scrollToSection } from "@/lib/utils";
import { useIsMac } from "@/lib/useIsMac";
import Typewriter from "@/components/Typewriter";

const bootLines = [
  "> initializing portfolio.sys ...",
  "> loading modules: react ✓  typescript ✓  symfony ✓",
  "> establishing secure connection ✓",
  "> access granted — welcome, visitor",
];

export default function Hero({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const isMac = useIsMac();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-5 pt-24 pb-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* boot log */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.18 } } }}
          className="mx-auto mb-8 max-w-md text-left text-xs text-text-muted sm:text-sm"
        >
          {bootLines.map((line) => (
            <motion.p
              key={line}
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0 },
              }}
              className="leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-3 text-sm text-text-muted"
        >
          {profile.handle}@portfolio:~$ whoami
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="text-5xl font-bold tracking-tight text-matrix text-glow sm:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="mt-4 text-xl text-text sm:text-2xl"
        >
          <span className="text-text-faint">{"<"}</span>
          <Typewriter phrases={profile.roles} className="mx-1 text-cyan" />
          <span className="text-text-faint">{"/>"}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-text-muted"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group inline-flex items-center gap-2 rounded-md border border-matrix bg-matrix/10 px-5 py-2.5 font-medium text-matrix transition hover:bg-matrix/20 hover:text-glow"
          >
            View projects
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-edge px-5 py-2.5 text-text transition hover:border-matrix hover:text-matrix"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 rounded-md border border-edge px-5 py-2.5 text-text transition hover:border-cyan hover:text-cyan"
            >
              <TermIcon className="h-4 w-4" />
              Open terminal
            </button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-8 inline-flex items-center gap-1.5 text-xs text-text-faint"
        >
          press
          <kbd className="inline-flex items-center gap-1 rounded border border-edge px-1.5 py-0.5 text-text-muted">
            {isMac ? (
              <>
                <Command className="h-3 w-3" />K
              </>
            ) : (
              "Ctrl + K"
            )}
          </kbd>
          for the command menu
        </motion.p>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-faint">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-xs"
        >
          ▼ scroll
        </motion.div>
      </div>
    </section>
  );
}
