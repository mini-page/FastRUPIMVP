import React from 'react';
import { motion } from 'motion/react';
import { Expense } from '../types';
import { CheckCircle2, PieChart, ArrowRight, X } from 'lucide-react';

interface DailySummaryProps {
  expenses: Expense[];
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-orange-500',
  Travel: 'bg-blue-500',
  Rent: 'bg-purple-500',
  Recharge: 'bg-green-500',
  Shopping: 'bg-pink-500',
  Bills: 'bg-cyan-500',
  Other: 'bg-gray-500',
};

export const DailySummary: React.FC<DailySummaryProps> = ({ expenses, onClose }) => {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  const categoryBreakdown = React.useMemo(() => {
    const breakdown: Record<string, number> = {};
    expenses.forEach(e => {
      breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
    });
    return Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#2D2D2A] p-6 rounded-[32px] shadow-2xl border border-white/10 space-y-6 relative"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-white/40 transition-colors"
      >
        <X size={18} />
      </button>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#E9D8A6]">
          <PieChart size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Daily Summary</h3>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Your spending report</p>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-2xl space-y-1">
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Total Spent Today</p>
        <p className="text-3xl font-bold text-[#E9D8A6]">₹{total}</p>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Breakdown</p>
        <div className="space-y-2">
          {categoryBreakdown.map(([cat, amt]) => (
            <div key={cat} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[cat] || 'bg-[#E9D8A6]'}`} />
                <span className="text-sm font-bold text-white">{cat}</span>
              </div>
              <span className="text-sm font-bold text-white">₹{amt}</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export const MissedExpensePrompt: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
          <ArrowRight size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Missed Expense?</p>
          <p className="text-[10px] font-medium text-white/60">You haven't logged anything today.</p>
        </div>
      </div>
      <button
        onClick={onAdd}
        className="bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20"
      >
        Log Now
      </button>
    </motion.div>
  );
};
