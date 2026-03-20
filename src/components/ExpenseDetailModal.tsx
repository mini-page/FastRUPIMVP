import React from 'react';
import { motion } from 'motion/react';
import { X, Trash2, Edit3, Calendar, CreditCard, Tag, MessageSquare, Users, LayoutGrid } from 'lucide-react';
import { Expense, CategoryDefinition, Account } from '../types';
import { 
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus
};

interface ExpenseDetailModalProps {
  expense: Expense;
  category?: CategoryDefinition;
  account?: Account;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({ 
  expense, 
  category, 
  account, 
  onClose, 
  onDelete, 
  onEdit 
}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const IconComponent = (category ? ICON_MAP[category.icon as keyof typeof ICON_MAP] : null) || LayoutGrid;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        className={`w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#2D2D2A] border-white/10' : 'bg-white border-slate-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Amount */}
        <div className={`relative p-8 text-center space-y-2 ${
          isDarkMode ? 'bg-rose-500/10' : 'bg-rose-50'
        }`}>
          <div className="absolute top-6 left-6 flex gap-2">
            <button 
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? 'bg-black/20 text-white/60 hover:text-white' : 'bg-white/50 text-slate-400 hover:text-slate-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="absolute top-6 right-6 flex gap-2">
            <button 
              onClick={() => onDelete(expense.id)}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? 'bg-black/20 text-rose-400 hover:bg-rose-500/20' : 'bg-white/50 text-rose-500 hover:bg-rose-100'
              }`}
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={() => onEdit(expense)}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? 'bg-black/20 text-[#E9D8A6] hover:bg-[#E9D8A6]/20' : 'bg-white/50 text-brand-600 hover:bg-brand-50'
              }`}
            >
              <Edit3 size={20} />
            </button>
          </div>

          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
            isDarkMode ? 'text-rose-400/60' : 'text-rose-500/60'
          }`}>Expense</p>
          <h2 className="text-4xl font-black text-rose-500 tracking-tighter">
            -₹{expense.amount.toLocaleString()}
          </h2>
          <p className={`text-[10px] font-bold ${
            isDarkMode ? 'text-white/40' : 'text-slate-400'
          }`}>
            {formatDate(expense.date)}
          </p>
        </div>

        {/* Details List */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Merchant */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-400'
                }`}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Merchant</p>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{expense.merchant}</p>
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-400'
                }`}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Account</p>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{account?.name || 'Primary Account'}</p>
                </div>
              </div>
              {account && (
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                  ACTIVE
                </div>
              )}
            </div>

            {/* Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: category ? `${category.color}20` : (isDarkMode ? '#ffffff0d' : '#f8fafc'), color: category?.color }}
                >
                  <IconComponent size={20} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Category</p>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{expense.category}</p>
                </div>
              </div>
            </div>

            {/* Note */}
            {expense.note && (
              <div className={`p-4 rounded-2xl border italic text-sm ${
                isDarkMode ? 'bg-white/5 border-white/5 text-white/60' : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}>
                "{expense.note}"
              </div>
            )}

            {/* Split Info */}
            {expense.splitWith && expense.splitWith.length > 0 && (
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <Users size={14} className={isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'} />
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>Split Details</p>
                </div>
                <div className="space-y-2">
                  {expense.splitWith.map((split, idx) => (
                    <div key={`${split.person}-${idx}`} className="flex justify-between items-center">
                      <span className={`text-xs ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>{split.person}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{split.amount}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                          split.isPaid 
                            ? 'bg-emerald-500/20 text-emerald-500' 
                            : 'bg-rose-500/20 text-rose-500'
                        }`}>
                          {split.isPaid ? 'PAID' : 'PENDING'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90' 
                : 'bg-brand-600 text-white shadow-brand-500/20 hover:bg-brand-700'
            }`}
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
