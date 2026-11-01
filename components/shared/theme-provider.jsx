"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes with the `class` attribute strategy.
 *
 * <html> in app/layout.js carries `suppressHydrationWarning` — next-themes
 * injects a small inline script that applies the saved theme before first
 * paint, so the DOM may no longer match the server HTML.
 */
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
