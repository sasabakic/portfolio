import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A reusable terminal "window" with traffic-light dots and a title bar. */
export default function TerminalWindow({
  title = "bash",
  children,
  className,
  bodyClassName,
  scanlines = false,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  scanlines?: boolean;
}) {
  return (
    <div className={cn("terminal box-glow relative overflow-hidden", className)}>
      <div className="terminal-bar">
        <span className="dot" style={{ background: "#ff5f56" }} />
        <span className="dot" style={{ background: "#ffbd2e" }} />
        <span className="dot" style={{ background: "#27c93f" }} />
        <span className="ml-2 truncate text-xs text-text-muted">{title}</span>
      </div>
      <div className={cn("relative p-5 sm:p-6", scanlines && "scanlines", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
