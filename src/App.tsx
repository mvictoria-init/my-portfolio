import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, Briefcase, FolderOpen, Palette, GraduationCap, 
  Mail, AppWindow
} from 'lucide-react';

import { DATA } from './translate';
import { Language, TabId, AppConfig } from './type';
import { Home } from './components/sections/Home';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { ThemeProvider } from './context/ContextApp';
import { useTheme } from './hooks/Hooks';
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
  { id: 'education', label: 'Education.tsx', icon: GraduationCap, color: 'text-yellow-500' },
  { id: 'contact', label: 'Contact.tsx', icon: Mail, color: 'text-red-500' },
  // { id: 'about', label: 'About.tsx', icon: User, color: 'text-orange-500' }
];

// FloatingParticle ahora está extraído en `src/components/ui/FloatingParticle.tsx`

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState<Language>('es');
  
  // Estado de pestañas
  const [activeTabId, setActiveTabId] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home', 'experience', 'projects', 'skills']);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  
  // Referencias
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Record<TabId, HTMLElement | null>>({} as Record<TabId, HTMLElement | null>);
  
  // El tema lo maneja ThemeProvider (añade/quita la clase `dark` y lo guarda en localStorage)

  // Inicialización
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Observador de scroll (spy)
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

  // Manejadores
  // `toggleTheme` desde el contexto

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
    <div className={`h-screen w-screen overflow-hidden font-sans transition-colors duration-500 text-slate-900 dark:text-slate-200`}>
      {/* CAPA DE FONDO */}
      <div className="fixed inset-0 bg-fuchsia-400 dark:bg-indigo-950 z-0 transition-colors duration-500">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-purple-900/20 blur-[100px] animate-float transition-colors duration-500" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-pink-900/20 blur-[100px] animate-float transition-colors duration-500" style={{ animationDelay: '2s' }} />
         <FloatingParticle top="20%" left="10%" size="10px" color="#F472B6" delay="0s" duration="4s" />
         <FloatingParticle top="70%" left="80%" size="15px" color="#818CF8" delay="1s" duration="6s" />
         <FloatingParticle top="40%" left="60%" size="8px" color="#34D399" delay="2s" duration="5s" />
      </div>

      {/* Lienzo de partículas (sobre el fondo, debajo de la ventana) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <ParticlesBg dark={theme === 'dark'} />
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className={`relative z-14 h-full flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        
        {/* VENTANA DEL NAVEGADOR */}
        <div className="w-[98vw] md:w-[96vw] lg:w-[94vw] xl:w-[90vw] max-w-[1800px] h-[85vh] bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-slate-300 dark:border-slate-700 ring-1 ring-slate-100 dark:ring-0 overflow-hidden relative transition-colors duration-500">
          
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
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative bg-white dark:bg-slate-900/50 scroll-smooth snap-container transition-colors duration-500 pb-28">
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

                      {/* Placeholders para el resto */}
                      {['education', 'about'].includes(app.id) && (
                        <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400 p-8 text-center transition-colors duration-500">
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

        {/* 4. DOCK (extraído) */}
        <Dock apps={APPS} openTabs={openTabs} activeTabId={activeTabId} scrollToSection={scrollToSection} />

        {/* Barra de depuración de tema (solo para verificar dark mode) */}
        <div className="fixed bottom-2 right-2 z-9999 px-3 py-2 rounded-md bg-white dark:bg-black text-black dark:text-white shadow border border-slate-200 dark:border-slate-700">
          Tema actual: {theme}
        </div>
      </div>
    </div>
  );
}