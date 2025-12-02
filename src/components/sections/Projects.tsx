import React from 'react';
import { 
 FolderOpen, ExternalLink, 
} from 'lucide-react';
import { SectionProps } from '../../type';

export const Projects: React.FC<SectionProps> = ({ data, lang }) => (
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