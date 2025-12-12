import React from 'react';
import { FolderOpen, ExternalLink, Github } from 'lucide-react';
import { SectionProps } from '../../type';

// Projects: tarjetas con título, descripción, tech stack, logros clave y enlaces
export const Projects: React.FC<SectionProps> = ({ data, lang }) => {
  return (
    <div className="flex items-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-8 animate-slide-up w-full max-w-6xl mx-auto">
        {data.projects.map((project, idx) => (
          <article key={idx} className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 border border-slate-300 dark:border-slate-700 transform hover:scale-[1.02] cursor-pointer">
            {/* Barra de color superior */}
            <div className={`h-2 w-full bg-gradient-to-r ${project.color} group-hover:h-3 transition-all duration-300`} />

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${project.color} text-white shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center shrink-0`}>
                    <FolderOpen size={24} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors truncate">{project.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{project.desc[lang]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Repository">
                      <Github size={18} />
                    </a>
                  )}

                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Live demo">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tech stack chips (single-line, scrollable on overflow) */}
              <div className="flex gap-2 mb-3 overflow-x-auto whitespace-nowrap">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="inline-flex flex-shrink-0 items-center px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 shadow-sm">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{tag}</span>
                  </span>
                ))}
              </div>

              {/* Achievements (1-2) */}
              {project.achievements && project.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 mb-4">
                  {project.achievements.slice(0, 2).map((a, i) => (
                    <li key={i}>{typeof a === 'string' ? a : (a[lang] || a.es || a.en)}</li>
                  ))}
                </ul>
              )}

              {/* Footer: small tags and actions placeholder */}
              <div className="flex items-center justify-between">
                <div />
                <div className="text-xs text-slate-400">{project.link ? 'Ver demo' : ''}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
