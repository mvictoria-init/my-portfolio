import React from 'react';
import { 
  Terminal, Star, Heart, Mail, Linkedin, Github
} from 'lucide-react';
import { SectionProps } from '../../type';

export const Home: React.FC<SectionProps> = ({ data, lang }) => (
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
             <img src="src/assets/profile.jpg" alt="Profile" className="w-full h-full object-cover"/>
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