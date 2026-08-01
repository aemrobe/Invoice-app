"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { MoonIcon, SunIcon } from "@/components/icons";

function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const { mounted } = useMounted();

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="group hover:cursor-pointer focusable-ring rounded-md"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <SunIcon
          className={
            "text-icon-theme-light group-hover:text-icon-theme-hover w-5 h-5 transition-fast "
          }
        />
      ) : (
        <MoonIcon
          className={
            "text-icon-theme-dark group-hover:text-icon-theme-hover w-5 h-5 transition-fast"
          }
        />
      )}
    </button>
  );
}

export default ThemeToggler;
