import React from 'react';
import { 
  Terminal, Mail, Linkedin, Github
} from 'lucide-react';
import { SectionProps } from '../../type';
import { useTheme } from '../../hooks/Hooks';

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
        {/* Phone frame */}
        <div className="relative z-30 rounded-[28px] border-4 border-black/90 shadow-2xl overflow-hidden w-[240px] md:w-[260px] lg:w-[280px] bg-black flex items-center justify-center h-[60%]">
          <div className="relative w-[180px] md:w-[220px] lg:w-[240px] h-full bg-white overflow-hidden">
            <img src="src/assets/profile.jpg" alt="Profile" className="w-full h-full object-cover" />

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
    <div className="max-w-xl text-center md:text-left z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold mb-6 tracking-wider shadow-sm border border-green-200 dark:border-green-800">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {lang === 'es' ? 'DISPONIBLE PARA TRABAJAR' : 'OPEN TO WORK'}
      </div>
      <h1 className="text-5xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
        María <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500">Victoria.</span>
      </h1>
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