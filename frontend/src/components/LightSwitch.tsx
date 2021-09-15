import React, { useEffect, useState } from "react";

export const LightSwitch: React.FC<Props> = () => {
  const [isDark, setDark] = useState(false);
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(isDark.matches);
    isDark.addEventListener("change", (event: MediaQueryListEvent) => {
      setDark(event.matches);
    });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <span className="btn btn-sm" onClick={() => setDark(!isDark)}>
      {isDark ? "🌙" : "☀️"}
    </span>
  );
};

interface Props {}
