import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Edit2, Check, Utensils, Car, ShoppingBag, FileText, Home, Zap, MoreHorizontal, Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Smartphone } from 'lucide-react';
import { CategoryDefinition } from '../types';

const ICON_OPTIONS = [
  { name: 'Utensils', icon: Utensils },
  { name: 'Car', icon: Car },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'FileText', icon: FileText },
  { name: 'Home', icon: Home },
  { name: 'Zap', icon: Zap },
  { name: 'Heart', icon: Heart },
  { name: 'Coffee', icon: Coffee },
  { name: 'Gift', icon: Gift },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Plane', icon: Plane },
  { name: 'Music', icon: Music },
  { name: 'Camera', icon: Camera },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'MoreHorizontal', icon: MoreHorizontal },
];

const COLOR_OPTIONS = [
  '#FF6B6B', '#4DABF7', '#FCC419', '#51CF66', '#845EF7', '#FF922B', '#ADB5BD',
  '#F06595', '#339AF0', '#20C997', '#94D82D', '#FFD43B', '#FF8787', '#748FFC'
];

interface CategoryManagerProps {
  categories: CategoryDefinition[];
  onUpdate: (categories: CategoryDefinition[]) => void;
  onClose: () => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onUpdate, onClose }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<CategoryDefinition>>({
    name: '',
    icon: 'MoreHorizontal',
    color: '#ADB5BD',
    budgetLimit: 0
  });

  const handleSave = () => {
    if (!formData.name) return;

    if (editingId) {
      onUpdate(categories.map(c => c.id === editingId ? { ...c, ...formData } as CategoryDefinition : c));
      setEditingId(null);
    } else {
      const newCategory: CategoryDefinition = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        icon: formData.icon || 'MoreHorizontal',
        color: formData.color || '#ADB5BD',
        budgetLimit: formData.budgetLimit || undefined,
        type: 'expense'
      };
      onUpdate([...categories, newCategory]);
      setIsAdding(false);
    }
    setFormData({ name: '', icon: 'MoreHorizontal', color: '#ADB5BD', budgetLimit: 0 });
  };

  const handleDelete = (id: string) => {
    onUpdate(categories.filter(c => c.id !== id));
  };

  const startEdit = (category: CategoryDefinition) => {
    setEditingId(category.id);
    setFormData(category);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', icon: 'MoreHorizontal', color: '#ADB5BD', budgetLimit: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border transition-all ${
          isDarkMode ? 'bg-[#2D2D2A] border-white/10' : 'bg-white border-slate-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <header className={`px-8 py-6 border-b flex justify-between items-center transition-all ${
          isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
        }`}>
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Manage Categories</h2>
            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Custom Icons & Goals</p>
          </div>
          <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isDarkMode ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
          }`}>
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
          <AnimatePresence mode="wait">
            {(isAdding || editingId) ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Health, Gaming..."
                    className={`w-full py-4 px-6 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#E9D8A6]' 
                        : 'bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-brand-500'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Monthly Goal (₹)</label>
                  <input
                    type="number"
                    value={formData.budgetLimit || ''}
                    onChange={e => setFormData({ ...formData, budgetLimit: Number(e.target.value) })}
                    placeholder="0 (No limit)"
                    className={`w-full py-4 px-6 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#E9D8A6]' 
                        : 'bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-brand-500'
                    }`}
                  />
                </div>

                <div className="space-y-3">
                  <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Choose Icon</label>
                  <div className="grid grid-cols-5 gap-3">
                    {ICON_OPTIONS.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        onClick={() => setFormData({ ...formData, icon: name })}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          formData.icon === name 
                            ? (isDarkMode ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-lg shadow-[#E9D8A6]/30' : 'bg-brand-600 text-white shadow-lg shadow-brand-500/30') 
                            : (isDarkMode ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-slate-100')
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Choose Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map(color => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-8 h-8 rounded-full transition-all ${
                          formData.color === color ? `ring-4 ${isDarkMode ? 'ring-[#E9D8A6]/20' : 'ring-brand-500/20'} scale-110` : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setIsAdding(false); setEditingId(null); }}
                    className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${
                      isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={`flex-2 py-4 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isDarkMode 
                        ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90' 
                        : 'bg-brand-600 text-white shadow-brand-500/20 hover:bg-brand-700'
                    }`}
                  >
                    <Check size={18} />
                    {editingId ? 'Update Category' : 'Create Category'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {categories.map(category => {
                  const IconComponent = ICON_OPTIONS.find(i => i.name === category.icon)?.icon || MoreHorizontal;
                  return (
                    <div key={category.id} className={`flex items-center justify-between p-4 rounded-3xl border group hover:shadow-md transition-all ${
                      isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: category.color }}
                        >
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{category.name}</p>
                          {category.budgetLimit ? (
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Goal: ₹{category.budgetLimit}</p>
                          ) : (
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>No Goal Set</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(category)}
                          className={`p-2 rounded-xl transition-colors ${
                            isDarkMode ? 'bg-white/10 text-white/60 hover:text-[#E9D8A6]' : 'bg-slate-100 text-slate-400 hover:text-brand-600'
                          }`}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className={`p-2 rounded-xl transition-colors ${
                            isDarkMode ? 'bg-white/10 text-white/60 hover:text-rose-400' : 'bg-slate-100 text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={startAdd}
                  className={`w-full py-6 rounded-3xl border-2 border-dashed font-bold text-sm flex items-center justify-center gap-2 transition-all mt-4 ${
                    isDarkMode 
                      ? 'border-white/10 text-[#E9D8A6] hover:bg-white/5' 
                      : 'border-slate-200 text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  <Plus size={20} />
                  Add New Category
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`p-8 border-t transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <button
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all ${
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
