import { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../context/ContextApp';

export function useTheme() {
  return useContext(ThemeContext);
}

// Hook que devuelve helper de traducción ligado al idioma del contexto
export function useTranslation() {
  const langCtx = useContext(LanguageContext);

  // Hook that returns a translation helper bound to the context language
  const t = (val: any) => {
    if (val == null) return '';
    // if it's a simple string
    if (typeof val === 'string') return val;
    // if it's an array of LocalizedText -> map/return array
    if (Array.isArray(val)) return val.map(v => (v && (v[langCtx.lang] ?? v.es ?? v.en)));
    // if it's an object with es/en
    if (typeof val === 'object') return val[langCtx.lang] ?? val.es ?? val.en ?? '';
    return String(val);
  };

  return { lang: langCtx.lang, setLang: langCtx.setLang, t };
}
