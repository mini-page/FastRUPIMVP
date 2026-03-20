import React from 'react';
import { motion } from 'motion/react';
import { Expense, QUICK_AMOUNTS, CategoryDefinition } from '../types';
import { 
  Zap, Plus, Mic, MessageSquare, Utensils, Car, Home, Smartphone, ShoppingBag, 
  FileText, MoreHorizontal, Users, Heart, Coffee, Gift, Briefcase, Plane, 
  Music, Camera, Trophy, Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, 
  GraduationCap, Laptop, Film, HeartPulse, Key, Bus, LayoutGrid 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus
};

interface QuickAddProps {
  onAdd: (expense: Partial<Expense>) => void;
  onSimulateSMS: () => void;
  onMoreDetails?: () => void;
  categories: CategoryDefinition[];
}

export const QuickAdd: React.FC<QuickAddProps> = ({ onAdd, onSimulateSMS, onMoreDetails, categories }) => {
  const [amount, setAmount] = React.useState<number | null>(null);
  const [isVoiceActive, setIsVoiceActive] = React.useState(false);
  const [isSplit, setIsSplit] = React.useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleAmountClick = (val: number) => {
    setAmount(val);
  };

  const handleCategoryClick = (catName: string) => {
    if (amount) {
      onAdd({ 
        amount, 
        category: catName, 
        merchant: 'Manual Entry', 
        source: 'manual',
        splitWith: isSplit ? [{ person: 'Rahul', amount: amount / 2, isPaid: false }] : [] 
      });
      setAmount(null);
      setIsSplit(false);
    }
  };

  const simulateVoice = () => {
    setIsVoiceActive(true);
    setTimeout(() => {
      onAdd({ amount: 200, category: 'Food', merchant: 'Voice Command', source: 'voice' });
      setIsVoiceActive(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className={`flex justify-between items-center p-4 rounded-[20px] shadow-xl border transition-all ${
        isDarkMode 
          ? 'bg-[#2D2D2A] border-white/5' 
          : 'bg-white border-slate-100'
      }`}>
        <button 
          onClick={onSimulateSMS}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600'
          }`}
        >
          <MessageSquare size={22} />
          <span className="text-[9px] uppercase tracking-wider font-bold">SMS</span>
        </button>
        
        <button 
          onClick={simulateVoice}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isVoiceActive 
              ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') 
              : (isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600')
          }`}
        >
          <Mic size={22} className={isVoiceActive ? 'animate-pulse' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Voice</span>
        </button>

        <button 
          onClick={() => setIsSplit(!isSplit)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isSplit 
              ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') 
              : (isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600')
          }`}
        >
          <Users size={22} className={isSplit ? 'animate-bounce' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Split</span>
        </button>

        <button className={`flex flex-col items-center gap-1 transition-colors ${
          isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600'
        }`}>
          <Zap size={22} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Smart</span>
        </button>

        <button 
          onClick={onMoreDetails}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isDarkMode ? 'text-white/40 hover:text-[#E9D8A6]' : 'text-slate-400 hover:text-brand-600'
          }`}
        >
          <Plus size={22} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Manual</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_AMOUNTS.map((val) => (
            <motion.button
              key={val}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAmountClick(val)}
              className={`flex-1 min-w-[75px] py-4 rounded-xl font-mono text-lg font-bold border transition-all ${
                amount === val 
                  ? (isDarkMode 
                      ? 'bg-[#E9D8A6] border-[#E9D8A6] text-[#2D2D2A] shadow-lg shadow-[#E9D8A6]/20' 
                      : 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20')
                  : (isDarkMode 
                      ? 'bg-[#2D2D2A] border-white/5 text-white shadow-xl' 
                      : 'bg-white border-slate-100 text-slate-900 shadow-sm')
              }`}
            >
              ₹{val}
            </motion.button>
          ))}
          <button className={`min-w-[50px] py-4 rounded-xl border flex items-center justify-center shadow-xl transition-all ${
            isDarkMode 
              ? 'bg-[#2D2D2A] border-white/5 text-white/40' 
              : 'bg-white border-slate-100 text-slate-400'
          }`}>
            <Plus size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {categories.filter(c => c.type === 'expense').map((cat) => {
            const IconComponent = ICON_MAP[cat.icon as keyof typeof ICON_MAP] || MoreHorizontal;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                disabled={!amount}
                onClick={() => handleCategoryClick(cat.name)}
                className={`py-4 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-2 ${
                  !amount 
                    ? (isDarkMode 
                        ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed opacity-50' 
                        : 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed')
                    : (isDarkMode 
                        ? 'bg-[#2D2D2A] border-white/5 text-white shadow-xl hover:border-[#E9D8A6]/50 hover:bg-white/5' 
                        : 'bg-white border-slate-100 text-slate-900 shadow-sm hover:border-brand-500/50 hover:bg-slate-50')
                }`}
              >
                <IconComponent size={18} style={{ color: amount ? cat.color : undefined }} />
                {cat.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
