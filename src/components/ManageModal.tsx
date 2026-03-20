import React from 'react';
import { motion } from 'motion/react';
import { X, Plus, Trash2 } from 'lucide-react';

interface ManageModalProps {
  title: string;
  items: any[];
  onClose: () => void;
}

export const ManageModal: React.FC<ManageModalProps> = ({ title, items, onClose }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#2D2D2A] border-white/10' : 'bg-white border-slate-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <header className={`px-6 py-5 border-b flex justify-between items-center transition-colors ${
          isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-50 bg-slate-50/50'
        }`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
          <button onClick={onClose} className={`transition-colors ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            <X size={20} />
          </button>
        </header>
 
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {items.map((item, idx) => (
            <div key={`${item.id || item.name || item.category}-${idx}`} className={`flex justify-between items-center p-4 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'
            }`}>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name || item.category}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>₹{item.amount || item.limit}</p>
              </div>
              <button className="text-rose-400 p-2 hover:bg-rose-500/10 rounded-xl transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          
          <button className={`w-full py-4 rounded-2xl border-2 border-dashed font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isDarkMode ? 'border-white/10 text-[#E9D8A6] hover:bg-white/5' : 'border-slate-200 text-brand-600 hover:bg-slate-50'
          }`}>
            <Plus size={18} />
            Add New
          </button>
        </div>
 
        <div className={`p-6 transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-slate-50/50'}`}>
          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90' 
                : 'bg-brand-600 text-white shadow-brand-500/20 hover:bg-brand-700'
            }`}
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
