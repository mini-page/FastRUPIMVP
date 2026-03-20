import React from 'react';
import { motion } from 'motion/react';
import { Expense, CategoryDefinition } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, PieChart as PieIcon } from 'lucide-react';
import { DailySummary } from './Prompts';

interface StatsScreenProps {
  expenses: Expense[];
  categories: CategoryDefinition[];
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ expenses, categories }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const categoryColors = React.useMemo(() => {
    const colors: Record<string, string> = {};
    categories.forEach(cat => {
      colors[cat.name] = cat.color;
    });
    return colors;
  }, [categories]);

  const todayExpenses = React.useMemo(() => {
    return expenses.filter(e => new Date(e.date).toDateString() === new Date().toDateString());
  }, [expenses]);

  const categoryData = React.useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const monthlyTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const averageDaily = monthlyTotal / 30;

  return (
    <div className={`space-y-8 pb-12 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#2D2D2A]' : 'bg-white'}`}>
      <header className="px-6 pt-12">
        <div className="flex justify-between items-end">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Analytics</p>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Spending Stats</h1>
          </div>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl shadow-lg border transition-all ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-white' 
              : 'bg-white border-slate-100 text-slate-900'
          }`}>
            <div className="flex flex-col items-end">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-xs font-bold">₹{monthlyTotal.toLocaleString()} spent</p>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Summary Card - Integrated into Stats */}
      <section className="px-6">
        <DailySummary 
          expenses={todayExpenses} 
          onClose={() => {}} 
        />
      </section>

      <section className="px-6 grid grid-cols-2 gap-4">
        <div className={`p-5 rounded-[24px] shadow-xl border space-y-2 transition-all ${
          isDarkMode 
            ? 'bg-[#2D2D2A] border-white/5' 
            : 'bg-white border-slate-100'
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-[#E9D8A6]' : 'bg-brand-50 text-brand-600'}`}>
            <TrendingUp size={20} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Monthly Total</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{monthlyTotal.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
            <ArrowUpRight size={12} />
            <span>8% vs last month</span>
          </div>
        </div>

        <div className={`p-5 rounded-[24px] shadow-xl border space-y-2 transition-all ${
          isDarkMode 
            ? 'bg-[#2D2D2A] border-white/5' 
            : 'bg-white border-slate-100'
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-[#EE9B00]' : 'bg-orange-50 text-orange-500'}`}>
            <TrendingUp size={20} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Daily Avg</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{averageDaily.toFixed(0)}</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400">
            <ArrowDownRight size={12} />
            <span>12% vs last month</span>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className={`p-6 rounded-[32px] shadow-xl border space-y-6 transition-all ${
          isDarkMode 
            ? 'bg-[#2D2D2A] border-white/5' 
            : 'bg-white border-slate-100'
        }`}>
          <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Category Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: isDarkMode ? '#E9D8A6' : '#64748b' }}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#2D2D2A' : '#fff', 
                    borderRadius: '12px', 
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                  itemStyle={{ color: isDarkMode ? '#fff' : '#0f172a' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {categoryData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={categoryColors[entry.name] || (isDarkMode ? '#E9D8A6' : '#0e91e9')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="px-6 space-y-4">
        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Top Categories</h3>
        <div className="space-y-3">
          {categoryData.slice(0, 3).map((item, idx) => (
            <div key={item.name} className={`p-4 rounded-[20px] flex items-center justify-between border shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-[#2D2D2A] border-white/5' 
                : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white/10' : 'text-slate-100'}`}>0{idx + 1}</div>
                <div>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                    {((item.value / monthlyTotal) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{item.value}</p>
                <div className={`w-24 h-1.5 rounded-full mt-1 overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(item.value / monthlyTotal) * 100}%`,
                      backgroundColor: categoryColors[item.name] || (isDarkMode ? '#E9D8A6' : '#0e91e9')
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
