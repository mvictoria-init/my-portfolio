import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react';
import { TabId } from '../../type';

// Barra de dirección simulada (Address Bar)
// - Recibe `activeTabId` para mostrar la ruta actual
type Props = {
  activeTabId: TabId;
};

const AddressBar: React.FC<Props> = ({ activeTabId }) => {
  return (
    <div className="h-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4 shrink-0 z-20 transition-colors duration-500">
      <div className="flex gap-4 text-slate-400">
        <ArrowLeft size={16} /> <ArrowRight size={16} /> <RotateCw size={16} />
      </div>
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono transition-colors duration-500">
        <Lock size={10} className="text-green-500" /> localhost:3000/{activeTabId}
      </div>
    </div>
  );
};

export default AddressBar;
