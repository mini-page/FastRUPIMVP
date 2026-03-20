import { Category, CATEGORY_MAP } from '../types';

export const parseSMS = (text: string): { amount: number; merchant: string; category: Category } | null => {
  // Common Indian Bank SMS patterns
  // "₹250 debited via UPI to Swiggy"
  // "Paid ₹120 at Zomato"
  // "Your a/c x1234 debited by Rs.500.00 on 18-Mar-26. Info: UPI/P2M/MERCHANT NAME"
  
  const amountRegex = /(?:₹|Rs\.?|INR)\s?(\d+(?:\.\d{1,2})?)/i;
  const amountMatch = text.match(amountRegex);
  
  if (!amountMatch) return null;
  
  const amount = parseFloat(amountMatch[1]);
  
  // Extract merchant - look for "to", "at", "via", or "Info:"
  let merchant = 'Unknown';
  const merchantPatterns = [
    /(?:to|at|via)\s+([a-z0-9\s]+?)(?:\s+on|\s+via|\s+for|\.|$)/i,
    /Info:\s?([a-z0-9\s\/]+)/i
  ];
  
  for (const pattern of merchantPatterns) {
    const match = text.match(pattern);
    if (match) {
      merchant = match[1].trim();
      break;
    }
  }

  // Auto category mapping
  let category: Category = 'Other';
  const lowerMerchant = merchant.toLowerCase();
  
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (lowerMerchant.includes(key)) {
      category = cat;
      break;
    }
  }

  return { amount, merchant, category };
};

export const parseVoice = (text: string): { amount: number; category: Category } | null => {
  // "200 food"
  // "500 petrol"
  const parts = text.toLowerCase().split(' ');
  const amount = parseFloat(parts.find(p => !isNaN(parseFloat(p))) || '0');
  
  if (amount === 0) return null;
  
  let category: Category = 'Other';
  if (parts.includes('food') || parts.includes('khana')) category = 'Food';
  else if (parts.includes('travel') || parts.includes('petrol') || parts.includes('auto')) category = 'Travel';
  else if (parts.includes('recharge') || parts.includes('phone')) category = 'Recharge';
  else if (parts.includes('shopping')) category = 'Shopping';
  else if (parts.includes('rent')) category = 'Rent';
  else if (parts.includes('bill')) category = 'Bills';

  return { amount, category };
};
