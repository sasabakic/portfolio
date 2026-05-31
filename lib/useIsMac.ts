import { useEffect, useState } from "react";

/**
 * True on macOS/iOS. Defaults to `true` so server render and the first client
 * render match (no hydration mismatch); corrected in an effect after mount.
 * Used to label the command-menu shortcut as ⌘K (Mac) vs Ctrl+K (Windows/Linux).
 */
export function useIsMac() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const platform = (
      nav.userAgentData?.platform ||
      nav.platform ||
      ""
    ).toLowerCase();
    setIsMac(/mac|iphone|ipad|ipod/.test(platform));
  }, []);

  return isMac;
}
