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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Degree */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">{edu ? t(edu.degree) : t({ es: 'Ingeniería de Sistemas', en: 'Systems Engineering' })}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{edu ? `${edu.institution} - ${edu.year}` : 'Universidad de Oriente - 2024'}</p>
            <GraduationCap size={96} className="mt-6 text-pink-300" />
          </div>

          {/* Thesis */}
          <div className="flex flex-col items-center px-4">
            <h3 className="text-2xl font-semibold mb-2">{t({ es: 'Tesis', en: 'Thesis' })}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md text-center leading-relaxed">
              {t({
                es: 'SISTEMA DE INFORMACIÓN PARA LA GESTIÓN DE PROCESOS DE LA COORDINACIÓN DE OPERACIONES Y MANTENIMIENTO DE ENERGÍA Y CLIMATIZACIÓN DE CANTV, ESTADO MONAGAS.',
                en: 'INFORMATION SYSTEM FOR THE MANAGEMENT OF PROCESSES OF THE COORDINATION OF OPERATIONS AND ENERGY AND AIR CONDITIONING MAINTENANCE OF CANTV, MONAGAS STATE.'
              })}
            </p>
            <FileText size={64} className="mt-6 text-amber-300" />
          </div>

          {/* Courses */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">{t({ es: 'Cursos', en: 'Courses' })}</h3>
            <BookOpen size={96} className="mt-6 text-violet-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
