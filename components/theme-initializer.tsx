"use client";

import { useEffect } from "react";

// 主题初始化组件 - 确保在应用启动时设置正确的主题
export function ThemeInitializer() {
  useEffect(() => {
    // 获取存储的主题设置
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    const theme = storedTheme || "system";

    // 获取系统主题
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const effectiveTheme = theme === "system" ? systemTheme : theme;

    // 设置初始主题类
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
  }, []);

  return null; // 这个组件不渲染任何内容
}
