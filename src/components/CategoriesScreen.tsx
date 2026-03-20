import React, { useState, useMemo } from 'react';
import { CategoryDefinition, Expense, Income, Subscription } from '../types';
import { Plus, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { SubscriptionSection } from './SubscriptionSection';
import { 
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus
};

interface CategoriesScreenProps {
  categories: CategoryDefinition[];
  expenses: Expense[];
  incomes: Income[];
  subscriptions: Subscription[];
  onAddCategory: () => void;
  onEditCategory: (category: CategoryDefinition) => void;
  onManageSubscriptions: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  categories,
  expenses,
  incomes,
  subscriptions,
  onAddCategory,
  onEditCategory,
  onManageSubscriptions
}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  const currentBalance = incomes.reduce((a, b) => a + b.amount, 0) - expenses.reduce((a, b) => a + b.amount, 0);

  const filteredCategories = categories.filter(c => c.type === activeTab);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    if (activeTab === 'expense') {
      expenses.forEach(e => {
        totals[e.category] = (totals[e.category] || 0) + e.amount;
      });
    } else {
      incomes.forEach(i => {
        totals[i.category] = (totals[i.category] || 0) + i.amount;
      });
    }
    return totals;
  }, [expenses, incomes, activeTab]);

  return (
    <div className={`space-y-6 pb-24 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#2D2D2A]' : 'bg-white'}`}>
      <header className="px-6 pt-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-1 w-5 h-5">
            <div className="rounded-sm bg-blue-500"></div>
            <div className="rounded-sm bg-blue-500"></div>
            <div className={`rounded-sm ${isDarkMode ? 'bg-white' : 'bg-slate-800'}`}></div>
            <div className={`rounded-sm ${isDarkMode ? 'bg-white' : 'bg-slate-800'}`}></div>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
              Current balance
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className={`flex rounded-full p-1 ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
            <button
              onClick={() => setActiveTab('expense')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'expense'
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'income'
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Incomes
            </button>
          </div>
          <button
            onClick={onAddCategory}
            className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-colors"
          >
            Create New
          </button>
        </div>
      </header>

      <div className="px-6 grid grid-cols-3 gap-4">
        {filteredCategories.map(category => {
          const IconComponent = ICON_MAP[category.icon] || LayoutGrid;
          const total = categoryTotals[category.name] || 0;
          
          return (
            <div
              key={category.id}
              className="relative p-4 rounded-3xl flex flex-col justify-between aspect-square"
              style={{ backgroundColor: `${category.color}40` }}
            >
              <button 
                onClick={() => onEditCategory(category)}
                className="absolute top-3 right-3 text-slate-700 dark:text-white/60 hover:text-black dark:hover:text-white"
              >
                <MoreHorizontal size={16} />
              </button>
              
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2D2D2A] flex items-center justify-center shadow-sm">
                <IconComponent size={20} className={isDarkMode ? 'text-white' : 'text-slate-900'} />
              </div>
              
              <div className="mt-auto space-y-1">
                <p className={`text-[11px] font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {category.name}
                </p>
                {category.budgetLimit && activeTab === 'expense' ? (
                  <>
                    <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>
                      ₹{total.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / {category.budgetLimit.toLocaleString()}
                    </p>
                    <div className="h-1 w-full bg-black/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black/30 rounded-full" 
                        style={{ width: `${Math.min((total / category.budgetLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className={`text-[11px] font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>
                    ₹{total.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        <button
          onClick={onAddCategory}
          className={`relative p-4 rounded-3xl flex items-center justify-center aspect-square transition-colors ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white dark:bg-[#2D2D2A] flex items-center justify-center shadow-sm">
            <Plus size={24} className={isDarkMode ? 'text-white' : 'text-slate-900'} />
          </div>
        </button>
      </div>

      <div className="px-6 mt-12">
        <SubscriptionSection 
          subscriptions={subscriptions} 
          onManage={onManageSubscriptions} 
        />
      </div>
    </div>
  );
};
