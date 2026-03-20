import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface NotificationCenterProps {
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const notifications = [
    { id: '1', title: 'Budget Alert', message: 'You have reached 80% of your Food budget for March.', type: 'alert', time: '2h ago' },
    { id: '2', title: 'Recurring Payment', message: 'Your Netflix subscription (₹499) will be debited tomorrow.', type: 'info', time: '5h ago' },
    { id: '3', title: 'Daily Summary', message: 'Your daily summary for yesterday is ready to view.', type: 'success', time: '1d ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[70] bg-[#2D2D2A] flex flex-col"
    >
      <header className="px-6 pt-12 pb-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#E9D8A6]">
            <Bell size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Notifications</h2>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 no-scrollbar">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              notif.type === 'alert' ? 'bg-rose-500/20 text-rose-400' : 
              notif.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
              'bg-[#E9D8A6]/20 text-[#E9D8A6]'
            }`}>
              {notif.type === 'alert' ? <AlertCircle size={20} /> : 
               notif.type === 'success' ? <CheckCircle2 size={20} /> : 
               <TrendingUp size={20} />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-white">{notif.title}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase">{notif.time}</p>
              </div>
              <p className="text-xs font-medium text-white/40 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-white/5">
        <button 
          onClick={onClose}
          className="w-full py-4 rounded-xl bg-white/5 text-white/40 font-bold text-sm hover:bg-white/10 hover:text-white transition-all"
        >
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
};
