import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Contexto global para el tema (claro/oscuro).
 */
const ThemeContext = createContext();

/**
 * Proveedor de contexto de tema. Permite alternar entre modo claro y oscuro.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  // Intenta leer del localStorage, si no, usa la preferencia del sistema
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Alterna entre modo claro y oscuro.
   */
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de tema.
 * @returns {{ theme: string, setTheme: function, toggleTheme: function }}
 */
export function useTheme() {
  return useContext(ThemeContext);
} 