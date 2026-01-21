import React from 'react';
import { FolderOpen, ExternalLink } from 'lucide-react';
import { SectionProps } from '../../type';
import { useTranslation } from '../../hooks/Hooks';

// Projects: cards with title, description, tech stack, key achievements and links
export const Projects: React.FC<SectionProps> = ({ data }) => {
  const { t, lang } = useTranslation();
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-center my-6">{lang === 'es' ? 'Proyectos' : 'Projects'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-[314px]:gap-4 p-8 max-[314px]:p-4 animate-slide-up w-full max-w-6xl mx-auto">
        {data.projects.map((project, idx) => {
          const color = project.color ?? 'from-pink-300 to-purple-300';
          return (
          <article key={idx} className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 border border-slate-300 dark:border-slate-700 transform hover:scale-[1.02] cursor-pointer">
            {/* Top color bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${color} group-hover:h-3 transition-all duration-300`} />

            <div className="p-6 max-[314px]:p-3">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`p-3 max-[314px]:p-2 rounded-xl bg-linear-to-br ${project.color} text-white shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center shrink-0`}>
                    <FolderOpen size={18} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl max-[314px]:text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors truncate">{project.title}</h3>
                    <p className="text-sm max-[314px]:text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 max-[360px]:line-clamp-6">{t(project.desc)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center p-2 max-[406px]:p-1 rounded-md text-slate-600 dark:text-slate-200 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label={`Open ${project.title} in new tab`}
                    >
                      <ExternalLink size={16} className="max-[406px]:h-3 max-[406px]:w-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Tech stack chips (single-line, scrollable if overflow) */}
              <div className="flex gap-2 mb-3 overflow-x-auto whitespace-nowrap">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="inline-flex flex-shrink-0 items-center px-2 py-0.5 text-[11px] font-semibold rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm max-[314px]:px-2 max-[314px]:py-0.5 max-[314px]:text-[9px]">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 max-[314px]:text-[9px]">{tag}</span>
                  </span>
                ))}
              </div>

            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
};
