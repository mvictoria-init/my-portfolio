import React from 'react';
import type { AppConfig, TabId, Language } from '../../type';
import { X } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

// Barra superior que muestra pestañas, controles de idioma y tema
interface TopBarProps {
  apps: AppConfig[];
  openTabs: TabId[];
  activeTabId: TabId;
  scrollToSection: (id: TabId) => void;
  closeTab: (e: React.MouseEvent, id: TabId) => void;
  toggleLang: () => void;
  lang: Language;
  theme: string;
  toggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ apps, openTabs, activeTabId, scrollToSection, closeTab, toggleLang, lang, theme, toggleTheme }) => {
  return (
    <div className="h-12 bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 overflow-x-auto no-scrollbar shrink-0 z-20 transition-colors duration-500">
      <div className="flex gap-2 mr-4 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>

      {/* Render de pestañas abiertas (excepto 'home' si lo deseas ocultar) */}
      {openTabs.filter(id => id !== 'home').map(tabId => {
        const app = apps.find(a => a.id === tabId);
        if (!app) return null;
        const isActive = activeTabId === tabId;
        return (
          <div
            key={tabId}
            onClick={() => scrollToSection(tabId)}
            className={`
              group relative flex items-center gap-2 px-4 py-1.5 rounded-t-lg text-sm font-medium cursor-pointer transition-all select-none min-w-[140px] max-w-[200px]
              ${isActive
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm mt-2'
                : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 mt-2'
              }
            `}
          >
            <app.icon size={14} className={isActive ? app.color : 'text-slate-400'} />
            <span className="truncate flex-1">{app.label}</span>
            <button onClick={(e) => closeTab(e, tabId)} className={`p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
              <X size={12} />
            </button>
          </div>
        );
      })}

      <div className="flex-1" />

      {/* Controles de idioma y tema */}
      <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <button onClick={toggleLang} className="text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">{lang === 'es' ? 'EN' : 'ES'}</button>
        <ThemeToggle theme={theme as any} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default TopBar;
