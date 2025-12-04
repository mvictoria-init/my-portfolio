import React, { createContext, useEffect, useState, ReactNode } from 'react';
import type { Theme } from '../type';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark' || saved === 'light') return saved as Theme;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    // Add a data attribute for easier debugging in DOM inspector
    try { root.setAttribute('data-theme', theme); } catch {}
    try { localStorage.setItem('theme', theme); } catch {}
    // Debug logs to help trace theme changes during development
    // eslint-disable-next-line no-console
    console.log('[ThemeProvider] theme set to', theme);
    try {
      // show current classList for root and count of elements with 'dark' class
      // eslint-disable-next-line no-console
      console.log('[ThemeProvider] root.classList=', Array.from(root.classList).join(' '));
      // eslint-disable-next-line no-console
      const darkEls = document.querySelectorAll('.dark');
      // eslint-disable-next-line no-console
      console.log('[ThemeProvider] elements with .dark=', darkEls.length);
    } catch (err) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
