import { useEffect, useRef } from "react";

/**
 * Full-viewport "digital rain" rendered on a single canvas.
 * - Pauses when the tab is hidden and when the user prefers reduced motion.
 * - Sits behind all content (z-0) at low opacity so text stays readable.
 */
export default function MatrixRain({ opacity = 0.5 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789ＡＢＣＤＥabcdef{}[]<>/\\=+*$#".split(
        "",
      );

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -window.innerHeight) / fontSize),
      );
    };
    resize();

    let raf = 0;
    let last = 0;
    const interval = 1000 / 24; // ~24fps is plenty and saves battery

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < interval) return;
      last = t;

      // translucent black wash creates the fading trail
      ctx.fillStyle = "rgba(5, 8, 7, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${fontSize}px var(--font-jetbrains), monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // leading glyph is bright, the rest is dim green
        if (Math.random() > 0.975) {
          ctx.fillStyle = "#c9ffe4";
        } else {
          ctx.fillStyle = "#00ff7f";
        }
        ctx.fillText(char, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (!reduce) {
      raf = requestAnimationFrame(draw);
    } else {
      // static, very subtle frame for reduced-motion users
      ctx.fillStyle = "rgba(0, 255, 127, 0.04)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
}
