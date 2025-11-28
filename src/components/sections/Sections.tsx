import React from 'react';
import { 
  Terminal, Star, Heart, Linkedin, Github, Mail, FolderOpen, ExternalLink, 
  Cpu, Code, Sparkles, GraduationCap 
} from 'lucide-react';
import { PortfolioData, Language } from '../../type';

interface SectionProps {
  data: PortfolioData;
  lang: Language;
}

export const HomeSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-12 h-full p-6 animate-fade-in">
    <div className="relative group perspective-1000 z-10">
      <div className="absolute -top-12 -left-12 z-20 animate-spin-slow opacity-80">
        <Star size={48} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" />
      </div>
      <div className="absolute -bottom-8 -right-8 z-20 animate-bounce-slow opacity-80">
        <Heart size={42} className="text-pink-500 fill-pink-500 drop-shadow-lg" />
      </div>
      <div className="relative transform rotate-[-3deg] group-hover:rotate-0 transition-all duration-700 ease-out-back">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-purple-200/90 shadow-sm rotate-[-2deg] z-30" />
        <div className="bg-white p-4 pb-16 shadow-2xl rounded-[2px] w-[280px] md:w-[320px] transform group-hover:scale-105 transition-transform duration-500">
          <div className="aspect-[4/5] bg-slate-200 overflow-hidden relative grayscale-[20%] group-hover:grayscale-0 transition-all duration-700">
             <img src="https://placehold.co/600x800/e2e8f0/475569?text=Maria+Victoria" alt="Profile" className="w-full h-full object-cover"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
             <p className="font-handwriting text-slate-800 text-3xl opacity-90 rotate-[-1deg]">Hola!! ✌️</p>
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
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight leading-tight">
        María <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Victoria.</span>
      </h1>
      <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-6 flex items-center gap-2 justify-center md:justify-start">
        <Terminal size={20} className="text-purple-500" />
        {data.profile.role[lang]}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">{data.profile.about[lang]}</p>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#0077b5] text-white"><Linkedin size={18} /> LinkedIn</a>
        <a href={data.profile.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#333] text-white"><Github size={18} /> GitHub</a>
        <a href={`mailto:${data.profile.email}`} className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-gradient-to-r from-pink-500 to-purple-600 text-white"><Mail size={18} /> Contact</a>
      </div>
    </div>
  </div>
);

export const ExperienceSection: React.FC<SectionProps> = ({ data, lang }) => (
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

export const ProjectsSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex items-center h-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 animate-slide-up w-full max-w-6xl mx-auto">
      {data.projects.map((project, idx) => (
        <div key={idx} className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
          <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                <FolderOpen size={24} />
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">{project.desc[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkillsSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex items-center h-full">
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up w-full">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Cpu size={120} /></div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3"><Code className="text-blue-500" /> Hard Skills</h3>
        <div className="space-y-6">
          {['frontend', 'backend', 'tools'].map((cat) => (
            <div key={cat}>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{cat}</h4>
              <div className="flex flex-wrap gap-2">
                {(data.skills as any)[cat].map((s: string) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium border border-opacity-50 transition-all cursor-default hover:-translate-y-0.5 bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-700 dark:text-slate-300">{s}</span>
                ))}
              </div>
            </div>
          ))}
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