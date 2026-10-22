import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Bell, Activity } from 'lucide-react';
import { NavPage } from '../types';

interface MobileNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  unreadCount: number;
}

const items: { id: NavPage; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
  { id: 'notifications', label: 'Alerts', icon: <Bell size={20} /> },
  { id: 'activity', label: 'Activity', icon: <Activity size={20} /> },
];

export default function MobileNav({ currentPage, onNavigate, unreadCount }: MobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 lg:hidden safe-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-xl transition-colors relative
                ${isActive ? 'text-violet-700' : 'text-slate-400'}`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute inset-0 bg-violet-50 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full z-20" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
