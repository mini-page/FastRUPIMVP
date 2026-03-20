import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, CreditCard, Tag, MessageSquare, Calendar, Clock, 
  Plus, Minus, X as Multiply, Divide, Delete, ChevronRight,
  LayoutGrid, Utensils, Car, Home, Smartphone, ShoppingBag, 
  FileText, MoreHorizontal, Users, Heart, Coffee, Gift, 
  Briefcase, Plane, Music, Camera, Zap, Trophy, Ticket, 
  RotateCcw, Watch, Sparkles, Shirt, GraduationCap, Laptop, 
  Film, HeartPulse, Key, Bus
} from 'lucide-react';
import { CategoryDefinition, Account, Expense, Income } from '../types';

const ICON_MAP: Record<string, any> = {
  Utensils, Car, Home, Smartphone, ShoppingBag, FileText, MoreHorizontal, 
  Heart, Coffee, Gift, Briefcase, Plane, Music, Camera, Zap, Trophy, 
  Ticket, RotateCcw, Tag, Watch, Sparkles, Shirt, GraduationCap, 
  Laptop, Film, HeartPulse, Key, Bus
};

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  categories: CategoryDefinition[];
  accounts: Account[];
  editingTransaction?: any;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  accounts,
  editingTransaction,
}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryDefinition | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(accounts[0] || null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(new Date().toTimeString().slice(0, 5));

  // Calculator state
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingTransaction) {
        setType(editingTransaction.type || (editingTransaction.merchant ? 'expense' : 'income'));
        setAmount(String(editingTransaction.amount));
        setNote(editingTransaction.note || '');
        const cat = categories.find(c => c.name === editingTransaction.category);
        setSelectedCategory(cat || null);
        const acc = accounts.find(a => a.id === editingTransaction.accountId);
        setSelectedAccount(acc || accounts[0] || null);
        
        const d = new Date(editingTransaction.date);
        setDate(d.toISOString().split('T')[0]);
        setTime(d.toTimeString().slice(0, 5));
      } else {
        const firstCat = categories.find(c => c.type === type);
        setSelectedCategory(firstCat || null);
        setAmount('0');
        setNote('');
        setSelectedAccount(accounts[0] || null);
        
        const d = new Date();
        setDate(d.toISOString().split('T')[0]);
        setTime(d.toTimeString().slice(0, 5));
      }
    }
  }, [isOpen, type, categories, editingTransaction, accounts]);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setAmount(num);
      setWaitingForOperand(false);
    } else {
      setAmount(amount === '0' ? num : amount + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(amount);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = performCalculation[operator](currentValue, inputValue);
      setPrevValue(newValue);
      setAmount(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation: Record<string, (a: number, b: number) => number> = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next,
  };

  const handleEqual = () => {
    const inputValue = parseFloat(amount);
    if (operator && prevValue !== null) {
      const newValue = performCalculation[operator](prevValue, inputValue);
      setAmount(String(newValue));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  const handleClear = () => {
    setAmount('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
  };

  const handleSave = () => {
    const finalAmount = parseFloat(amount);
    if (finalAmount <= 0) return;

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const transactionDate = new Date(year, month - 1, day, hours, minutes).getTime();

    onSave({
      ...editingTransaction,
      type,
      amount: finalAmount,
      category: selectedCategory?.name || 'Other',
      accountId: selectedAccount?.id || accounts[0]?.id,
      note,
      merchant: type === 'expense' ? (note || 'Manual Entry') : undefined,
      date: transactionDate,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={onClose}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
            isDarkMode ? 'text-[#E9D8A6] hover:text-white' : 'text-white hover:text-white/80'
          }`}
        >
          <X size={20} /> CANCEL
        </button>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
            isDarkMode ? 'text-[#E9D8A6] hover:text-white' : 'text-white hover:text-white/80'
          }`}
        >
          SAVE <Check size={20} />
        </button>
      </div>

      {/* Type Selector */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <button 
          onClick={() => setType('income')}
          className={`text-xs font-bold uppercase tracking-wider transition-all ${
            type === 'income' 
              ? (isDarkMode ? 'text-[#E9D8A6] scale-110' : 'text-white scale-110') 
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          Income
        </button>
        <div className={`w-px h-4 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}`} />
        <button 
          onClick={() => setType('expense')}
          className={`text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
            type === 'expense' 
              ? (isDarkMode ? 'text-[#E9D8A6] scale-110' : 'text-white scale-110') 
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          {type === 'expense' && <Check size={14} />} Expense
        </button>
        <div className={`w-px h-4 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}`} />
        <button 
          className="text-xs font-bold uppercase tracking-wider text-white/30 cursor-not-allowed"
        >
          Transfer
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-8">
        {/* Account & Category Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setShowAccountPicker(true)}
            className={`p-4 rounded-[24px] border flex items-center gap-3 transition-all text-left ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#E9D8A6]/10 text-[#E9D8A6]' : 'bg-white/20 text-white'}`}>
              <CreditCard size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Account</p>
              <p className="text-xs font-bold text-white truncate">{selectedAccount?.name || 'Select'}</p>
            </div>
          </button>

          <button 
            onClick={() => setShowCategoryPicker(true)}
            className={`p-4 rounded-[24px] border flex items-center gap-3 transition-all text-left ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
              style={{ backgroundColor: selectedCategory ? `${selectedCategory.color}20` : 'rgba(255,255,255,0.1)', color: selectedCategory?.color || 'white' }}
            >
              {selectedCategory ? React.createElement(ICON_MAP[selectedCategory.icon] || LayoutGrid, { size: 20 }) : <Tag size={20} />}
            </div>
            <div className="overflow-hidden">
              <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Category</p>
              <p className="text-xs font-bold text-white truncate">{selectedCategory?.name || 'Select'}</p>
            </div>
          </button>
        </div>

        {/* Notes Area */}
        <div className={`p-6 rounded-[32px] border min-h-[120px] transition-all ${
          isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-[#E9D8A6]/30' : 'bg-white/10 border-white/20 focus-within:border-white/40'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={14} className="text-white/40" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Add Notes</p>
          </div>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What was this for?"
            className="w-full bg-transparent border-none focus:ring-0 text-white text-sm font-medium placeholder:text-white/20 resize-none h-16"
          />
        </div>

        {/* Amount Display */}
        <div className={`p-8 rounded-[32px] border flex items-center justify-between transition-all ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex-1 text-right pr-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Amount</p>
            <h2 className="text-5xl font-black text-white tracking-tighter">
              {parseFloat(amount).toLocaleString()}
            </h2>
          </div>
          <button 
            onClick={handleDelete}
            className="p-4 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <Delete size={24} />
          </button>
        </div>

        {/* Calculator Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <CalcButton label="+" onClick={() => handleOperator('+')} isOperator active={operator === '+'} />
          <CalcButton label="7" onClick={() => handleNumber('7')} />
          <CalcButton label="8" onClick={() => handleNumber('8')} />
          <CalcButton label="9" onClick={() => handleNumber('9')} />
          
          {/* Row 2 */}
          <CalcButton label="-" onClick={() => handleOperator('-')} isOperator active={operator === '-'} />
          <CalcButton label="4" onClick={() => handleNumber('4')} />
          <CalcButton label="5" onClick={() => handleNumber('5')} />
          <CalcButton label="6" onClick={() => handleNumber('6')} />

          {/* Row 3 */}
          <CalcButton label="×" onClick={() => handleOperator('*')} isOperator active={operator === '*'} />
          <CalcButton label="1" onClick={() => handleNumber('1')} />
          <CalcButton label="2" onClick={() => handleNumber('2')} />
          <CalcButton label="3" onClick={() => handleNumber('3')} />

          {/* Row 4 */}
          <CalcButton label="÷" onClick={() => handleOperator('/')} isOperator active={operator === '/'} />
          <CalcButton label="0" onClick={() => handleNumber('0')} />
          <CalcButton label="." onClick={() => handleNumber('.')} />
          <CalcButton label="=" onClick={handleEqual} isOperator variant="accent" />
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center px-2 pt-4">
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Calendar size={14} className="text-white" />
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-white uppercase tracking-wider focus:ring-0 p-0 cursor-pointer"
              style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
            />
          </div>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Clock size={14} className="text-white" />
            <input 
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-white uppercase tracking-wider focus:ring-0 p-0 cursor-pointer"
              style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
            />
          </div>
        </div>
      </div>

      {/* Pickers */}
      <AnimatePresence>
        {showCategoryPicker && (
          <PickerOverlay 
            title="Select Category" 
            onClose={() => setShowCategoryPicker(false)}
          >
            <div className="grid grid-cols-3 gap-3">
              {categories.filter(c => c.type === type).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryPicker(false);
                  }}
                  className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                    selectedCategory?.id === cat.id 
                      ? (isDarkMode ? 'bg-[#E9D8A6] text-[#2D2D2A]' : 'bg-white text-slate-900 shadow-lg') 
                      : (isDarkMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedCategory?.id === cat.id ? 'bg-black/10' : 'bg-white/10'
                    }`}
                    style={{ color: selectedCategory?.id === cat.id ? 'inherit' : cat.color }}
                  >
                    {React.createElement(ICON_MAP[cat.icon] || LayoutGrid, { size: 20 })}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center">{cat.name}</span>
                </button>
              ))}
            </div>
          </PickerOverlay>
        )}

        {showAccountPicker && (
          <PickerOverlay 
            title="Select Account" 
            onClose={() => setShowAccountPicker(false)}
          >
            <div className="space-y-3">
              {accounts.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccount(acc);
                    setShowAccountPicker(false);
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                    selectedAccount?.id === acc.id 
                      ? (isDarkMode ? 'bg-[#E9D8A6] text-[#2D2D2A]' : 'bg-brand-600 text-white shadow-lg') 
                      : (isDarkMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedAccount?.id === acc.id ? 'bg-black/10' : 'bg-white/10'
                    }`}>
                      <CreditCard size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">{acc.name}</p>
                      <p className={`text-[10px] font-bold opacity-60`}>Balance: ₹{acc.balance.toLocaleString()}</p>
                    </div>
                  </div>
                  {selectedAccount?.id === acc.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </PickerOverlay>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CalcButton: React.FC<{ 
  label: string; 
  onClick: () => void; 
  isOperator?: boolean; 
  active?: boolean;
  variant?: 'default' | 'accent';
}> = ({ label, onClick, isOperator, active, variant = 'default' }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-2xl text-xl font-bold transition-all ${
        active 
          ? (isDarkMode ? 'bg-[#E9D8A6] text-[#2D2D2A] scale-95' : 'bg-white text-slate-900 scale-95 shadow-inner') 
          : isOperator 
            ? (isDarkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-white/20 text-white hover:bg-white/30')
            : (isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-white/10 text-white hover:bg-white/20')
      } ${variant === 'accent' ? (isDarkMode ? '!bg-[#E9D8A6] !text-[#2D2D2A]' : '!bg-white !text-slate-900 shadow-lg') : ''}`}
    >
      {label}
    </button>
  );
};

const PickerOverlay: React.FC<{ 
  title: string; 
  onClose: () => void; 
  children: React.ReactNode;
}> = ({ title, onClose, children }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className={`fixed inset-x-0 bottom-0 z-[200] rounded-t-[40px] shadow-2xl p-8 max-h-[80vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#2D2D2A] border-t border-white/10' : 'bg-white border-t border-slate-100'
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>
          {title}
        </h3>
        <button onClick={onClose} className={isDarkMode ? 'text-white/40' : 'text-slate-400'}>
          <X size={20} />
        </button>
      </div>
      {children}
    </motion.div>
  );
};
