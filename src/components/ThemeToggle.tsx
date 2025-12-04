import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../type';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <button
      onClick={toggleTheme}
      className="text-slate-500 hover:text-yellow-500 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
      aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {isLight ? (
        <Moon size={16} />
      ) : (
        <Sun size={16} className="text-yellow-400" />
      )}
    </button>
  );
};