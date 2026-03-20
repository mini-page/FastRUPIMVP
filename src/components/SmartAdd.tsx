import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Zap, MessageSquare, IndianRupee, Tag, Store, Users, Calendar, Plus } from 'lucide-react';
import { Category, CategoryDefinition } from '../types';

interface SmartAddProps {
  onAdd: (data: any) => void;
  onClose: () => void;
  categories: CategoryDefinition[];
}

export const SmartAdd: React.FC<SmartAddProps> = ({ onAdd, onClose, categories }) => {
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState<Category>(categories[0]?.name || 'Other');
  const [merchant, setMerchant] = React.useState('');
  const [isSplit, setIsSplit] = React.useState(false);
  const [splitPeople, setSplitPeople] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    onAdd({
      amount: parseFloat(amount),
      category,
      merchant: merchant || 'Manual Entry',
      splitWith: isSplit ? splitPeople.map(p => ({ person: p, amount: parseFloat(amount) / (splitPeople.length + 1), isPaid: false })) : []
    });
    onClose();
  };

  const addPerson = () => {
    const name = prompt('Enter person name:');
    if (name) setSplitPeople([...splitPeople, name]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-[#2D2D2A] flex flex-col"
    >
      <header className="px-6 pt-12 pb-6 flex justify-between items-center border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Smart Add</h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar">
        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <IndianRupee size={12} className="text-[#E9D8A6]" />
            Amount
          </label>
          <input 
            type="number" 
            autoFocus
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-5xl font-bold text-[#E9D8A6] placeholder:text-white/10 focus:outline-none bg-transparent"
          />
        </div>

        {/* Merchant Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Store size={12} className="text-[#E9D8A6]" />
            Merchant / Description
          </label>
          <input 
            type="text" 
            placeholder="Where did you spend?"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="w-full py-4 px-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E9D8A6]/50"
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Tag size={12} className="text-[#E9D8A6]" />
            Category
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`px-5 py-3 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                  category === cat.name 
                    ? 'bg-[#E9D8A6] border-[#E9D8A6] text-[#2D2D2A] shadow-lg shadow-[#E9D8A6]/20' 
                    : 'bg-white/5 border-white/10 text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Split Bill Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Users size={12} className="text-[#E9D8A6]" />
              Split Bill
            </label>
            <button 
              type="button"
              onClick={() => setIsSplit(!isSplit)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isSplit ? 'bg-[#E9D8A6]' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isSplit ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          
          {isSplit && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div className="flex flex-wrap gap-2">
                {splitPeople.map((person, idx) => (
                  <div key={`${person}-${idx}`} className="bg-[#E9D8A6]/10 text-[#E9D8A6] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                    {person}
                    <button type="button" onClick={() => setSplitPeople(splitPeople.filter((_, i) => i !== idx))}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addPerson}
                  className="px-3 py-1.5 rounded-lg border border-dashed border-[#E9D8A6]/30 text-[#E9D8A6] text-xs font-bold flex items-center gap-2"
                >
                  <Plus size={12} />
                  Add Person
                </button>
              </div>
              {amount && splitPeople.length > 0 && (
                <p className="text-[10px] font-bold text-white/40">
                  Each person pays: ₹{(parseFloat(amount) / (splitPeople.length + 1)).toFixed(2)}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </form>

      <div className="p-6 border-t border-white/5">
        <button 
          onClick={handleSubmit}
          className="w-full py-5 rounded-2xl bg-[#E9D8A6] text-[#2D2D2A] font-bold shadow-2xl shadow-[#E9D8A6]/20 hover:bg-[#E9D8A6]/90 transition-all"
        >
          Add Expense
        </button>
      </div>
    </motion.div>
  );
};
