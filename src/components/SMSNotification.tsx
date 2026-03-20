import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { parseSMS } from '../utils/parsing';
import { Category } from '../types';
import { Bell, Check, X } from 'lucide-react';

interface SMSNotificationProps {
  onConfirm: (data: { amount: number; merchant: string; category: Category }) => void;
  onDismiss: () => void;
}

const SAMPLE_SMS = [
  "₹250 debited via UPI to Swiggy",
  "Paid ₹120 at Zomato",
  "A/c x1234 debited by Rs.500.00. Info: UPI/P2M/Amazon",
  "Paid ₹45 at OLA",
  "Recharge of ₹299 successful for Jio"
];

export const SMSNotification: React.FC<SMSNotificationProps> = ({ onConfirm, onDismiss }) => {
  const [activeSMS, setActiveSMS] = React.useState<string | null>(null);
  const [parsed, setParsed] = React.useState<{ amount: number; merchant: string; category: Category } | null>(null);

  React.useEffect(() => {
    const randomSMS = SAMPLE_SMS[Math.floor(Math.random() * SAMPLE_SMS.length)];
    setActiveSMS(randomSMS);
    setParsed(parseSMS(randomSMS));
  }, []);

  if (!parsed) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-4 right-4 z-50 bg-[#2D2D2A] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E9D8A6] shrink-0">
          <Bell size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <p className="text-[10px] font-bold text-[#E9D8A6] uppercase tracking-widest mb-1">New Transaction Detected</p>
            <button onClick={onDismiss} className="text-white/40 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-white font-bold mb-3">
            Add <span className="text-[#E9D8A6]">₹{parsed.amount}</span> spent at <span className="text-[#E9D8A6]">{parsed.merchant}</span>?
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => onConfirm(parsed)}
              className="flex-1 bg-[#E9D8A6] hover:bg-[#E9D8A6]/90 text-[#2D2D2A] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#E9D8A6]/20"
            >
              <Check size={14} /> Confirm
            </button>
            <button 
              onClick={onDismiss}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white/40 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
