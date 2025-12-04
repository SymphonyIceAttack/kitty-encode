"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// 现代主题管理 Hook (替代 next-themes)
export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(
    "system",
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  // 初始化主题
  useEffect(() => {
    const stored = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setThemeState(stored);
    } else {
      setThemeState("system");
    }

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement;
    const effectiveTheme = theme === "system" ? systemTheme : theme;

    // 移除所有主题类
    root.classList.remove("light", "dark");
    // 添加当前主题类
    root.classList.add(effectiveTheme);

    // 保存到本地存储
    localStorage.setItem("theme", theme);
  }, [theme, systemTheme]);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
  };

  return {
    theme,
    effectiveTheme: theme === "system" ? systemTheme : theme,
    setTheme,
    systemTheme,
  };
}

export function ThemeToggle() {
  const { effectiveTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
      aria-label="Toggle theme"
      title={`Current theme: ${effectiveTheme}. Click to toggle.`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
