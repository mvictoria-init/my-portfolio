import React from 'react';
import { GraduationCap, FileText, BookOpen } from 'lucide-react';
import { SectionProps } from '../../type';
import { useTranslation } from '../../hooks/Hooks';

export const Education: React.FC<SectionProps> = ({ data }) => {
  const { t } = useTranslation();
  const edu = data.education && data.education.length > 0 ? data.education[0] : null;

  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="w-full max-w-6xl text-center">
        <h2 className="text-4xl font-extrabold mb-8 tracking-tight">{t({ es: 'Educación', en: 'Education' })}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column: Degree + Thesis stacked */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-semibold mb-2">{edu ? t(edu.degree) : t({ es: 'Ingeniería de Sistemas', en: 'Systems Engineering' })}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{edu ? `${edu.institution} - ${edu.year}` : 'Universidad de Oriente - 2024'}</p>
              <div className="mt-4 md:mt-6">
                <GraduationCap size={96} className="text-pink-300" />
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start px-2">
              <h3 className="text-2xl font-semibold mb-2">{t({ es: 'Tesis', en: 'Thesis' })}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl text-center md:text-left leading-relaxed">
                {t({
                  es: 'SISTEMA DE INFORMACIÓN PARA LA GESTIÓN DE PROCESOS DE LA COORDINACIÓN DE OPERACIONES Y MANTENIMIENTO DE ENERGÍA Y CLIMATIZACIÓN DE CANTV, ESTADO MONAGAS.',
                  en: 'INFORMATION SYSTEM FOR THE MANAGEMENT OF PROCESSES OF THE COORDINATION OF OPERATIONS AND ENERGY AND AIR CONDITIONING MAINTENANCE OF CANTV, MONAGAS STATE.'
                })}
              </p>
              <div className="mt-4">
                <FileText size={64} className="text-amber-300" />
              </div>
            </div>
          </div>

          {/* Right column: Courses */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-2xl font-semibold mb-2">{t({ es: 'Cursos', en: 'Courses' })}</h3>
            <BookOpen size={96} className="mt-6 text-violet-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
