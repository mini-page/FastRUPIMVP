export type CategoryType = 'income' | 'expense';

export interface CategoryDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  budgetLimit?: number;
  type: CategoryType;
}

export type Category = string;

export interface SplitInfo {
  person: string;
  amount: number;
  isPaid: boolean;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  icon: 'credit-card' | 'banknote' | 'wallet';
  color: string;
}

export interface Income {
  id: string;
  amount: number;
  category: string;
  date: number;
  accountId: string;
  note?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  merchant: string;
  date: number;
  source: 'manual' | 'sms' | 'voice';
  isRecurring?: boolean;
  splitWith?: SplitInfo[];
  accountId: string;
  note?: string;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  category: Category;
  nextBillingDate: number;
  logo?: string;
}

export const MERCHANT_LOGOS: Record<string, string> = {
  'swiggy': 'https://logo.clearbit.com/swiggy.com',
  'zomato': 'https://logo.clearbit.com/zomato.com',
  'uber': 'https://logo.clearbit.com/uber.com',
  'ola': 'https://logo.clearbit.com/olacabs.com',
  'amazon': 'https://logo.clearbit.com/amazon.in',
  'flipkart': 'https://logo.clearbit.com/flipkart.com',
  'netflix': 'https://logo.clearbit.com/netflix.com',
  'spotify': 'https://logo.clearbit.com/spotify.com',
  'jio': 'https://logo.clearbit.com/jio.com',
  'airtel': 'https://logo.clearbit.com/airtel.in',
};

export const CATEGORY_MAP: Record<string, Category> = {
  'swiggy': 'Food',
  'zomato': 'Food',
  'uber': 'Travel',
  'ola': 'Travel',
  'jio': 'Recharge',
  'airtel': 'Recharge',
  'amazon': 'Shopping',
  'flipkart': 'Shopping',
  'blinkit': 'Food',
  'zepto': 'Food',
  'bigbasket': 'Food',
  'dunzo': 'Travel',
  'rapido': 'Travel',
  'irctc': 'Travel',
  'makemytrip': 'Travel',
  'myntra': 'Shopping',
  'ajio': 'Shopping',
  'nykaa': 'Shopping',
};

export const QUICK_AMOUNTS = [50, 100, 200, 500];
export const CATEGORIES: Category[] = ['Food', 'Travel', 'Shopping', 'Recharge', 'Bills', 'Rent', 'Other'];
