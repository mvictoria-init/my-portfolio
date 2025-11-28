import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, Briefcase, FolderOpen, Palette, GraduationCap, 
  Mail, User, AppWindow, X, Sun, Moon, ArrowLeft, ArrowRight, RotateCw, Lock
} from 'lucide-react';

import { DATA } from './translate';
import { Theme, Language, TabId, AppConfig } from './type';
import { HomeSection, ExperienceSection, ProjectsSection, SkillsSection } from './components/sections/Sections';

// --- CONFIGURACIÓN DE APPS ---
// Define el orden y metadatos de las pestañas
const APPS: AppConfig[] = [
  { id: 'home', label: 'Home.tsx', icon: HomeIcon, color: 'text-pink-500' },
  { id: 'experience', label: 'Experience.json', icon: Briefcase, color: 'text-purple-500' },
  { id: 'projects', label: 'Projects.js', icon: FolderOpen, color: 'text-blue-500' },
  { id: 'skills', label: 'Skills.css', icon: Palette, color: 'text-green-500' },
  { id: 'education', label: 'Education.md', icon: GraduationCap, color: 'text-yellow-500' },
  { id: 'contact', label: 'Contact.tsx', icon: Mail, color: 'text-red-500' },
  { id: 'about', label: 'About.txt', icon: User, color: 'text-orange-500' }
];

// Helper para UI
const FloatingParticle = ({ delay, duration, top, left, size, color }: any) => (
  <div className="absolute rounded-full opacity-40 blur-sm animate-float"
    style={{ top, left, width: size, height: size, backgroundColor: color, animationDelay: delay, animationDuration: duration }}
  />
);

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  
  // Tabs State
  const [activeTabId, setActiveTabId] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home', 'experience', 'projects', 'skills']);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Record<TabId, HTMLElement | null>>({} as Record<TabId, HTMLElement | null>);

  // Inicialización
  useEffect(() => {
    setIsLoaded(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Scroll Observer (Spy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tabId = entry.target.id.replace('section-', '') as TabId;
            setActiveTabId(tabId);
          }
        });
      },
      { root: scrollContainerRef.current, threshold: 0.6 }
    );

    APPS.forEach(app => {
      const el = sectionsRef.current[app.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [openTabs, isManualScrolling]);

  // Handlers
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const closeTab = (e: React.MouseEvent, id: TabId) => {
    e.stopPropagation();
    setOpenTabs(prev => prev.filter(t => t !== id));
  };

  const scrollToSection = (id: TabId) => {
    setIsManualScrolling(true);
    
    // Si no está abierta, abrirla y scrollear
    if (!openTabs.includes(id)) {
      setOpenTabs(prev => {
        // Mantenemos el orden original definido en APPS
        const newTabs = [...prev, id];
        return APPS.filter(app => newTabs.includes(app.id)).map(app => app.id);
      });
      
      // Delay para permitir renderizado
      setTimeout(() => {
        const el = document.getElementById(`section-${id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTabId(id);
        setTimeout(() => setIsManualScrolling(false), 800);
      }, 100);
    } else {
      const el = document.getElementById(`section-${id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTabId(id);
      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  return (
    <div className={`${theme} h-screen w-screen overflow-hidden font-sans transition-colors duration-500`}>
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 bg-stone-50 dark:bg-slate-900 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/30 dark:bg-purple-900/20 blur-[100px] animate-float" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-300/30 dark:bg-pink-900/20 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
         <FloatingParticle top="20%" left="10%" size="10px" color="#F472B6" delay="0s" duration="4s" />
         <FloatingParticle top="70%" left="80%" size="15px" color="#818CF8" delay="1s" duration="6s" />
         <FloatingParticle top="40%" left="60%" size="8px" color="#34D399" delay="2s" duration="5s" />
      </div>

      {/* MAIN DESKTOP AREA */}
      <div className={`relative z-10 h-full flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        
        {/* BROWSER WINDOW */}
        <div className="w-full max-w-6xl h-[85vh] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-white/50 dark:border-slate-700/50 overflow-hidden relative">
          
          {/* 1. TOP BAR (Tabs) */}
          <div className="h-12 bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
            <div className="flex gap-2 mr-4 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* Render Tabs (Except Home) */}
            {openTabs.filter(id => id !== 'home').map(tabId => {
              const app = APPS.find(a => a.id === tabId);
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
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <button onClick={toggleLang} className="text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">{lang === 'es' ? 'EN' : 'ES'}</button>
              <button onClick={toggleTheme} className="text-slate-500 hover:text-yellow-500 transition-colors">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button>
            </div>
          </div>

          {/* 2. ADDRESS BAR */}
          <div className="h-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4 shrink-0 z-20">
            <div className="flex gap-4 text-slate-400">
              <ArrowLeft size={16} /> <ArrowRight size={16} /> <RotateCw size={16} />
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
              <Lock size={10} className="text-green-500" /> localhost:3000/{activeTabId}
            </div>
          </div>

          {/* 3. SCROLL AREA */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative bg-slate-50/50 dark:bg-slate-900/50 scroll-smooth snap-container">
            {openTabs.length === 0 ? (
               <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
                 <AppWindow size={48} className="opacity-50"/>
                 <p>Open an app from the dock to get started</p>
               </div>
            ) : (
              APPS.map((app) => {
                if (!openTabs.includes(app.id)) return null;
                
                return (
                  <section 
                    key={app.id} 
                    id={`section-${app.id}`} 
                    ref={(el: HTMLElement | null) => { sectionsRef.current[app.id] = el; }} 
                    className="min-h-full w-full snap-section flex flex-col relative"
                  >
                    <div className="flex-1">
                      {app.id === 'home' && <HomeSection data={DATA} lang={lang} />}
                      {app.id === 'experience' && <ExperienceSection data={DATA} lang={lang} />}
                      {app.id === 'projects' && <ProjectsSection data={DATA} lang={lang} />}
                      {app.id === 'skills' && <SkillsSection data={DATA} lang={lang} />}
                      {/* Placeholders para el resto */}
                      {['education', 'contact', 'about'].includes(app.id) && (
                        <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400 p-8 text-center">
                            {app.id === 'contact' && (
                                <div className="flex flex-col items-center"><h2 className="text-2xl font-bold mb-2">Contact Me</h2><p className="text-purple-600">{DATA.profile.email}</p></div>
                            )}
                            {app.id === 'about' && <p className="max-w-xl text-lg">{DATA.profile.about[lang]}</p>}
                            {app.id === 'education' && <p>View full details in PDF</p>}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })
            )}
            <div className="h-20 w-full shrink-0" />
          </div>
        </div>

        {/* 4. DOCK */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
           <div className="flex items-end gap-3 px-4 py-3 bg-white/20 dark:bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all hover:scale-105">
             {APPS.map((app) => {
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
      </div>
    </div>
  );
}