import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, Briefcase, FolderOpen, Palette,
  Mail, AppWindow
} from 'lucide-react';

import { DATA } from './translate';
import { TabId, AppConfig } from './type';
import { Home } from './components/sections/Home';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { ThemeProvider, LanguageProvider } from './context/ContextApp';
import { useTheme, useTranslation } from './hooks/Hooks';
import FloatingParticle from './components/ui/FloatingParticle';
import ParticlesBg from './components/ui/ParticlesBg';
import TopBar from './components/layout/TopBar';
import AddressBar from './components/layout/AddressBar';
import Dock from './components/layout/Dock';

// --- CONFIGURACIÓN DE APPS ---
// Define el orden y metadatos de las pestañas
const APPS: AppConfig[] = [
  { id: 'home', label: 'Home.tsx', icon: HomeIcon, color: 'text-pink-500' },
  { id: 'experience', label: 'Experience.tsx', icon: Briefcase, color: 'text-purple-500' },
  { id: 'projects', label: 'Projects.tsx', icon: FolderOpen, color: 'text-blue-500' },
  { id: 'skills', label: 'Skills.tsx', icon: Palette, color: 'text-green-500' },
  { id: 'contact', label: 'Contact.tsx', icon: Mail, color: 'text-pink-500' },
];

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useTranslation();
  
  // Estado de pestañas
  const [activeTabId, setActiveTabId] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home', 'experience', 'projects', 'skills', 'contact']);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  
  // Referencias
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Record<TabId, HTMLElement | null>>({} as Record<TabId, HTMLElement | null>);
  
  // El tema lo maneja ThemeProvider (añade/quita la clase `dark` y lo guarda en localStorage)

  // Inicialización
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sincronizar la ruta del navegador con la pestaña activa
  useEffect(() => {
    const path = `/${activeTabId}`;
    try {
      window.history.replaceState(null, '', path);
    } catch (e) {
      // no bloquear si falta history
    }
  }, [activeTabId]);

  // Al cargar, si la ruta contiene una sección válida, abrirla
  useEffect(() => {
    const p = window.location.pathname.replace(/^\//, '');
    if (APPS.some(a => a.id === (p as TabId))) {
      const id = p as TabId;
      if (!openTabs.includes(id)) setOpenTabs(prev => [...prev, id]);
      setActiveTabId(id);
      // scroll to it after a short delay to allow refs to attach
      setTimeout(() => {
        const el = document.getElementById(`section-${id}`);
        el?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 150);
    }
  }, []);

  // Scroll-spy: determine active section based on which section is closest to
  // the vertical center of the scroll container. This is more stable across
  // viewport sizes than relying purely on IntersectionObserver thresholds.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;

    const computeActive = () => {
      if (isManualScrolling) return;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let bestId: TabId | null = null;
      let bestDist = Infinity;

      APPS.forEach(app => {
        const el = sectionsRef.current[app.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - containerCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = app.id;
        }
      });

      if (bestId && bestId !== activeTabId) {
        // eslint-disable-next-line no-console
        console.debug('[APP] scroll-spy best ->', bestId, 'dist:', bestDist);
        setActiveTabId(bestId);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
      }
    };

    // initial check
    computeActive();
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => container.removeEventListener('scroll', onScroll);
  }, [openTabs, isManualScrolling, activeTabId]);


  // Manejadores
  // `toggleTheme` desde el contexto

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  const closeTab = (e: React.MouseEvent, id: TabId) => {
    e.stopPropagation();
    setOpenTabs(prev => prev.filter(t => t !== id));
  };

  const scrollToSection = (id: TabId) => {
    setIsManualScrolling(true);
    setIsSwitching(true);

    // Pequeño retraso para permitir que comience la animación de "pestaña" (escala/desvanecimiento)
    setTimeout(() => {
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
          // terminar animación de pestaña
          setTimeout(() => { setIsSwitching(false); setTimeout(() => setIsManualScrolling(false), 420); }, 300);
        }, 100);
      } else {
        const el = document.getElementById(`section-${id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTabId(id);
        setTimeout(() => { setIsSwitching(false); setTimeout(() => setIsManualScrolling(false), 420); }, 300);
      }
    }, 120);
  };


  // Escucha eventos personalizados para abrir una sección desde cualquier componente
  useEffect(() => {
    const handler = (ev: Event) => {
      const custom = ev as CustomEvent;
      const id = custom?.detail as TabId | undefined;
      if (id) scrollToSection(id);
    };

    window.addEventListener('open-section', handler);
    return () => window.removeEventListener('open-section', handler);
  }, [openTabs, scrollToSection]);

  return (
    <div className={`h-screen w-screen overflow-hidden font-sans transition-colors duration-500 text-slate-900 dark:text-slate-200`}>
      {/* CAPA DE FONDO */}
      <div className="fixed inset-0 bg-fuchsia-400 dark:bg-indigo-950 z-0 transition-colors duration-500">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-purple-900/20 blur-[100px] animate-float transition-colors duration-500" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-pink-900/20 blur-[100px] animate-float transition-colors duration-500" style={{ animationDelay: '2s' }} />
         <FloatingParticle top="20%" left="10%" size="10px" color="#FBCFE8" delay="0s" duration="4s" />
         <FloatingParticle top="70%" left="80%" size="15px" color="#C4B5FD" delay="1s" duration="6s" />
         <FloatingParticle top="40%" left="60%" size="8px" color="#BBF7D0" delay="2s" duration="5s" />
      </div>

      {/* Lienzo de partículas (sobre el fondo, debajo de la ventana) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <ParticlesBg dark={theme === 'dark'} />
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className={`relative z-14 h-full flex flex-col items-center justify-center p-3 md:p-5 max-[382px]:p-1 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        
        {/* VENTANA DEL NAVEGADOR */}
        <div className="w-[98vw] md:w-[96vw] lg:w-[94vw] xl:w-[90vw] max-w-[1800px] h-[80vh] max-[382px]:h-[92vh] bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-slate-300 dark:border-slate-700 ring-1 ring-slate-100 dark:ring-0 overflow-hidden relative transition-colors duration-500">
          
          {/* 1. BARRA SUPERIOR (pestañas y controles) */}
          <TopBar
            apps={APPS}
            openTabs={openTabs}
            activeTabId={activeTabId}
            scrollToSection={scrollToSection}
            closeTab={closeTab}
            toggleLang={toggleLang}
            lang={lang}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* 2. BARRA DE DIRECCIÓN (extraído) */}
          <AddressBar activeTabId={activeTabId} />

          {/* 3. ÁREA DE DESPLAZAMIENTO */}
          <div
            ref={scrollContainerRef}
            className={`flex-1 overflow-y-auto relative bg-white dark:bg-slate-900/50 scroll-smooth snap-container transition-colors duration-500 pb-24 transform transition-all duration-300 ${isSwitching ? 'opacity-80 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
          >
            {openTabs.length === 0 ? (
               <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4 transition-colors duration-500">
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
                      {app.id === 'home' && <Home data={DATA} lang={lang} />}
                      {app.id === 'experience' && <Experience data={DATA} lang={lang} />}
                      {app.id === 'projects' && <Projects data={DATA} lang={lang} />}
                      {app.id === 'skills' && <Skills data={DATA} lang={lang} />}
                      {app.id === 'contact' && <Contact data={DATA} lang={lang} />}
                    </div>
                  </section>
                );
              })
            )}
            <div className="h-20 w-full shrink-0" />
          </div>
        </div>

        {/* 4. DOCK (extraído) */}
        <Dock apps={APPS} openTabs={openTabs} activeTabId={activeTabId} scrollToSection={scrollToSection} />

      </div>
    </div>
  );
}