import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Expense } from '../types';

interface SummaryChartProps {
  expenses: Expense[];
}

const COLORS = {
  Food: '#FF6321', // orange
  Travel: '#4318FF', // blue
  Rent: '#707EAE', // purple-ish
  Recharge: '#05CD99', // green
  Shopping: '#EE5D50', // pink
  Bills: '#6AD2FF', // cyan
  Other: '#A3AED0', // gray
};

export const SummaryChart: React.FC<SummaryChartProps> = ({ expenses }) => {
  const data = React.useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (data.length === 0) return null;

  return (
    <div className="relative h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#CBD5E0'} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Total</p>
        <p className="text-[#E9D8A6] text-2xl font-bold">₹{total}</p>
      </div>
    </div>
  );
};
