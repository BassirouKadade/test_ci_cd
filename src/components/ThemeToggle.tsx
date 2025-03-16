import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Vérifie si window.matchMedia est disponible
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    // Valeur par défaut (clair) si matchMedia n'est pas disponible
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
};

export default ThemeToggle;