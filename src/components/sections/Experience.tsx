import React from 'react';
import { SectionProps } from '../../type';
import { Star } from 'lucide-react';

export const Experience: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="max-w-4xl mx-auto p-4 animate-slide-up flex items-center h-full">
    <div className="relative border-l-2 border-purple-200 dark:border-purple-800 ml-4 space-y-12 py-4">
      {data.experience.map((job, idx) => (
        <div key={idx} className="relative pl-8 group">
          <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-purple-500 transition-transform group-hover:scale-125" />
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role[lang]}</h3>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{job.company}</span>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-mono text-slate-600 dark:text-slate-300">{job.period}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">{job.desc[lang]}</p>
            <div className="space-y-2 mb-4">
              {job.achievements.map((ach, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Star size={14} className="mt-0.5 text-yellow-500 shrink-0" fill="currentColor" />
                  <span>{ach[lang]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
              {job.stack.map((tech, tIdx) => (
                <span key={tIdx} className="text-xs font-medium px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
