import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, UserX, Target } from 'lucide-react';
import { TimeRange } from '../types';
import { getMetricsForRange } from '../data/mockData';

interface MetricsCardsProps {
  timeRange: TimeRange;
}

export default function MetricsCards({ timeRange }: MetricsCardsProps) {
  const metrics = getMetricsForRange(timeRange);

  const cards = [
    { label: metrics.revenue.label, value: metrics.revenue.value, change: metrics.revenue.change, icon: <DollarSign size={18} />, color: 'violet' },
    { label: metrics.activeUsers.label, value: metrics.activeUsers.value, change: metrics.activeUsers.change, icon: <Users size={18} />, color: 'emerald' },
    { label: metrics.churnRate.label, value: metrics.churnRate.value, change: metrics.churnRate.change, icon: <UserX size={18} />, color: 'rose' },
    { label: metrics.conversion.label, value: metrics.conversion.value, change: metrics.conversion.change, icon: <Target size={18} />, color: 'amber' },
  ];

  const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
      {cards.map((card, index) => {
        const colors = colorMap[card.color];
        const isPositive = card.change > 0;
        const isChurn = card.label.includes('Churn');
        const changeIsGood = isChurn ? !isPositive : isPositive;

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl border border-slate-200 p-4 lg:p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <span className={colors.icon}>{card.icon}</span>
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${changeIsGood ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{Math.abs(card.change)}%</span>
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
