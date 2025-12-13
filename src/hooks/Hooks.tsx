import { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../context/ContextApp';

export function useTheme() {
  return useContext(ThemeContext);
}

// Hook que devuelve helper de traducción ligado al idioma del contexto
export function useTranslation() {
  const langCtx = useContext(LanguageContext);

  const t = (val: any) => {
    if (val == null) return '';
    // si es string simple
    if (typeof val === 'string') return val;
    // si es array de LocalizedText -> map/return array
    if (Array.isArray(val)) return val.map(v => (v && (v[langCtx.lang] ?? v.es ?? v.en)));
    // si es objeto con es/en
    if (typeof val === 'object') return val[langCtx.lang] ?? val.es ?? val.en ?? '';
    return String(val);
  };

  return { lang: langCtx.lang, setLang: langCtx.setLang, t };
}
