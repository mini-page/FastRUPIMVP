import React from 'react';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-500 ${
        isDarkMode ? 'bg-[#2D2D2A] text-white' : 'bg-brand-600 text-white'
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className={`w-24 h-24 rounded-[32px] backdrop-blur-xl flex items-center justify-center shadow-2xl border ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
        }`}>
          <Wallet size={48} strokeWidth={2.5} className={isDarkMode ? 'text-[#E9D8A6]' : 'text-white'} />
        </div>
        <div className="text-center space-y-2">
          <h1 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-[#E9D8A6]' : 'text-white'}`}>FastRUPI</h1>
          <p className={`text-sm font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-[#E9D8A6]' : 'text-white/80'}`}>Quick • Smart • Secure</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="w-1 h-12 rounded-full bg-white/10 overflow-hidden">
          <motion.div 
            initial={{ y: -48 }}
            animate={{ y: 48 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className={`w-full h-full ${isDarkMode ? 'bg-[#E9D8A6]' : 'bg-white'}`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
