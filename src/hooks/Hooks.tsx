import { useContext } from 'react';
import { ThemeContext } from '../context/ContextApp';

export function useTheme() {
  return useContext(ThemeContext);
}
