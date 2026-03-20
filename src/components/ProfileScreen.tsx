import React from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Wallet, LogOut, ChevronRight, Settings, HelpCircle, Moon, Sun } from 'lucide-react';

interface ProfileScreenProps {
  onManageCategories: () => void;
  onManageNotifications: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onManageCategories,
  onManageNotifications,
  isDarkMode,
  onToggleDarkMode
}) => {
  return (
    <div className={`space-y-8 pb-12 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#2D2D2A] text-white' : 'bg-white text-slate-900'}`}>
      <header className="px-6 pt-12 flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl ${isDarkMode ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-[#E9D8A6]/20' : 'bg-brand-600 text-white shadow-brand-500/20'}`}>
            <User size={48} />
          </div>
          <button className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl shadow-lg flex items-center justify-center border ${isDarkMode ? 'bg-[#2D2D2A] text-[#E9D8A6] border-white/10' : 'bg-white text-brand-600 border-slate-100'}`}>
            <Settings size={16} />
          </button>
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Raghavan S</h1>
          <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Premium Member</p>
        </div>
      </header>

      <section className="px-6 grid grid-cols-3 gap-4">
        <button 
          onClick={onManageNotifications}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-100 hover:bg-slate-50 shadow-sm'}`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#E9D8A6]/20 text-[#E9D8A6]' : 'bg-brand-50 text-brand-600'}`}>
            <Bell size={16} />
          </div>
          <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Alerts</span>
        </button>
        <button className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-100 hover:bg-slate-50 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Shield size={16} />
          </div>
          <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Security</span>
        </button>
        <button 
          onClick={onToggleDarkMode}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
            isDarkMode 
              ? 'bg-[#E9D8A6] border-[#E9D8A6]' 
              : 'bg-brand-600 border-brand-600 shadow-lg shadow-brand-500/20'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-black/10 text-[#2D2D2A]' : 'bg-white/20 text-white'}`}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </div>
          <span className={`text-[10px] font-bold ${isDarkMode ? 'text-[#2D2D2A]' : 'text-white'}`}>
            Theme
          </span>
        </button>
      </section>

      <section className="px-6 space-y-4">
        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Preferences</h3>
        <div className={`rounded-[32px] border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div 
            onClick={onManageCategories}
            className={`p-4 flex items-center justify-between border-b transition-colors cursor-pointer ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-400'}`}>
                <Wallet size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Category Limits</p>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Set monthly spending caps</p>
              </div>
            </div>
            <ChevronRight size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-200'} />
          </div>

          <div 
            onClick={onManageNotifications}
            className={`p-4 flex items-center justify-between border-b transition-colors cursor-pointer ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-400'}`}>
                <Bell size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Notification Settings</p>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>SMS parsing & daily reports</p>
              </div>
            </div>
            <ChevronRight size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-200'} />
          </div>

          <div className={`p-4 flex items-center justify-between transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-400'}`}>
                <HelpCircle size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Support & Feedback</p>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Get help with FastRUPI</p>
              </div>
            </div>
            <ChevronRight size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-200'} />
          </div>
        </div>
      </section>

      <section className="px-6">
        <button className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${isDarkMode ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'}`}>
          <LogOut size={20} />
          Sign Out
        </button>
        <p className={`text-center mt-6 text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/20' : 'text-slate-200'}`}>
          FastRUPI v2.5.0
        </p>
      </section>
    </div>
  );
};
