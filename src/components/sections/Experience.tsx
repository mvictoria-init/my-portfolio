import React, { useEffect, useRef } from 'react';
import { SectionProps } from '../../type';
import { Star } from 'lucide-react';
import sticker5 from '../../assets/img (5).webp';
import img6 from '../../assets/img (6).webp';

// Experiencia
export const Experience: React.FC<SectionProps> = ({ data, lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('.reveal-item'));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-6');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, root: null, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(i => {
      // ensure initial state
      i.classList.add('opacity-0', 'translate-y-6');
      i.classList.remove('opacity-100', 'translate-y-0');
      observer.observe(i);
    });

    return () => observer.disconnect();
  }, [data]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto p-8 animate-slide-up flex flex-col items-center h-full relative">
    {/* Título traducible */}
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-center my-6">
      {lang === 'es' ? 'Experiencia' : 'Experience'}
    </h2>
    {/* Pegatinas decorativas movidas desde Home: flotan alrededor y dan continuidad visual */}
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute -right-6 -top-6 w-12 md:w-16 z-10 pointer-events-none" style={{['--float-duration' as any]:'9s', ['--float-x' as any]:'18px', ['--float-rotate' as any]:'8deg'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute left-4 -top-10 w-8 md:w-12 opacity-80 pointer-events-none" style={{['--float-duration' as any]:'10s', ['--float-x' as any]:'12px', ['--float-rotate' as any]:'6deg'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute -left-6 top-6 w-10 md:w-14 opacity-90 hidden sm:block pointer-events-none" style={{['--float-duration' as any]:'8.5s', ['--float-x' as any]:'22px', ['--float-rotate' as any]:'10deg'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute right-12 top-20 w-6 md:w-10 opacity-70 hidden md:block pointer-events-none" style={{['--float-duration' as any]:'11s', ['--float-x' as any]:'14px', ['--float-rotate' as any]:'4deg'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute -right-16 bottom-8 w-10 md:w-14 opacity-75 hidden lg:block pointer-events-none" style={{['--float-duration' as any]:'9.8s', ['--float-x' as any]:'20px', ['--float-rotate' as any]:'9deg'}} />
    {/* Pegatinas extra para dar más movimiento */}
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute -bottom-6 left-8 w-8 md:w-10 opacity-80 hidden md:block pointer-events-none" style={{['--float-duration' as any]:'12s', ['--float-x' as any]:'10px', ['--float-rotate' as any]:'3deg', animationDelay: '0.6s'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute right-24 top-6 w-8 md:w-12 opacity-85 hidden lg:block pointer-events-none" style={{['--float-duration' as any]:'7.5s', ['--float-x' as any]:'16px', ['--float-rotate' as any]:'7deg', animationDelay: '1.2s'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute left-1/2 -top-14 translate-x-[-50%] w-12 md:w-16 opacity-90 pointer-events-none" style={{['--float-duration' as any]:'10.5s', ['--float-x' as any]:'14px', ['--float-rotate' as any]:'5deg', animationDelay: '0.3s'}} />
    <img src={sticker5} alt="sticker" className="sticker sticker-smooth float-active absolute -left-10 bottom-20 w-6 md:w-10 opacity-70 hidden sm:block pointer-events-none" style={{['--float-duration' as any]:'9.2s', ['--float-x' as any]:'18px', ['--float-rotate' as any]:'11deg', animationDelay: '1s'}} />
    {/* Contenedor de la línea de tiempo */}
    <div className="relative ml-4 space-y-12 py-4 w-full">
      {data.experience.map((job, idx) => (
        <div key={idx} className="relative pl-8 group reveal-item transition-all duration-1000 ease-out will-change-transform">
          {/* Imagen en el punto de la línea de tiempo (reemplaza el punto) */}
          <img src={img6} alt={`${job.company} logo`} className="absolute top-0 -left-[11px] w-6 h-6 rounded-full object-cover z-10 shadow-sm" />
          {/* Línea de tiempo (oculta para último) */}
          {idx !== data.experience.length - 1 && (
            <div className="absolute top-0 left-0 w-0.5 h-full bg-purple-200 dark:bg-purple-800 transition-colors group-hover:bg-purple-500 z-0" />
          )}
          {/* Tarjeta de trabajo */}
          <div className="bg-white dark:bg-slate-800 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-slate-300 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 relative z-10">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role[lang]}</h3>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{job.company}</span>
              </div>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-mono shadow-inner">{job.period}</span>
            </div>
            <p className="text-slate-800 dark:text-slate-300 mb-4">{job.desc[lang]}</p>
            {/* Logros */}
            <div className="space-y-2 mb-4 border-l-2 border-yellow-300/50 dark:border-yellow-700/50 pl-3">
              {job.achievements.map((ach, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star size={14} className="mt-0.5 text-yellow-500 shrink-0" fill="currentColor" />
                  <span>{ach[lang]}</span>
                </div>
              ))}
            </div>
            {/* Stack */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-300 dark:border-slate-700/50">
              {job.stack.map((tech, tIdx) => (
                <span key={tIdx} className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    );
  };
