import React, { useEffect, useState } from 'react';
import { 
  Terminal, Mail, Linkedin, Github
} from 'lucide-react';
import { SectionProps } from '../../type';
import { useTheme } from '../../hooks/Hooks';
import sticker5 from '../../assets/img (5).webp';
import profileImg from '../../assets/profile.webp';

export const Home: React.FC<SectionProps> = ({ data, lang }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-30 h-[60%] p-6 m-4 animate-fade-in">
      <div className="relative group perspective-1000">
        <div className="relative transform -rotate-6 group-hover:rotate-0 transition-all duration-700 ease-out-back">
          {/* theme-aware halo (positioned above panel background) */}
              <div
                className="absolute -right-12 -top-6 rounded-full pointer-events-none z-20"
                style={{
                  width: '530px',
                  height: '530px',
                  filter: 'blur(40px)',
                  mixBlendMode: 'screen',
                  transform: 'translateX(10%) translateY(2%)',
                  background: theme === 'dark'
                    ? /* Dark: brighter cyan/teal for strong contrast */
                      'radial-gradient(circle at 60% 40%, rgba(34,211,238,0.6), rgba(14,165,233,0.28) 40%, transparent 75%)'
                    : /* Light: stronger purple/magenta for visibility on white */
                      'radial-gradient(circle at 60% 40%, rgba(124,58,237,0.6), rgba(236,72,153,0.28) 40%, transparent 75%)'
                }}
              />

              {/* Stickers around phone (static, pointer-events-none) */}
              
              <img src={sticker5} alt="sticker" className="sticker absolute -left-6 bottom-8 w-12 md:w-16 rotate-12 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.10s', ['--fall-duration' as any]:'1s', ['--fall-rotate' as any]:'-10deg', ['--fall-x' as any]:'-40px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute -right-16 top-2 w-6 md:w-10 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.15s', ['--fall-duration' as any]:'1.1s', ['--fall-rotate' as any]:'8deg', ['--fall-x' as any]:'40px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute -right-20 top-48 w-14 md:w-20 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.25s', ['--fall-duration' as any]:'1.2s', ['--fall-rotate' as any]:'-6deg', ['--fall-x' as any]:'60px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute -left-20 top-48 w-10 md:w-14 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.20s', ['--fall-duration' as any]:'1.05s', ['--fall-rotate' as any]:'12deg', ['--fall-x' as any]:'-50px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute -left-20 top-4 w-8 md:w-12 z-[60] pointer-events-none" style={{['--fall-delay' as any]:'0.18s', ['--fall-duration' as any]:'1.15s', ['--fall-rotate' as any]:'-20deg', ['--fall-x' as any]:'-60px'}} />
              {/* Additional subtle stickers (non-invasive) */}
              <img src={sticker5} alt="sticker" className="sticker absolute hidden md:block md:-right-6 md:top-8 md:w-8 md:opacity-70 lg:-right-8 lg:top-36 lg:w-10 z-20 pointer-events-none" style={{['--fall-delay' as any]:'0.22s', ['--fall-duration' as any]:'1s', ['--fall-rotate' as any]:'6deg', ['--fall-x' as any]:'30px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute hidden md:block md:-left-8 md:top-12 md:w-8 md:opacity-60 md:rotate-6 lg:left-28 lg:top-10 lg:rotate-12 lg:w-6 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.30s', ['--fall-duration' as any]:'1.25s', ['--fall-rotate' as any]:'-8deg', ['--fall-x' as any]:'-30px'}} />
              <img src={sticker5} alt="sticker" className="sticker absolute hidden md:block md:right-2 md:bottom-8 md:w-8 md:opacity-60 lg:-right-4 lg:bottom-28 lg:w-6 z-10 pointer-events-none" style={{['--fall-delay' as any]:'0.28s', ['--fall-duration' as any]:'1.05s', ['--fall-rotate' as any]:'10deg', ['--fall-x' as any]:'20px'}} />

        {/* Phone frame */}
        <div className="relative z-30 rounded-[28px] border-4 border-black/90 shadow-2xl overflow-hidden w-[240px] md:w-[260px] lg:w-[280px] bg-black flex items-center justify-center h-[60%]">
          <div className="relative w-[180px] md:w-[220px] lg:w-[240px] h-full bg-white overflow-hidden">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />

            {/* camera dot */}
            <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-sky-300 ring-1 ring-white" />

            {/* side buttons */}
            <div className="absolute -right-2 top-1/4 flex flex-col gap-2">
              <div className="w-1.5 h-6 rounded-md bg-black/80 shadow-md" />
              <div className="w-1.5 h-10 rounded-md bg-black/80 shadow-md" />
            </div>

            {/* bottom UI bar */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-40 md:w-56 h-6 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
              <div className="w-10 h-1 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="max-w-xl text-center md:text-left z-10 relative">
    <img src={sticker5} alt="sticker" className="sticker absolute hidden md:block md:-right-36 md:top-8 md:w-10 md:opacity-80 lg:-top-6 lg:-right-8 lg:w-14 pointer-events-none" style={{['--fall-delay' as any]:'0.12s', ['--fall-duration' as any]:'1.3s', ['--fall-rotate' as any]:'6deg', ['--fall-x' as any]:'120px'}} />
    <img src={sticker5} alt="sticker" className="sticker absolute hidden md:block md:-right-28 md:top-20 md:w-14 md:z-50 md:opacity-85 md:rotate-6 lg:top-8 lg:right-6 lg:w-24 pointer-events-none" style={{['--fall-delay' as any]:'0.35s', ['--fall-duration' as any]:'1.4s', ['--fall-rotate' as any]:'-12deg', ['--fall-x' as any]:'90px'}} />
    {/* moved subtle adornments to phone area (non-invasive) */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold mb-6 tracking-wider shadow-sm border border-green-200 dark:border-green-800">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {lang === 'es' ? 'DISPONIBLE PARA TRABAJAR' : 'OPEN TO WORK'}
      </div>
      {/* Typed H1 */}
      {
        (() => {
          const full = 'María Victoria.';
          const split = full.indexOf('Victoria');
          const partA = full.slice(0, split);
          const partB = full.slice(split);
          const [idx, setIdx] = useState(0);

          useEffect(() => {
            setIdx(0);
            const interval = setInterval(() => {
              setIdx(prev => {
                if (prev >= full.length) {
                  clearInterval(interval);
                  return prev;
                }
                return prev + 1;
              });
            }, 70);
            return () => clearInterval(interval);
          }, []);

          return (
            <h1 className="text-5xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              <span>{partA.slice(0, Math.min(idx, partA.length))}</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500">{partB.slice(Math.max(0, idx - partA.length))}</span>
              <span className="type-caret" aria-hidden="true" />
            </h1>
          );
        })()
      }
      <h2 className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium mb-6 flex items-center gap-2 justify-center md:justify-start">
        <Terminal size={20} className="text-purple-500" />
        {data.profile.role[lang]}
      </h2>
      <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-8 text-lg">{data.profile.about[lang]}</p>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#0077b5] text-white"><Linkedin size={18} /> LinkedIn</a>
        <a href={data.profile.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#333] text-white"><Github size={18} /> GitHub</a>
        <a href={`mailto:${data.profile.email}`} className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-linear-to-r from-pink-500 to-purple-600 text-white"><Mail size={18} /> Contact</a>
      </div>
    </div>
  </div>
  );
};