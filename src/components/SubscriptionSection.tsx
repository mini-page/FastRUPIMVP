import React from 'react';
import { TrendingUp } from 'lucide-react';

export const SubscriptionSection: React.FC<{ subscriptions: any[], onManage: () => void }> = ({ subscriptions, onManage }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Recurring Subs</h3>
        <button 
          onClick={onManage}
          className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-[#E9D8A6] hover:text-white' : 'text-brand-600 hover:text-brand-700'}`}
        >
          Manage
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {subscriptions.map((sub) => (
          <div key={sub.id} className={`min-w-[140px] p-4 rounded-[20px] border shadow-xl space-y-3 ${isDarkMode ? 'bg-[#2D2D2A] border-white/5' : 'bg-white border-slate-100'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
              {sub.logo ? (
                <img src={sub.logo} alt={sub.name} className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
              ) : (
                <TrendingUp size={20} className={isDarkMode ? 'text-white/40' : 'text-slate-400'} />
              )}
            </div>
            <div>
              <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{sub.name}</p>
              <p className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>₹{sub.amount}/mo</p>
            </div>
            <div className={`pt-2 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
              <p className={`text-[8px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>Next: {new Date(sub.nextBillingDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
