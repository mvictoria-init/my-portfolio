import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Terminal, Cpu, Moon, Sun, X, Briefcase, GraduationCap, User, 
  Mail, Github, Linkedin, ExternalLink, Sparkles, Heart, Palette, 
  FolderOpen, Star, Home as HomeIcon, AppWindow, ArrowLeft, ArrowRight, 
  RotateCw, Lock, Globe, Zap 
} from 'lucide-react';

// --- TYPES & DATA STRUCTURES ---
// Tipos de datos definidos internamente ya que no se permiten imports externos
type Language = 'es' | 'en';
type Theme = 'light' | 'dark';
type TabId = 'home' | 'experience' | 'projects' | 'skills' | 'contact'; // Simplificamos las tabs
type AppConfigId = 'home' | 'experience' | 'projects' | 'skills' | 'contact';

interface LocalizedText {
  es: string;
  en: string;
}

interface ProfileData {
  name: string;
  role: LocalizedText;
  about: LocalizedText;
  location: string;
  email: string;
  linkedin: string;
  github: string;
}

interface ExperienceJob {
  company: string;
  role: LocalizedText;
  period: string;
  desc: LocalizedText;
  stack: string[];
  achievements: LocalizedText[];
}

interface ProjectItem {
  title: string;
  desc: LocalizedText;
  tags: string[];
  link?: string;
  color: string;
}

interface SkillsData {
  frontend: string[];
  backend: string[];
  tools: string[];
  soft: { es: string[]; en: string[] };
}

interface EducationItem {
  degree: LocalizedText;
  institution: string;
  year: string;
}

interface PortfolioData {
  profile: ProfileData;
  experience: ExperienceJob[];
  projects: ProjectItem[];
  skills: SkillsData;
  education: EducationItem[];
}

interface AppConfig {
  id: AppConfigId;
  label: string;
  icon: React.FC<any>;
  color: string;
}

interface SectionProps {
  data: PortfolioData;
  lang: Language;
}

// --- DATA: Contenido del Portfolio ---
const DATA: PortfolioData = {
  profile: {
    name: "María Victoria Bastardo Guerra",
    role: { es: "Ingeniera de Sistemas & Full-Stack Developer", en: "Systems Engineer & Full-Stack Developer" },
    about: {
      es: "Ingeniera de Sistemas especializada en desarrollo Full-Stack. Transformo problemas complejos en soluciones elegantes usando React, Python y arquitecturas escalables. Me apasiona fusionar la lógica del backend con experiencias de usuario fluidas y creativas.",
      en: "Systems Engineer specializing in Full-Stack development. I transform complex problems into elegant solutions using React, Python, and scalable architectures. I am passionate about merging backend logic with fluid and creative user experiences."
    },
    location: "Maturín, Venezuela",
    email: "marial5victoria1998@gmail.com",
    linkedin: "https://www.linkedin.com/in/maria-victoria-bastardo-guerra/",
    github: "https://github.com/mvictoria-init"
  },
  experience: [
    {
      company: "CapyMara",
      role: { es: "Co-Fundador & Full-Stack Dev", en: "Co-Founder & Full-Stack Dev" },
      period: "2024 - Present",
      desc: {
        es: "Liderazgo técnico y desarrollo integral de la plataforma. Arquitectura de APIs y optimización de frontend.",
        en: "Technical leadership and comprehensive platform development. API architecture and frontend optimization."
      },
      stack: ["React", "Python", "Django", "Tailwind"],
      achievements: [
        { es: "Mejora del 30% en velocidad de carga del frontend.", en: "30% improvement in frontend load speed." },
        { es: "Diseño y desarrollo de capymara.com", en: "Design and development of capymara.com" }
      ]
    },
    {
      company: "Freelance",
      role: { es: "Backend Developer (Gaming)", en: "Backend Developer (Gaming)" },
      period: "Present",
      desc: {
        es: "Desarrollo de sistemas complejos para videojuegos, incluyendo misiones y recompensas.",
        en: "Development of complex systems for video games, including missions and rewards."
      },
      stack: ["Python", "Django REST", "PostgreSQL", "JWT"],
      achievements: [
        { es: "Automatización 100% del flujo de misiones.", en: "100% automation of mission flow." },
        { es: "Sistema de puntos y validación automática.", en: "Points system and automatic validation." }
      ]
    },
    {
      company: "CANTV",
      role: { es: "Pasante - Automatización", en: "Intern - Automation" },
      period: "2022 - 2023",
      desc: {
        es: "Automatización de reportes y gestión de coordinación de energía.",
        en: "Automation of reports and energy coordination management."
      },
      stack: ["Flutter", "Django", "SQL", "Analytics"],
      achievements: [
        { es: "Automatización del 40% de reportes manuales.", en: "Automation of 40% of manual reports." },
        { es: "Centralización de datos en plataforma unificada.", en: "Data centralization in a unified platform." }
      ]
    }
  ],
  projects: [
    {
      title: "CapyMara Web",
      desc: { es: "Plataforma web optimizada con React y Django.", en: "Optimized web platform with React and Django." },
      tags: ["React", "Django", "Tailwind"],
      link: "https://capymara.com",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Game Rewards API",
      desc: { es: "Backend robusto para gestión de misiones en juegos.", en: "Robust backend for game mission management." },
      tags: ["Python", "DRF", "PostgreSQL"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Doc Gen API",
      desc: { es: "API para generación automática de documentos Word.", en: "API for automated Word document generation." },
      tags: ["Python-docx", "API REST"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "CANTV Dashboard",
      desc: { es: "Sistema de gestión de energía y climatización.", en: "Energy and climate management system." },
      tags: ["Flutter", "Python", "SQL"],
      color: "from-emerald-500 to-teal-500"
    }
  ],
  skills: {
    frontend: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Figma"],
    backend: ["Python", "Django REST", "PostgreSQL", "APIs Design"],
    tools: ["Git", "Docker", "VS Code", "Postman"],
    soft: {
      es: ["Creatividad", "Liderazgo", "Comunicación", "Resolución de Problemas"],
      en: ["Creativity", "Leadership", "Communication", "Problem Solving"]
    }
  },
  education: [
    {
      degree: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
      institution: "Universidad de Oriente",
      year: "2024"
    }
  ]
};

// --- CONFIGURACIÓN DE APPS Y DOCK ---
const APPS: AppConfig[] = [
  { id: 'home', label: 'Home.tsx', icon: HomeIcon, color: 'text-pink-500' },
  { id: 'experience', label: 'Experience.json', icon: Briefcase, color: 'text-purple-500' },
  { id: 'projects', label: 'Projects.js', icon: FolderOpen, color: 'text-blue-500' },
  { id: 'skills', label: 'Skills.css', icon: Palette, color: 'text-green-500' },
  { id: 'contact', label: 'Contact.tsx', icon: Mail, color: 'text-red-500' },
];

// ------------------------------------------
// --- COMPONENTES MICRO-MODULARES ANTERIORES (Mantenidos para uso interno) ---
// ------------------------------------------

// Componente: Tarjeta de Proyecto (ProjectsSection)
const ProjectCard: React.FC<{ project: ProjectItem; lang: Language }> = ({ project, lang }) => (
  <div className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 transform hover:scale-[1.02] cursor-pointer">
    {/* Barra de color superior con animación sutil */}
    <div className={`h-2 w-full bg-gradient-to-r ${project.color} group-hover:h-3 transition-all duration-300`} />
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        {/* Icono del proyecto con gradiente y efecto de pulso */}
        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
          <FolderOpen size={24} />
        </div>
        
        {/* Enlace externo */}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">{project.desc[lang]}</p>
      
      {/* Etiquetas de tecnología */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tIdx) => (
          <span key={tIdx} className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

// Componente: Item de Línea de Tiempo de Experiencia (ExperienceSection)
const JobTimelineItem: React.FC<{ job: ExperienceJob; lang: Language; isLast: boolean }> = ({ job, lang, isLast }) => (
  <div className="relative pl-8 group">
    {/* Círculo de la línea de tiempo */}
    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-purple-500 transition-transform group-hover:scale-125 z-10" />
    
    {/* Línea de tiempo (ocultar en el último elemento) */}
    {!isLast && (
      <div className="absolute top-0 left-0 w-0.5 h-full bg-purple-200 dark:bg-purple-800 transition-colors group-hover:bg-purple-500 z-0" />
    )}

    {/* Tarjeta de Trabajo */}
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 relative z-10">
      <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role[lang]}</h3>
          <span className="text-purple-600 dark:text-purple-400 font-semibold">{job.company}</span>
        </div>
        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-mono shadow-inner">{job.period}</span>
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 mb-4">{job.desc[lang]}</p>
      
      {/* Logros (Achievements) */}
      <div className="space-y-2 mb-4 border-l-2 border-yellow-300/50 dark:border-yellow-700/50 pl-3">
        {job.achievements.map((ach, aIdx) => (
          <div key={aIdx} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Star size={14} className="mt-0.5 text-yellow-500 shrink-0" fill="currentColor" />
            <span>{ach[lang]}</span>
          </div>
        ))}
      </div>
      
      {/* Stack Tecnológico */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        {job.stack.map((tech, tIdx) => (
          <span key={tIdx} className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">{tech}</span>
        ))}
      </div>
    </div>
  </div>
);

// Componente: Lista de Habilidades (SkillsSection)
const SkillList: React.FC<{ title: string; skills: string[]; icon: React.FC<any>; color: string }> = ({ title, skills, icon: Icon, color }) => (
  <div>
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
      <Icon size={16} className={color} /> {title}
    </h4> 
    <div className="flex flex-wrap gap-2">
      {skills.map((s: string) => (
        <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium border border-opacity-50 transition-all cursor-default hover:-translate-y-0.5 bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md">
          {s}
        </span>
      ))}
    </div>
  </div>
);


// ------------------------------------------
// --- COMPONENTES PRINCIPALES DE SECCIÓN ---
// ------------------------------------------

// 1. HOME SECTION (Componente de Bienvenida y Perfil)
export const HomeSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-12 h-full p-6 animate-fade-in">
    <div className="relative group perspective-1000 z-10">
      {/* Decoración animada */}
      <div className="absolute -top-12 -left-12 z-20 animate-[spin-slow_12s_linear_infinite] opacity-80">
        <Star size={48} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" />
      </div>
      
      {/* Tarjeta de Perfil con efecto 3D */}
      <div className="relative transform rotate-[-3deg] group-hover:rotate-0 transition-all duration-700 ease-out">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-purple-200/90 shadow-sm rotate-[-2deg] z-30" />
        <div className="bg-white p-4 pb-16 shadow-2xl rounded-[2px] w-[280px] md:w-[320px] transform group-hover:scale-105 transition-transform duration-500">
          <div className="aspect-[4/5] bg-slate-200 overflow-hidden relative grayscale-[20%] group-hover:grayscale-0 transition-all duration-700">
             {/* Imagen Placeholder para compatibilidad */}
             <img src="https://placehold.co/600x800/e2e8f0/475569?text=Maria+Victoria" alt="Profile" className="w-full h-full object-cover"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
             <p className="font-handwriting text-slate-800 text-3xl opacity-90 rotate-[-1deg]">{lang === 'es' ? '¡Hola! ✌️' : 'Hello! ✌️'}</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Contenido principal del perfil */}
    <div className="max-w-xl text-center md:text-left z-10">
      {/* Etiqueta de disponibilidad */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold mb-6 tracking-wider shadow-sm border border-green-200 dark:border-green-800">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {lang === 'es' ? 'DISPONIBLE PARA TRABAJAR' : 'OPEN TO WORK'}
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight leading-tight">
        {data.profile.name.split(' ')[0]} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">{data.profile.name.split(' ')[1]}.</span>
      </h1>
      
      <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-6 flex items-center gap-2 justify-center md:justify-start">
        <Terminal size={20} className="text-purple-500" />
        {data.profile.role[lang]}
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">{data.profile.about[lang]}</p>
      
      {/* Botones de Redes Sociales (Micro-Componente implícito) */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#0077b5] text-white hover:bg-[#005f99]"><Linkedin size={18} /> LinkedIn</a>
        <a href={data.profile.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-[#333] text-white hover:bg-[#1f1f1f]"><Github size={18} /> GitHub</a>
        <a href={`mailto:${data.profile.email}`} className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 flex items-center gap-2 shadow-md bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"><Mail size={18} /> {lang === 'es' ? 'Contacto' : 'Contact'}</a>
      </div>
    </div>
  </div>
);

// 2. EXPERIENCE SECTION (Componente de Experiencia Laboral)
export const ExperienceSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="max-w-4xl mx-auto p-8 animate-slide-up flex items-center h-full">
    {/* Contenedor de la línea de tiempo */}
    <div className="relative ml-4 space-y-12 py-4">
      {data.experience.map((job, idx) => (
        <JobTimelineItem key={idx} job={job} lang={lang} isLast={idx === data.experience.length - 1} />
      ))}
    </div>
  </div>
);

// 3. PROJECTS SECTION (Componente de Proyectos)
export const ProjectsSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex items-center h-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-8 animate-slide-up w-full max-w-6xl mx-auto">
      {data.projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} lang={lang} />
      ))}
    </div>
  </div>
);

// 4. SKILLS SECTION (Componente de Habilidades y Educación)
export const SkillsSection: React.FC<SectionProps> = ({ data, lang }) => (
  <div className="flex items-center h-full">
    <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up w-full">
      
      {/* Habilidades Técnicas (Hard Skills) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Cpu size={120} /></div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3"><Code className="text-blue-500" /> Hard Skills</h3>
        <div className="space-y-6">
          <SkillList title="Frontend" skills={data.skills.frontend} icon={Zap} color="text-amber-500" />
          <SkillList title="Backend" skills={data.skills.backend} icon={Terminal} color="text-red-500" />
          <SkillList title={lang === 'es' ? 'Herramientas' : 'Tools'} skills={data.skills.tools} icon={Globe} color="text-green-500" />
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Habilidades Blandas (Soft Skills) */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Heart size={120} /></div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3"><Sparkles className="text-pink-500" /> Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {data.skills.soft[lang].map(s => (
              <span key={s} className="px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 font-medium text-sm border border-pink-100 dark:border-pink-800/50 shadow-md transition-transform hover:scale-105">✨ {s}</span>
            ))}
          </div>
        </div>
        
        {/* Educación */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><GraduationCap className="text-yellow-400" /> {lang === 'es' ? 'Educación' : 'Education'}</h3>
            {data.education.map((edu, idx) => (
              // Educación usa un componente implícito más simple por ahora
              <div key={idx} className="mb-4 last:mb-0 border-l-2 border-yellow-500/50 pl-4">
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

// 5. CONTACT SECTION (Componente de Contacto) - ¡Ahora Robusto y Autocontenido!
export const ContactSection: React.FC<SectionProps> = ({ data, lang }) => {
  // Definición de las etiquetas de idioma dentro de la sección
  const emailLabel = lang === 'es' ? 'Correo Electrónico' : 'Email Address';
  const locationLabel = lang === 'es' ? 'Ubicación' : 'Location';
  const contactTitle = lang === 'es' ? '¡Hablemos!' : 'Let\'s Connect!';
  const contactSubtitle = lang === 'es' 
    ? 'Estoy abierta a nuevas oportunidades y proyectos desafiantes. No dudes en contactarme.' 
    : 'I am open to new opportunities and challenging projects. Feel free to reach out.';

  return (
    <div className="flex items-center h-full p-8">
      <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 md:p-16 border border-slate-100 dark:border-slate-700 animate-fade-in-up">
        
        {/* Título y Subtítulo */}
        <h2 className="text-4xl font-extrabold text-center text-purple-600 dark:text-purple-400 mb-4">{contactTitle}</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-10 text-lg">{contactSubtitle}</p>

        <div className="space-y-6">
          
          {/* Item 1: Correo Electrónico (Lógica de ContactInfoItem integrada aquí) */}
          <a href={`mailto:${data.profile.email}`} target="_blank" rel="noreferrer" className="group block">
            <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-inner transition-colors duration-300 hover:bg-purple-50 dark:hover:bg-slate-600">
              <Mail size={24} className="text-purple-500 mr-4 shrink-0" />
              <div className='flex flex-col items-start'>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{emailLabel}</span>
                <span className="text-lg font-medium text-slate-800 dark:text-white group-hover:text-purple-600">{data.profile.email}</span>
              </div>
            </div>
          </a>

          {/* Item 2 & 3: LinkedIn y GitHub (Enlaces directos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-[#0077b5] text-white rounded-xl shadow-md transition-transform hover:scale-[1.03] hover:shadow-lg hover:bg-[#005f99]">
              <Linkedin size={24} className="mr-3" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a href={data.profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-slate-700 text-white rounded-xl shadow-md transition-transform hover:scale-[1.03] hover:shadow-lg hover:bg-slate-900">
              <Github size={24} className="mr-3" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
          
          {/* Item 4: Ubicación (Lógica de ContactInfoItem integrada aquí) */}
          {/* No es un enlace, por lo que usamos un div simple */}
          <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-inner transition-colors duration-300">
            <Globe size={24} className="text-purple-500 mr-4 shrink-0" />
            <div className='flex flex-col items-start'>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{locationLabel}</span>
              <span className="text-lg font-medium text-slate-800 dark:text-white">{data.profile.location}</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};


// --- UTILIDADES Y COMPONENTE PRINCIPAL (No Modificados) ---
// Componente para las partículas de fondo animadas
const FloatingParticle = ({ delay, duration, top, left, size, color }: any) => (
  <div className="absolute rounded-full opacity-40 blur-sm animate-[float_6s_ease-in-out_infinite]"
    style={{ top, left, width: size, height: size, backgroundColor: color, animationDelay: delay, animationDuration: duration }}
  />
);


// --- COMPONENTE PRINCIPAL APP ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTabId, setActiveTabId] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home', 'experience', 'projects', 'skills']);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Efecto de inicialización y tema
  useEffect(() => {
    setIsLoaded(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    document.body.className = "bg-stone-50 dark:bg-slate-900";

    // Configuramos una fuente de Google Font para que el diseño se vea mejor
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Permanent+Marker&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Aseguramos que el estilo de escritura a mano esté disponible (Permanent Marker)
    const style = document.createElement('style');
    style.textContent = `.font-handwriting { font-family: 'Permanent Marker', cursive; }`;
    document.head.appendChild(style);

  }, []);

  // Scroll Observer (Spy) para actualizar la pestaña activa
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tabId = entry.target.id.replace('section-', '') as TabId;
            // Solo actualiza si la sección está más de la mitad visible
            if (entry.intersectionRatio > 0.5) { 
              setActiveTabId(tabId);
            }
          }
        });
      },
      { root: scrollContainerRef.current, threshold: [0.5, 0.75] } 
    );

    APPS.filter(app => openTabs.includes(app.id)).forEach(app => {
      const el = sectionsRef.current[app.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [openTabs, isManualScrolling]);

  // Handlers
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const closeTab = (e: React.MouseEvent, id: TabId) => {
    e.stopPropagation();
    setOpenTabs(prev => {
        const newTabs = prev.filter(t => t !== id);
        if (id === activeTabId && newTabs.length > 0) {
            // Activa la primera pestaña restante
            setActiveTabId(newTabs[0]); 
        } else if (newTabs.length === 0) {
            // Si no quedan pestañas abiertas, desactiva la barra
            setActiveTabId('home'); 
        }
        return newTabs;
    });
  };

  const scrollToSection = (id: TabId) => {
    setIsManualScrolling(true);
    
    if (!openTabs.includes(id)) {
      // Si la pestaña no está abierta, ábrela primero
      setOpenTabs(prev => {
        const newTabs = [...prev, id];
        // Mantenemos el orden definido en APPS
        return APPS.filter(app => newTabs.includes(app.id)).map(app => app.id);
      });
      
      // Damos un pequeño delay para que React renderice la nueva sección antes de hacer scroll
      setTimeout(() => {
        const el = document.getElementById(`section-${id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTabId(id);
        setTimeout(() => setIsManualScrolling(false), 800);
      }, 100);
    } else {
      // Si ya está abierta, solo haz scroll
      const el = document.getElementById(`section-${id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTabId(id);
      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  // Función para renderizar el componente de sección según el ID
  const renderSection = (id: TabId) => {
    switch (id) {
      case 'home':
        return <HomeSection data={DATA} lang={lang} />;
      case 'experience':
        return <ExperienceSection data={DATA} lang={lang} />;
      case 'projects':
        return <ProjectsSection data={DATA} lang={lang} />;
      case 'skills':
        return <SkillsSection data={DATA} lang={lang} />;
      case 'contact':
        return <ContactSection data={DATA} lang={lang} />;
      default:
        return (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400 p-8 text-center bg-white/50 dark:bg-slate-800/50">
            <p>{lang === 'es' ? 'Contenido no encontrado.' : 'Content not found.'}</p>
          </div>
        );
    }
  };


  return (
    <div className={`${theme} h-screen w-screen overflow-hidden font-sans transition-colors duration-500`}>
      {/* CAPA DE FONDO con animaciones */}
      <div className="fixed inset-0 bg-stone-50 dark:bg-slate-900 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/30 dark:bg-purple-900/20 blur-[100px] animate-[float_6s_ease-in-out_infinite]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-300/30 dark:bg-pink-900/20 blur-[100px] animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
         {/* Partículas flotantes */}
         <FloatingParticle top="20%" left="10%" size="10px" color="#F472B6" delay="0s" duration="4s" />
         <FloatingParticle top="70%" left="80%" size="15px" color="#818CF8" delay="1s" duration="6s" />
         <FloatingParticle top="40%" left="60%" size="8px" color="#34D399" delay="2s" duration="5s" />
      </div>

      {/* ÁREA PRINCIPAL DE ESCRITORIO (Efecto de carga) */}
      <div className={`relative z-10 h-full flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        
        {/* VENTANA DEL NAVEGADOR */}
        <div className="w-full max-w-6xl h-[85vh] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-white/50 dark:border-slate-700/50 overflow-hidden relative">
          
          {/* 1. BARRA SUPERIOR (Pestañas) */}
          <div className="h-12 bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
            <div className="flex gap-2 mr-4 shrink-0">
              {/* Botones de control de ventana simulados */}
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* Render Pestañas Abiertas */}
            {APPS.filter(app => openTabs.includes(app.id)).map(app => {
              const isActive = activeTabId === app.id;
              
              return (
                <div 
                  key={app.id}
                  onClick={() => scrollToSection(app.id as TabId)}
                  className={`
                    group relative flex items-center gap-2 px-4 py-1.5 rounded-t-lg text-sm font-medium cursor-pointer transition-all select-none min-w-[140px] max-w-[200px]
                    ${isActive 
                      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm mt-2' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 mt-2'
                    }
                  `}
                >
                  <app.icon size={14} className={isActive ? app.color : 'text-slate-400'} />
                  <span className="truncate flex-1">{app.label}</span>
                  <button onClick={(e) => closeTab(e, app.id as TabId)} className={`p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
                    <X size={12} />
                  </button>
                </div>
              );
            })}

            {/* Controles de Idioma y Tema */}
            <div className="flex-1" />
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 shrink-0">
              <button onClick={toggleLang} className="text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors px-2 py-1 rounded-md bg-slate-200/50 dark:bg-slate-700/50">{lang === 'es' ? 'EN' : 'ES'}</button>
              <button onClick={toggleTheme} className="text-slate-500 hover:text-yellow-500 transition-colors p-1 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button>
            </div>
          </div>

          {/* 2. BARRA DE DIRECCIÓN (Simulación de URL) */}
          <div className="h-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4 shrink-0 z-20">
            <div className="flex gap-4 text-slate-400">
              <ArrowLeft size={16} /> <ArrowRight size={16} /> <RotateCw size={16} />
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
              <Lock size={10} className="text-green-500" /> portfolio-maria-vitoria.dev/{activeTabId}
            </div>
          </div>

          {/* 3. ÁREA DE SCROLL (Contenido de las secciones) */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative bg-slate-50/50 dark:bg-slate-900/50 scroll-smooth snap-y snap-mandatory no-scrollbar">
            {openTabs.length === 0 ? (
               <div className="h-full min-h-[calc(85vh-88px)] flex items-center justify-center text-slate-400 flex-col gap-4">
                 <AppWindow size={48} className="opacity-50"/>
                 <p>{lang === 'es' ? 'Abre una aplicación desde el dock para empezar.' : 'Open an app from the dock to get started.'}</p>
               </div>
            ) : (
              // Mapeamos solo las pestañas abiertas, en el orden de APPS
              APPS.map((app) => {
                if (!openTabs.includes(app.id)) return null;
                
                return (
                  <section 
                    key={app.id} 
                    id={`section-${app.id}`} 
                    ref={(el) => (sectionsRef.current[app.id] = el)} 
                    className="min-h-full w-full snap-start flex flex-col relative"
                  >
                    <div className="flex-1">
                      {renderSection(app.id as TabId)}
                    </div>
                  </section>
                );
              })
            )}
            <div className="h-20 w-full shrink-0" />
          </div>
        </div>

        {/* 4. DOCK (Barra de iconos inferior) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
           <div className="flex items-end gap-3 px-4 py-3 bg-white/20 dark:bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all hover:scale-105">
             {APPS.map((app) => {
               const isOpen = openTabs.includes(app.id);
               const isActive = activeTabId === app.id;
               return (
                 <div key={app.id} className="group relative flex flex-col items-center gap-1">
                   <span className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{app.label}</span>
                   <button
                     onClick={() => scrollToSection(app.id as TabId)}
                     className={`
                       w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                       ${isActive 
                         ? 'bg-slate-100 dark:bg-slate-700 shadow-inner scale-110 border-b-2 border-blue-400' 
                         : isOpen 
                           ? 'bg-slate-50 dark:bg-slate-800 shadow-sm' 
                           : 'bg-white dark:bg-slate-700 shadow-lg hover:-translate-y-2 opacity-80 hover:opacity-100'
                       }
                     `}
                   >
                     <app.icon size={24} className={app.color} />
                   </button>
                   <div className={`w-1 h-1 rounded-full bg-slate-400 transition-all ${isOpen ? 'opacity-100' : 'opacity-0 scale-0'}`} />
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;