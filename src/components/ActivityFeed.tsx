import { motion } from 'framer-motion';
import { UserPlus, TrendingUp, UserX, CreditCard, HelpCircle, Activity } from 'lucide-react';
import { ActivityItem } from '../types';
import { activities } from '../data/mockData';

const typeConfig: Record<ActivityItem['type'], { icon: React.ReactNode; color: string }> = {
  signup: { icon: <UserPlus size={14} />, color: 'bg-emerald-100 text-emerald-700' },
  upgrade: { icon: <TrendingUp size={14} />, color: 'bg-violet-100 text-violet-700' },
  cancel: { icon: <UserX size={14} />, color: 'bg-rose-100 text-rose-700' },
  payment: { icon: <CreditCard size={14} />, color: 'bg-blue-100 text-blue-700' },
  support: { icon: <HelpCircle size={14} />, color: 'bg-amber-100 text-amber-700' },
};

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200"
    >
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <Activity size={16} className="text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
      </div>

      <div className="divide-y divide-slate-50">
        {activities.map((item, i) => {
          const config = typeConfig[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">{item.user}</span>
                  {' '}{item.action}{' '}
                  <span className="font-medium text-slate-900">{item.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
