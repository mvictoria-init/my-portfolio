import React from 'react';
import { SectionProps } from '../../type';
import { Star } from 'lucide-react';

// Experience: portando estilos de Porfolio.ts con atención a dark mode
export const Experience: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="max-w-4xl mx-auto p-8 animate-slide-up flex items-center h-full">
    {/* Contenedor de la línea de tiempo */}
    <div className="relative ml-4 space-y-12 py-4">
      {data.experience.map((job, idx) => (
        <div key={idx} className="relative pl-8 group">
          {/* Círculo de la línea de tiempo */}
          <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-purple-500 transition-transform group-hover:scale-125 z-10" />
          {/* Línea de tiempo (oculta para último) */}
          {idx !== data.experience.length - 1 && (
            <div className="absolute top-0 left-0 w-0.5 h-full bg-purple-200 dark:bg-purple-800 transition-colors group-hover:bg-purple-500 z-0" />
          )}
          {/* Tarjeta de trabajo */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 relative z-10">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role[lang]}</h3>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{job.company}</span>
              </div>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-mono shadow-inner">{job.period}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">{job.desc[lang]}</p>
            {/* Logros */}
            <div className="space-y-2 mb-4 border-l-2 border-yellow-300/50 dark:border-yellow-700/50 pl-3">
              {job.achievements.map((ach, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Star size={14} className="mt-0.5 text-yellow-500 shrink-0" fill="currentColor" />
                  <span>{ach[lang]}</span>
                </div>
              ))}
            </div>
            {/* Stack */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
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
