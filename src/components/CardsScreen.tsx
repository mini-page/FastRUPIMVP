import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Plus, ShieldCheck, ArrowRight, Smartphone, Banknote } from 'lucide-react';

export const CardsScreen: React.FC = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  return (
    <div className={`space-y-8 pb-12 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#2D2D2A]' : 'bg-white'}`}>
      <header className="px-6 pt-12">
        <div className="flex justify-between items-end">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Accounts</p>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Wallets</h1>
          </div>
          <button className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20' 
              : 'bg-brand-600 text-white shadow-brand-500/20'
          }`}>
            <Plus size={20} />
          </button>
        </div>
      </header>

      <section className="px-6 space-y-4">
        <div className={`relative h-48 w-full rounded-[32px] p-8 shadow-2xl overflow-hidden transition-all ${
          isDarkMode 
            ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20' 
            : 'bg-brand-600 text-white shadow-brand-500/20'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Primary Account</p>
                <h3 className="text-lg font-bold">HDFC Bank •••• 5711</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black/5 backdrop-blur-md flex items-center justify-center">
                <Smartphone size={20} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Available Balance</p>
              <h2 className="text-3xl font-bold">₹48,250.00</h2>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-[32px] border shadow-sm space-y-4 transition-all ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>UPI Lite Enabled</p>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Instant payments up to ₹500</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹1,200</p>
              <button className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Top Up</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 space-y-4">
        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Other Accounts</h3>
        <div className="space-y-3">
          <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Banknote size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ICICI Savings</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>UPI: icici@okaxis</p>
              </div>
            </div>
            <ArrowRight size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-300'} />
          </div>

          <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                <CreditCard size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Amazon Pay ICICI</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Credit Card •••• 1024</p>
              </div>
            </div>
            <ArrowRight size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-300'} />
          </div>
        </div>
      </section>

      <section className="px-6">
        <button className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
          isDarkMode 
            ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90' 
            : 'bg-brand-600 text-white shadow-brand-500/20 hover:bg-brand-700'
        }`}>
          <Plus size={20} />
          Link New Bank Account
        </button>
      </section>
    </div>
  );
};
