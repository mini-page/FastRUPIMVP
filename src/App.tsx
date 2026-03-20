import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Expense, Budget, Subscription, CategoryDefinition, Account, Income } from './types';
import { QuickAdd } from './components/QuickAdd';
import { ExpenseList } from './components/ExpenseList';
import { SMSNotification } from './components/SMSNotification';
import { SummaryChart } from './components/SummaryChart';
import { DailySummary, MissedExpensePrompt } from './components/Prompts';
import { StatsScreen } from './components/StatsScreen';
import { CardsScreen } from './components/CardsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SplashScreen } from './components/SplashScreen';
import { SmartAdd } from './components/SmartAdd';
import { NotificationCenter } from './components/NotificationCenter';
import { FilterModal } from './components/FilterModal';
import { ManageModal } from './components/ManageModal';
import { CategoryManager } from './components/CategoryManager';
import { SplitBills } from './components/SplitBills';
import { ExpenseDetailModal } from './components/ExpenseDetailModal';
import { AddTransactionModal } from './components/AddTransactionModal';
import { CategoriesScreen } from './components/CategoriesScreen';
import { 
  Wallet, Bell, Plus, LayoutGrid, PieChart as PieIcon, CreditCard, 
  User, X, Filter, Users, Repeat, FileText, Tag, Trophy, Ticket, RotateCcw, 
  Watch, Sparkles, Shirt, GraduationCap, Laptop, Film, HeartPulse, Key, Bus, 
  MoreHorizontal, Home 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Trophy, Ticket, RotateCcw, Home, Tag, Watch, Sparkles, Shirt, 
  GraduationCap, Laptop, Film, Utensils: (props: any) => <LayoutGrid {...props} />, // Fallback or specific
  HeartPulse, Key, ShoppingBag: (props: any) => <LayoutGrid {...props} />,
  Coffee: (props: any) => <LayoutGrid {...props} />,
  Users, Bus, Smartphone: (props: any) => <LayoutGrid {...props} />,
  Zap: (props: any) => <LayoutGrid {...props} />,
};

const DEFAULT_CATEGORIES: CategoryDefinition[] = [
  // Income Categories
  { id: 'inc1', name: 'Salary', icon: 'Briefcase', color: '#4DABF7', type: 'income' },
  { id: 'inc2', name: 'Awards', icon: 'Trophy', color: '#FF6B6B', type: 'income' },
  { id: 'inc3', name: 'Refunds', icon: 'RotateCcw', color: '#51CF66', type: 'income' },
  { id: 'inc4', name: 'Rental', icon: 'Home', color: '#845EF7', type: 'income' },
  { id: 'inc5', name: 'Sale', icon: 'Tag', color: '#FCC419', type: 'income' },
  
  // Expense Categories
  { id: 'exp1', name: 'Food & Dining', icon: 'Utensils', color: '#20C997', budgetLimit: 5000, type: 'expense' },
  { id: 'exp2', name: 'Transportation', icon: 'Bus', color: '#4DABF7', budgetLimit: 3000, type: 'expense' },
  { id: 'exp3', name: 'Shopping', icon: 'ShoppingBag', color: '#FF922B', budgetLimit: 5000, type: 'expense' },
  { id: 'exp4', name: 'Bills & Utilities', icon: 'FileText', color: '#5C7CFA', budgetLimit: 5000, type: 'expense' },
  { id: 'exp5', name: 'Entertainment', icon: 'Film', color: '#22B8CF', budgetLimit: 2000, type: 'expense' },
  { id: 'exp6', name: 'Health', icon: 'HeartPulse', color: '#51CF66', budgetLimit: 2000, type: 'expense' },
  { id: 'exp7', name: 'Education', icon: 'GraduationCap', color: '#339AF0', budgetLimit: 5000, type: 'expense' },
  { id: 'exp8', name: 'Electronics', icon: 'Laptop', color: '#748FFC', budgetLimit: 10000, type: 'expense' },
  { id: 'exp9', name: 'Beauty & Care', icon: 'Sparkles', color: '#F06595', budgetLimit: 2000, type: 'expense' },
  { id: 'exp10', name: 'Clothing', icon: 'Shirt', color: '#845EF7', budgetLimit: 3000, type: 'expense' },
  { id: 'exp11', name: 'Accessories', icon: 'Watch', color: '#FF6B6B', budgetLimit: 1000, type: 'expense' },
  { id: 'exp12', name: 'Room Rent', icon: 'Key', color: '#FCC419', budgetLimit: 15000, type: 'expense' },
  { id: 'exp13', name: 'Snacks', icon: 'Coffee', color: '#FF8787', budgetLimit: 1000, type: 'expense' },
  { id: 'exp14', name: 'Social', icon: 'Users', color: '#BE4BDB', budgetLimit: 2000, type: 'expense' },
  { id: 'exp15', name: 'Gifts', icon: 'Gift', color: '#FFD43B', budgetLimit: 2000, type: 'expense' },
  { id: 'exp16', name: 'Travel', icon: 'Plane', color: '#4DABF7', budgetLimit: 10000, type: 'expense' },
  { id: 'exp17', name: 'Other', icon: 'MoreHorizontal', color: '#ADB5BD', budgetLimit: 1000, type: 'expense' },
];

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 'acc1', name: 'HDFC Bank', balance: 41479, icon: 'credit-card', color: '#4DABF7' },
  { id: 'acc2', name: 'Cash', balance: 52696, icon: 'banknote', color: '#51CF66' },
  { id: 'acc3', name: 'PayTM Wallet', balance: 1250, icon: 'wallet', color: '#00BAF2' },
  { id: 'acc4', name: 'Amazon Pay', balance: 850, icon: 'wallet', color: '#FF9900' },
  { id: 'acc5', name: 'Credit Card', balance: -15000, icon: 'credit-card', color: '#FF6B6B' },
];

export default function App() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [incomes, setIncomes] = React.useState<Income[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>(DEFAULT_ACCOUNTS);
  const [categories, setCategories] = React.useState<CategoryDefinition[]>(DEFAULT_CATEGORIES);
  const [showSMS, setShowSMS] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(null);
  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<'records' | 'analysis' | 'accounts' | 'categories' | 'profile'>('records');
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [showSplash, setShowSplash] = React.useState(true);
  const [showSmartAdd, setShowSmartAdd] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showSplitBills, setShowSplitBills] = React.useState(false);
  const [manageType, setManageType] = React.useState<'budget' | 'subscription' | 'category' | null>(null);

  const subscriptions: Subscription[] = [
    { id: '1', name: 'Netflix', amount: 499, category: 'Bills', nextBillingDate: Date.now() + 86400000 * 5, logo: 'https://logo.clearbit.com/netflix.com' },
    { id: '2', name: 'Spotify', amount: 119, category: 'Bills', nextBillingDate: Date.now() + 86400000 * 12, logo: 'https://logo.clearbit.com/spotify.com' },
    { id: '3', name: 'Jio Fiber', amount: 825, category: 'Recharge', nextBillingDate: Date.now() + 86400000 * 20, logo: 'https://logo.clearbit.com/jio.com' },
  ];

  // Splash screen timeout
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Load from local storage
  React.useEffect(() => {
    const savedExpenses = localStorage.getItem('fastrupi_expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    const savedCategories = localStorage.getItem('fastrupi_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
    const savedTheme = localStorage.getItem('fastrupi_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save to local storage
  React.useEffect(() => {
    localStorage.setItem('fastrupi_expenses', JSON.stringify(expenses));
  }, [expenses]);

  React.useEffect(() => {
    localStorage.setItem('fastrupi_categories', JSON.stringify(categories));
  }, [categories]);

  React.useEffect(() => {
    localStorage.setItem('fastrupi_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addExpense = (data: Partial<Expense>) => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      amount: data.amount || 0,
      category: data.category || 'Other',
      merchant: data.merchant || 'Manual Entry',
      date: Date.now(),
      source: data.source || 'manual',
      splitWith: data.splitWith || [],
      accountId: data.accountId || accounts[0]?.id || 'acc1',
    };
    setExpenses(prev => [newExpense, ...prev]);
    
    // Update account balance
    setAccounts(prev => prev.map(acc => 
      acc.id === newExpense.accountId 
        ? { ...acc, balance: acc.balance - newExpense.amount }
        : acc
    ));

    setShowSMS(false);
    setShowSmartAdd(false);
  };

  const deleteExpense = (id: string) => {
    const expenseToDelete = expenses.find(e => e.id === id);
    if (expenseToDelete) {
      setAccounts(prev => prev.map(acc => 
        acc.id === expenseToDelete.accountId 
          ? { ...acc, balance: acc.balance + expenseToDelete.amount }
          : acc
      ));
      setExpenses(prev => prev.filter(e => e.id !== id));
      setSelectedExpense(null);
    }
  };

  const addIncome = (data: Partial<Income>) => {
    const newIncome: Income = {
      id: Math.random().toString(36).substr(2, 9),
      amount: data.amount || 0,
      category: data.category || 'Awards',
      date: Date.now(),
      accountId: data.accountId || accounts[0]?.id || 'acc1',
    };
    setIncomes(prev => [newIncome, ...prev]);

    // Update account balance
    setAccounts(prev => prev.map(acc => 
      acc.id === newIncome.accountId 
        ? { ...acc, balance: acc.balance + newIncome.amount }
        : acc
    ));
  };

  const handleTransactionSave = (data: any) => {
    if (data.id) {
      // It's an update
      if (data.type === 'expense') {
        updateExpense(data);
      } else {
        // Handle income update if needed
        setIncomes(prev => prev.map(i => i.id === data.id ? data : i));
      }
    } else {
      // It's a new transaction
      if (data.type === 'expense') {
        addExpense(data);
      } else {
        addIncome(data);
      }
    }
    setEditingTransaction(null);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(e => e.id === updatedExpense.id ? updatedExpense : e));
  };

  const todayExpenses = expenses.filter(e => new Date(e.date).toDateString() === new Date().toDateString());
  const totalToday = todayExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Automated Daily Summary and Missed Expense Prompt Logic
  React.useEffect(() => {
    const checkPrompts = () => {
      const now = new Date();
      const hour = now.getHours();
      const todayStr = now.toDateString();
      
      // Auto-show summary if it's evening (after 8 PM) and not shown today
      const lastSummaryShown = localStorage.getItem('fastrupi_last_summary_shown');
      if (hour >= 20 && lastSummaryShown !== todayStr && todayExpenses.length > 0) {
        setShowSummary(true);
        localStorage.setItem('fastrupi_last_summary_shown', todayStr);
      }
    };

    // Check every minute
    const interval = setInterval(checkPrompts, 60000);
    checkPrompts(); // Initial check

    return () => clearInterval(interval);
  }, [todayExpenses]);

  const isEvening = new Date().getHours() >= 18;

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis':
        return <StatsScreen expenses={expenses} categories={categories} />;
      case 'accounts':
        return (
          <div className="max-w-md mx-auto px-6 py-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600'}`}>[ All Accounts -₹{(expenses.reduce((a,b) => a+b.amount, 0) - incomes.reduce((a,b) => a+b.amount, 0)).toLocaleString()} ]</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Expense so far</p>
                  <p className="text-lg font-bold text-rose-500">₹{expenses.reduce((a,b) => a+b.amount, 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Income so far</p>
                  <p className="text-lg font-bold text-emerald-500">₹{incomes.reduce((a,b) => a+b.amount, 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Accounts</h3>
              {accounts.map(account => (
                <div key={account.id} className="p-4 rounded-[20px] bg-[#2D2D2A] border border-[#E9D8A6]/20 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E9D8A6]">
                      {account.icon === 'credit-card' ? <CreditCard size={28} /> : account.icon === 'banknote' ? <Tag size={28} /> : <Wallet size={28} />}
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">{account.name}</p>
                      <p className="text-lg font-bold text-[#EE9B00]">Balance: -₹{account.balance.toLocaleString()}</p>
                    </div>
                  </div>
                  <button className="text-white/40 p-2"><MoreHorizontal size={24} /></button>
                </div>
              ))}
              <button className="w-full py-4 rounded-2xl border-2 border-[#E9D8A6] text-[#E9D8A6] font-bold flex items-center justify-center gap-2 mt-4">
                <Plus size={20} /> ADD NEW ACCOUNT
              </button>
            </div>
          </div>
        );
      case 'categories':
        return (
          <CategoriesScreen 
            categories={categories}
            expenses={expenses}
            incomes={incomes}
            subscriptions={subscriptions}
            onAddCategory={() => setManageType('category')}
            onEditCategory={(category) => {
              // For now, just open the category manager. 
              // In a real app, you might want to pass the specific category to edit.
              setManageType('category');
            }}
            onManageSubscriptions={() => setManageType('subscription')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen 
            onManageCategories={() => setManageType('category')}
            onManageNotifications={() => setShowNotifications(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        );
      default:
        return (
          <>
            {/* Top Header */}
            <div className={`pt-12 pb-24 px-6 rounded-b-[40px] shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#2D2D2A] shadow-black/20' : 'bg-brand-600 shadow-brand-500/20'}`}>
              <div className="max-w-md mx-auto space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button className={isDarkMode ? 'text-[#E9D8A6]' : 'text-white'}>
                      <LayoutGrid size={24} />
                    </button>
                    <h2 className={`text-2xl font-serif italic ${isDarkMode ? 'text-[#E9D8A6]' : 'text-white'}`}>FastRUPI</h2>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowFilterModal(true)}
                      className={isDarkMode ? 'text-[#E9D8A6]' : 'text-white'}
                    >
                      <Filter size={24} />
                    </button>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-[#E9D8A6]' : 'text-white'}`}>[ All Accounts -₹{(expenses.reduce((a,b) => a+b.amount, 0) - incomes.reduce((a,b) => a+b.amount, 0)).toLocaleString()} ]</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-white/80'}`}>Expense so far</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-[#EE9B00]' : 'text-white'}`}>₹{expenses.reduce((a,b) => a+b.amount, 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-white/80'}`}>Income so far</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-[#94D2BD]' : 'text-white'}`}>₹{incomes.reduce((a,b) => a+b.amount, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <main className="max-w-md mx-auto px-6 -mt-16 space-y-8">
              {/* Missed Expense Prompt - Show if no expenses and it's evening */}
              {totalToday === 0 && isEvening && (
                <MissedExpensePrompt onAdd={() => {
                  setEditingTransaction(null);
                  setShowAddTransaction(true);
                }} />
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowSplitBills(true)}
                  className={`p-4 rounded-[24px] border flex items-center gap-3 transition-all ${
                    isDarkMode 
                      ? 'bg-[#2D2D2A] border-white/5' 
                      : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#E9D8A6]/10 text-[#E9D8A6]' : 'bg-brand-50 text-brand-500'}`}>
                    <Users size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Split Bills</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Splitwise</p>
                  </div>
                </button>
                <button 
                  onClick={() => setManageType('subscription')}
                  className={`p-4 rounded-[24px] border flex items-center gap-3 transition-all ${
                    isDarkMode 
                      ? 'bg-[#2D2D2A] border-white/5' 
                      : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#E9D8A6]/10 text-[#E9D8A6]' : 'bg-brand-50 text-brand-500'}`}>
                    <Repeat size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recurring</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Manage Subs</p>
                  </div>
                </button>
              </div>

              {/* Quick Add Section */}
              <section className="space-y-4">
                <QuickAdd 
                  onAdd={addExpense} 
                  onSimulateSMS={() => setShowSMS(true)} 
                  onMoreDetails={() => {
                    setEditingTransaction(null);
                    setShowAddTransaction(true);
                  }}
                  categories={categories}
                />
              </section>

              {/* Recent Activity Section */}
              <section>
                <ExpenseList 
                  expenses={filteredExpenses} 
                  categories={categories} 
                  onExpenseClick={setSelectedExpense}
                />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-28 ${isDarkMode ? 'bg-[#2D2D2A] text-white' : 'bg-white text-slate-900'}`}>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
        
        {showSMS && (
          <SMSNotification 
            onConfirm={(data) => addExpense({ ...data, source: 'sms' })}
            onDismiss={() => setShowSMS(false)}
          />
        )}

        {showSmartAdd && (
          <SmartAdd 
            onAdd={addExpense}
            onClose={() => setShowSmartAdd(false)}
            categories={categories}
          />
        )}

        {showNotifications && (
          <NotificationCenter 
            onClose={() => setShowNotifications(false)}
          />
        )}

        {showFilterModal && (
          <FilterModal 
            selectedCategory={selectedCategory as any}
            onSelect={setSelectedCategory as any}
            onClose={() => setShowFilterModal(false)}
            categories={categories}
          />
        )}

        {showSplitBills && (
          <SplitBills
            expenses={expenses}
            onUpdateExpense={updateExpense}
            onClose={() => setShowSplitBills(false)}
          />
        )}

        {manageType === 'category' && (
          <CategoryManager
            categories={categories}
            onUpdate={setCategories}
            onClose={() => setManageType(null)}
          />
        )}

        {manageType === 'subscription' && (
          <ManageModal
            title="Manage Subscriptions"
            items={subscriptions}
            onClose={() => setManageType(null)}
          />
        )}
        
        {showSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm">
              <DailySummary 
                expenses={todayExpenses} 
                onClose={() => setShowSummary(false)} 
              />
            </div>
          </div>
        )}

        {selectedExpense && (
          <ExpenseDetailModal 
            expense={selectedExpense}
            category={categories.find(c => c.name === selectedExpense.category)}
            account={accounts.find(a => a.id === selectedExpense.accountId)}
            onClose={() => setSelectedExpense(null)}
            onDelete={deleteExpense}
            onEdit={(expense) => {
              setEditingTransaction(expense);
              setSelectedExpense(null);
              setShowAddTransaction(true);
            }}
          />
        )}

        <AddTransactionModal 
          isOpen={showAddTransaction}
          onClose={() => {
            setShowAddTransaction(false);
            setEditingTransaction(null);
          }}
          onSave={handleTransactionSave}
          categories={categories}
          accounts={accounts}
          editingTransaction={editingTransaction}
        />
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t px-4 py-4 flex justify-between items-center z-40 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#2D2D2A]/80 border-white/10' 
          : 'bg-white/80 border-slate-100'
      }`}>
        <button onClick={() => setActiveTab('records')} className={`flex flex-col items-center gap-1 ${activeTab === 'records' ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
          <FileText size={20} />
          <span className="text-[9px] font-bold uppercase">Records</span>
        </button>
        <button onClick={() => setActiveTab('analysis')} className={`flex flex-col items-center gap-1 ${activeTab === 'analysis' ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
          <PieIcon size={20} />
          <span className="text-[9px] font-bold uppercase">Analysis</span>
        </button>
        <button onClick={() => setActiveTab('categories')} className={`flex flex-col items-center gap-1 ${activeTab === 'categories' ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
          <LayoutGrid size={20} />
          <span className="text-[9px] font-bold uppercase">Categories</span>
        </button>
        <button onClick={() => setActiveTab('accounts')} className={`flex flex-col items-center gap-1 ${activeTab === 'accounts' ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
          <CreditCard size={20} />
          <span className="text-[9px] font-bold uppercase">Accounts</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? (isDarkMode ? 'text-[#E9D8A6]' : 'text-brand-600') : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
          <User size={20} />
          <span className="text-[9px] font-bold uppercase">Profile</span>
        </button>
        
        <div className="fixed bottom-20 right-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setEditingTransaction(null);
              setShowAddTransaction(true);
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
              isDarkMode 
                ? 'bg-[#E9D8A6] text-[#2D2D2A] shadow-black/40' 
                : 'bg-brand-600 text-white shadow-brand-500/40'
            }`}
          >
            <Plus size={28} />
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
