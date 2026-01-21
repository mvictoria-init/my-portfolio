import React, { useState } from 'react';
import { Mail, Linkedin, Github, Globe, Clipboard } from 'lucide-react';
import { SectionProps, ContactItem } from '../../type';
import { useTranslation } from '../../hooks/Hooks';

export const Contact: React.FC<SectionProps> = ({ data }) => {
  const contactData: ContactItem = data.contact;
  const profile = data.profile;
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Obtener textos traducidos según el idioma
  const title = t(contactData.Title);
  const subtitle = t(contactData.Subtitle);
  const emailLabel = t(contactData.emailLabel);
  const locationLabel = t(contactData.locationLabel);
  
  return (
    <div className="flex items-center h-full p-8">
      <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-8 border border-slate-300 dark:border-slate-700 animate-fade-in-up relative">
        
        {/* Título y Subtítulo */}
        <h2 className="text-4xl max-[322px]:text-3xl max-[284px]:text-2xl font-extrabold text-center text-purple-600 dark:text-purple-400 mb-4">{title}</h2>
        <p className="text-center text-slate-700 dark:text-slate-300 mb-10 text-lg max-[322px]:text-base max-[284px]:text-sm">{subtitle}</p>

        <div className="space-y-6">
          
          {/* Email (copiar al portapapeles) */}
          <div className="group block" role="group" aria-label={`Copiar correo ${profile.email}`}>
            <div className="flex flex-col md:flex-row items-center md:items-start p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-colors duration-300 hover:bg-purple-50 dark:hover:bg-slate-600">
              <div className="mb-3 md:mb-0 md:mr-4 flex-shrink-0 mx-auto md:mx-0">
                <Mail size={24} className="text-purple-500" />
              </div>
              <div className="flex flex-col items-center md:items-start min-w-0 flex-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-400 text-center md:text-left">{emailLabel}</span>
                <div className="w-full flex flex-col md:flex-row items-center md:items-center gap-3 mt-1">
                  <span className="text-xs md:text-lg font-medium text-slate-900 dark:text-white group-hover:text-purple-600 break-all w-full leading-tight text-center md:text-left">{profile.email}</span>

                  {/* Inline copy button for md+ */}
                  <button
                    type="button"
                    onClick={async (ev) => {
                      ev.stopPropagation();
                      try {
                        await navigator.clipboard.writeText(profile.email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1800);
                      } catch (err) {
                        try {
                          const ta = document.createElement('textarea');
                          ta.value = profile.email;
                          document.body.appendChild(ta);
                          ta.select();
                          document.execCommand('copy');
                          document.body.removeChild(ta);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1800);
                        } catch (e) {
                          // eslint-disable-next-line no-alert
                          alert(profile.email);
                        }
                      }
                    }}
                    className="hidden md:inline-flex p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Copiar correo"
                  >
                    <Clipboard size={18} />
                  </button>
                </div>

                {/* Mobile copy button centered under email */}
                <div className="w-full md:hidden mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={async (ev) => {
                      ev.stopPropagation();
                      try {
                        await navigator.clipboard.writeText(profile.email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1800);
                      } catch (err) {
                        try {
                          const ta = document.createElement('textarea');
                          ta.value = profile.email;
                          document.body.appendChild(ta);
                          ta.select();
                          document.execCommand('copy');
                          document.body.removeChild(ta);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1800);
                        } catch (e) {
                          // eslint-disable-next-line no-alert
                          alert(profile.email);
                        }
                      }
                    }}
                    className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Copiar correo"
                  >
                    <Clipboard size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Toast */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs shadow-sm transition-opacity ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              Copiado
            </div>
          </div>

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
              <span className="text-sm max-[322px]:text-xs max-[284px]:text-[10px] font-semibold text-slate-600 dark:text-slate-400">{locationLabel}</span>
              <span className="text-lg max-[322px]:text-sm max-[284px]:text-xs font-medium text-slate-900 dark:text-white">{contactData.location}</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;