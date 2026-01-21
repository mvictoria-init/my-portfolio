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

// Context for the app language. Allows changing the language globally.
export const LanguageContext = createContext<{
  lang: 'es' | 'en';
  setLang: (l: 'es' | 'en') => void;
}>({
  lang: 'es',
  setLang: () => {},
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
    // Add a data attribute to ease debugging in the DOM inspector
    try { root.setAttribute('data-theme', theme); } catch {}
    try { localStorage.setItem('theme', theme); } catch {}
    // Debug logs to help track theme changes during development
    console.log('[ThemeProvider] theme set to', theme);
    try {
      // log current root.classList and count of elements with the 'dark' class
      console.log('[ThemeProvider] root.classList=', Array.from(root.classList).join(' '));
      const darkEls = document.querySelectorAll('.dark');
      console.log('[ThemeProvider] elements with .dark=', darkEls.length);
    } catch (err) { console.error(err);}
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// A simple provider to expose the app language.
export const LanguageProvider: React.FC<{ children: ReactNode; initial?: 'es' | 'en' }> = ({ children, initial = 'es' }) => {
  const [lang, setLang] = useState<'es' | 'en'>(initial);

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
