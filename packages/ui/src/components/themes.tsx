"use client";

// biome-ignore lint/nursery/noExportedImports: <explanation>
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export const ThemeProvider = ({
  children,
  forcedTheme,
}: {
  children: React.ReactNode;
  forcedTheme?: "light" | "dark";
}) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={forcedTheme}
      storageKey="docbird-theme"
    >
      {children}
    </NextThemesProvider>
  );
};

export { useTheme };
