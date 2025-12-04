import React from 'react';
import { AppConfig } from '../../type';
import { TabId } from '../../type';

type Props = {
  apps: AppConfig[];
  openTabs: TabId[];
  activeTabId: TabId;
  scrollToSection: (id: TabId) => void;
};

// Dock (barra inferior con iconos)
// Comentarios en español: este componente preserva las mismas clases Tailwind
// para mantener la apariencia exacta. Recibe la lista de apps, cuáles están
// abiertas y la pestaña activa. Al hacer click invoca `scrollToSection`.
const Dock: React.FC<Props> = ({ apps, openTabs, activeTabId, scrollToSection }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-3 px-4 py-3 bg-white/20 dark:bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all hover:scale-105 duration-500">
        {apps.map((app) => {
          const isOpen = openTabs.includes(app.id);
          const isActive = activeTabId === app.id;
          return (
            <div key={app.id} className="group relative flex flex-col items-center gap-1">
              <span className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{app.label}</span>
              <button
                onClick={() => scrollToSection(app.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-slate-100 dark:bg-slate-700 shadow-inner scale-110 border-b-2 border-blue-400' : isOpen ? 'bg-slate-50 dark:bg-slate-800 shadow-sm' : 'bg-white dark:bg-slate-700 shadow-lg hover:-translate-y-2 opacity-80 hover:opacity-100'}`}
              >
                <app.icon size={24} className={app.color} />
              </button>
              <div className={`w-1 h-1 rounded-full bg-slate-400 transition-all ${isOpen ? 'opacity-100' : 'opacity-0 scale-0'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
