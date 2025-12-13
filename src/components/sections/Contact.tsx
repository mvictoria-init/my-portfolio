import React from 'react';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import { SectionProps, ContactItem } from '../../type';
import { useTranslation } from '../../hooks/Hooks';

export const Contact: React.FC<SectionProps> = ({ data }) => {
  const contactData: ContactItem = data.contact;
  const profile = data.profile;
  const { t } = useTranslation();

  // Obtener textos traducidos según el idioma
  const title = t(contactData.Title);
  const subtitle = t(contactData.Subtitle);
  const emailLabel = t(contactData.emailLabel);
  const locationLabel = t(contactData.locationLabel);
  
  return (
    <div className="flex items-center h-full p-8">
      <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 md:p-16 border border-slate-300 dark:border-slate-700 animate-fade-in-up">
        
        {/* Título y Subtítulo */}
        <h2 className="text-4xl font-extrabold text-center text-purple-600 dark:text-purple-400 mb-4">{title}</h2>
        <p className="text-center text-slate-700 dark:text-slate-300 mb-10 text-lg">{subtitle}</p>

        <div className="space-y-6">
          
          {/* Email */}
          <a href={`mailto:${profile.email}`} target="_blank" rel="noreferrer" className="group block">
            <div className="flex items-center p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-colors duration-300 hover:bg-purple-50 dark:hover:bg-slate-600">
              <Mail size={24} className="text-purple-500 mr-4 shrink-0" />
              <div className='flex flex-col items-start'>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-400">{emailLabel}</span>
                <span className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-purple-600">{profile.email}</span>
              </div>
            </div>
          </a>

          {/* LinkedIn y GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-[#0077b5] text-white rounded-xl shadow-md transition-transform hover:scale-[1.03] hover:shadow-lg hover:bg-[#005f99]">
                <Linkedin size={24} className="mr-3" />
                <span className="font-semibold">LinkedIn</span>
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-slate-700 text-white rounded-xl shadow-md transition-transform hover:scale-[1.03] hover:shadow-lg hover:bg-slate-900">
                <Github size={24} className="mr-3" />
                <span className="font-semibold">GitHub</span>
              </a>
            )}
          </div>
          
          {/* Ubicación */}
          <div className="flex items-center p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-colors duration-300">
            <Globe size={24} className="text-purple-500 mr-4 shrink-0" />
            <div className='flex flex-col items-start'>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{locationLabel}</span>
              <span className="text-lg font-medium text-slate-900 dark:text-white">{contactData.location}</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};