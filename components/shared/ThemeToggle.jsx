"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Light ↔ dark toggle.
 *
 * The icon is driven purely by CSS (`dark:` variant) so server and client
 * render the same markup — no mounted-state dance and no hydration mismatch,
 * even when the theme follows the OS preference.
 */
export function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    // resolvedTheme can be unavailable before hydration — fall back to the
    // class next-themes has already set on <html>.
    const isDark =
      resolvedTheme === "dark" ||
      (resolvedTheme === undefined &&
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark"));
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className={className}
    >
      {/* Sun shows in light mode (clicking it goes dark)… */}
      <SunIcon className="size-4 dark:hidden" />
      {/* …Moon shows in dark mode (clicking it goes light). */}
      <MoonIcon className="hidden size-4 dark:block" />
    </Button>
  );
}
