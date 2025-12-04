import React from 'react';
import {  Heart, Cpu, Code, Sparkles, GraduationCap 
} from 'lucide-react';
import { SectionProps, SkillsData } from '../../type';

export const Skills: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex items-center h-full">
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up w-full">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Cpu size={120} /></div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3"><Code className="text-blue-500" /> Hard Skills</h3>
        <div className="space-y-6">
          {(() => {
            type HardSkillKey = 'frontend' | 'backend' | 'tools';
            const cats: HardSkillKey[] = ['frontend', 'backend', 'tools'];
            const skills = data.skills as SkillsData;
            return cats.map((cat) => (
              <div key={cat}>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{cat}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills[cat].map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium border border-opacity-50 transition-all cursor-default hover:-translate-y-0.5 bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-700 dark:text-slate-300">{s}</span>
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Heart size={120} /></div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3"><Sparkles className="text-pink-500" /> Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {data.skills.soft[lang].map(s => (
              <span key={s} className="px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 font-medium text-sm border border-pink-100 dark:border-pink-800/50">✨ {s}</span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><GraduationCap className="text-yellow-400" /> Education</h3>
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <p className="text-lg font-semibold text-yellow-50">{edu.degree[lang]}</p>
                <p className="text-slate-300">{edu.institution}</p>
                <p className="text-sm text-slate-400 mt-1">{edu.year}</p>
              </div>
            ))}
          </div>
          <GraduationCap size={150} className="absolute -bottom-10 -right-10 text-white/5 rotate-[-20deg]" />
        </div>
      </div>
    </div>
  </div>
);
