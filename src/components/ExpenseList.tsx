import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Expense, CategoryDefinition } from '../types';
import { 
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Clock, Users, Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap,
  Trophy, Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus, LayoutGrid
} from 'lucide-react';
import { MERCHANT_LOGOS } from '../types';

const ICON_MAP: Record<string, any> = {
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus
};

interface ExpenseListProps {
  expenses: Expense[];
  categories: CategoryDefinition[];
  onExpenseClick?: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, categories, onExpenseClick }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  if (expenses.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 space-y-4 ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
          <Clock size={32} strokeWidth={1.5} />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest">No transactions logged</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Recent Transactions</h3>
        <button className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600'}`}>View All</button>
      </div>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {expenses.map((expense) => {
            const logoUrl = MERCHANT_LOGOS[expense.merchant.toLowerCase()];
            const categoryDef = categories.find(c => c.name === expense.category);
            const IconComponent = (categoryDef ? ICON_MAP[categoryDef.icon as keyof typeof ICON_MAP] : null) || LayoutGrid;
            
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onExpenseClick?.(expense)}
                className={`group flex items-center justify-between p-4 rounded-[20px] shadow-xl transition-all border cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#2D2D2A] border-white/5 hover:border-[#E9D8A6]/20' 
                    : 'bg-white border-slate-100 hover:border-brand-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border shadow-inner ${
                    isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'
                  }`}>
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={expense.merchant} 
                        className="w-8 h-8 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div style={{ color: categoryDef?.color || (isDarkMode ? '#E9D8A6' : '#0e91e9') }}>
                        <IconComponent size={22} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{expense.merchant}</p>
                      {expense.splitWith && expense.splitWith.length > 0 && (
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-[#E9D8A6]/10 text-[#E9D8A6]' : 'bg-brand-50 text-brand-600'}`}>
                          <Users size={10} />
                          <span className="text-[8px] font-bold">SPLIT</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                        {expense.category}
                      </span>
                      <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                        {expense.source}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-rose-500">-₹{expense.amount}</p>
                  <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>
                    {new Date(expense.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
