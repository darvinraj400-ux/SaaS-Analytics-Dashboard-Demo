import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MetricsCards from './components/MetricsCards';
import Charts from './components/Charts';
import CustomerTable from './components/CustomerTable';
import NotificationsPanel from './components/NotificationsPanel';
import ActivityFeed from './components/ActivityFeed';
import Settings from './components/Settings';
import Profile from './components/Profile';
import MobileNav from './components/MobileNav';
import { NavPage, TimeRange } from './types';
import { notifications } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(notifications);

  const unreadCount = notificationData.filter(n => !n.read).length;

  const handleMarkAllRead = useCallback(() => {
    setNotificationData(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const handleNavigate = useCallback((page: NavPage) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 lg:space-y-5"
          >
            <MetricsCards timeRange={timeRange} />
            <Charts timeRange={timeRange} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
              <ActivityFeed />
              <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Avg. Revenue per User', value: '$11.52', trend: '+3.2%' },
                    { label: 'Trial Conversion Rate', value: '4.7%', trend: '+1.1%' },
                    { label: 'Support Tickets (7d)', value: '23', trend: '-12%' },
                    { label: 'Net Revenue Retention', value: '112%', trend: '+2.4%' },
                    { label: 'Active Paying Customers', value: '1,847', trend: '+5.8%' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-1.5">
                      <span className="text-sm text-slate-600">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                        <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'customers':
        return (
          <motion.div
            key="customers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CustomerTable />
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            key="notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NotificationsPanel onMarkAllRead={handleMarkAllRead} />
          </motion.div>
        );

      case 'activity':
        return (
          <motion.div
            key="activity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ActivityFeed />
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Settings />
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Profile />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          currentPage={currentPage}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onMenuToggle={() => setSidebarOpen(true)}
          onNotificationClick={() => setCurrentPage('notifications')}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 overflow-x-hidden">
          {/* Demo data banner */}
          <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-medium">Demo data</span> — All metrics and customer data shown are fictional and for demonstration purposes only.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        unreadCount={unreadCount}
      />
    </div>
  );
}

export default App;
