import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { CategoryDefinition } from '../types';

interface FilterModalProps {
  selectedCategory: string | null;
  onSelect: (cat: string | null) => void;
  onClose: () => void;
  categories: CategoryDefinition[];
}

export const FilterModal: React.FC<FilterModalProps> = ({ selectedCategory, onSelect, onClose, categories }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className={`w-full max-w-md rounded-t-[40px] p-8 space-y-6 border-t transition-colors duration-300 ${
          isDarkMode ? 'bg-[#2D2D2A] border-white/10' : 'bg-white border-slate-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Filter by Category</h2>
          <button onClick={onClose} className={`transition-colors ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            <X size={24} />
          </button>
        </div>
 
        <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
          <button
            onClick={() => { onSelect(null); onClose(); }}
            className={`p-4 rounded-2xl border font-bold text-sm flex justify-between items-center transition-all ${
              selectedCategory === null 
                ? (isDarkMode ? 'bg-[#E9D8A6] border-[#E9D8A6] text-[#2D2D2A]' : 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20') 
                : (isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-600')
            }`}
          >
            All Categories
            {selectedCategory === null && <Check size={16} />}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { onSelect(cat.name); onClose(); }}
              className={`p-4 rounded-2xl border font-bold text-sm flex justify-between items-center transition-all ${
                selectedCategory === cat.name 
                  ? (isDarkMode ? 'bg-[#E9D8A6] border-[#E9D8A6] text-[#2D2D2A]' : 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20') 
                  : (isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-600')
              }`}
            >
              {cat.name}
              {selectedCategory === cat.name && <Check size={16} />}
            </button>
          ))}
        </div>
 
        <button 
          onClick={onClose}
          className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90' 
              : 'bg-brand-600 text-white shadow-brand-500/20 hover:bg-brand-700'
          }`}
        >
          Apply Filters
        </button>
      </motion.div>
    </motion.div>
  );
};
