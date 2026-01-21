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
// para mantener la apariencia exacta. Recibe la lista de apps, cuáles están
// abiertas y la pestaña activa. Al hacer click invoca `scrollToSection`.
const Dock: React.FC<Props> = ({ apps, openTabs, activeTabId, scrollToSection }) => {
  return (
    <div className="fixed bottom-6 left-1/2 right-auto z-50 flex justify-center pointer-events-auto mb-0 -translate-x-1/2">
      <div className="w-[calc(100%-6px)] max-w-[1024px] mx-auto pointer-events-auto flex items-center gap-3 px-3 py-3 pb-4 bg-white/20 dark:bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105">
        {apps.map((app) => {
          const isOpen = openTabs.includes(app.id);
          const isActive = activeTabId === app.id;
          return (
            <div key={app.id} className="group relative flex flex-col items-center gap-1">
              <span className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{app.label}</span>
              <button
                onClick={() => scrollToSection(app.id)}
                className={`flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-slate-100 dark:bg-slate-700 shadow-inner scale-110 border-b-2 border-blue-400' : isOpen ? 'bg-slate-50 dark:bg-slate-800 shadow-sm' : 'bg-white dark:bg-slate-700 shadow-lg opacity-90 hover:opacity-100'} w-14 h-14 max-[372px]:w-10 max-[372px]:h-10 rounded-xl`}
              >
                <app.icon className={`${app.color} w-6 h-6 max-[372px]:w-4 max-[372px]:h-4`} />
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
