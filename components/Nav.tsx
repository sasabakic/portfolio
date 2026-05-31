import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { SECTIONS, scrollToSection, cn } from "@/lib/utils";
import { useIsMac } from "@/lib/useIsMac";
import { profile } from "@/data/portfolio";

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const isMac = useIsMac();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-edge bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => scrollToSection("home")}
          className="font-bold text-matrix text-glow"
        >
          {profile.handle}
          <span className="animate-blink text-matrix">_</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.filter((s) => s.id !== "home").map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollToSection(s.id)}
                className={cn(
                  "rounded px-3 py-1.5 text-sm transition",
                  active === s.id
                    ? "text-matrix text-glow"
                    : "text-text-muted hover:text-text",
                )}
              >
                <span className="text-text-faint">/</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onOpenPalette}
          className="inline-flex items-center gap-2 rounded-md border border-edge px-3 py-1.5 text-xs text-text-muted transition hover:border-matrix hover:text-matrix"
          aria-label="Open command menu"
        >
          <span className="hidden sm:inline">menu</span>
          <kbd className="inline-flex items-center gap-1 rounded bg-surface-2 px-1.5 py-0.5 text-[10px]">
            {isMac ? (
              <>
                <Command className="h-3 w-3" />K
              </>
            ) : (
              "Ctrl + K"
            )}
          </kbd>
        </button>
      </nav>
    </header>
  );
}
