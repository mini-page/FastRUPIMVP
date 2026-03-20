import React from 'react';
import { motion } from 'motion/react';
import { X, Users, Check, Clock, ArrowRight } from 'lucide-react';
import { Expense } from '../types';

interface SplitBillsProps {
  expenses: Expense[];
  onUpdateExpense: (expense: Expense) => void;
  onClose: () => void;
}

export const SplitBills: React.FC<SplitBillsProps> = ({ expenses, onUpdateExpense, onClose }) => {
  const splitExpenses = expenses.filter(e => e.splitWith && e.splitWith.length > 0);

  const handleTogglePaid = (expense: Expense, personIndex: number) => {
    if (!expense.splitWith) return;
    const newSplitWith = [...expense.splitWith];
    newSplitWith[personIndex] = {
      ...newSplitWith[personIndex],
      isPaid: !newSplitWith[personIndex].isPaid
    };
    onUpdateExpense({ ...expense, splitWith: newSplitWith });
  };

  const totalOwed = splitExpenses.reduce((acc, exp) => {
    return acc + (exp.splitWith?.reduce((sum, split) => sum + (split.isPaid ? 0 : split.amount), 0) || 0);
  }, 0);

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
        className="w-full max-w-md bg-[#2D2D2A] rounded-t-[40px] p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar border-t border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Split Bills</h2>
            <p className="text-xs font-bold text-[#E9D8A6] uppercase tracking-wider">Track who owes you</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
        </div>

        <div className="bg-[#E9D8A6] p-6 rounded-[32px] text-[#2D2D2A] shadow-xl shadow-[#E9D8A6]/20">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total Owed to You</p>
          <h3 className="text-3xl font-bold">₹{totalOwed.toLocaleString()}</h3>
        </div>

        <div className="space-y-4">
          {splitExpenses.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/20">
                <Users size={32} />
              </div>
              <p className="text-sm font-bold text-white/40">No split bills yet</p>
            </div>
          ) : (
            splitExpenses.map(expense => (
              <div key={expense.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-white">{expense.merchant}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-bold text-[#E9D8A6]">₹{expense.amount}</p>
                </div>

                <div className="space-y-2">
                  {expense.splitWith?.map((split, idx) => (
                    <div key={`${split.person}-${idx}`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${split.isPaid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {split.isPaid ? <Check size={16} /> : <Clock size={16} />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{split.person}</p>
                          <p className="text-[10px] font-bold text-white/40">₹{split.amount}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleTogglePaid(expense, idx)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                          split.isPaid 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                            : 'bg-white/5 text-white/60 border border-white/10 hover:border-[#E9D8A6] hover:text-[#E9D8A6]'
                        }`}
                      >
                        {split.isPaid ? 'Paid' : 'Mark Paid'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-[#E9D8A6] text-[#2D2D2A] font-bold shadow-lg shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90 transition-all"
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
};
