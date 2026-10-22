import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { Notification } from '../types';
import { notifications } from '../data/mockData';

interface NotificationsPanelProps {
  onMarkAllRead: () => void;
}

const typeIcons: Record<Notification['type'], React.ReactNode> = {
  alert: <AlertCircle size={16} className="text-rose-500" />,
  info: <Info size={16} className="text-blue-500" />,
  success: <CheckCircle size={16} className="text-emerald-500" />,
  warning: <AlertTriangle size={16} className="text-amber-500" />,
};

export default function NotificationsPanel({ onMarkAllRead }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200"
    >
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-violet-100 text-violet-700 text-xs font-medium px-1.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-violet-600 hover:text-violet-700 font-medium"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-50">
        {notifications.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Bell size={24} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No notifications yet.</p>
          </div>
        ) : (
          notifications.map((notification, i) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className={`px-4 py-3 flex gap-3 hover:bg-slate-50/50 transition-colors ${!notification.read ? 'bg-violet-50/30' : ''}`}
            >
              <div className="mt-0.5 shrink-0">{typeIcons[notification.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-slate-400 shrink-0">{notification.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0" />
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
