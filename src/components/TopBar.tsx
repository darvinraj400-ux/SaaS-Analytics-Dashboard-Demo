import { motion } from 'framer-motion';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { TimeRange, NavPage } from '../types';
import { useState, useRef, useEffect } from 'react';

interface TopBarProps {
  currentPage: NavPage;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onMenuToggle: () => void;
  onNotificationClick: () => void;
  unreadCount: number;
}

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '12m', label: '12 Months' },
];

const pageTitles: Record<NavPage, string> = {
  overview: 'Overview',
  customers: 'Customers',
  notifications: 'Notifications',
  activity: 'Activity',
  settings: 'Settings',
  profile: 'Profile',
};

export default function TopBar({ currentPage, timeRange, onTimeRangeChange, onMenuToggle, onNotificationClick, unreadCount }: TopBarProps) {
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowRangeDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <h1 className="text-base lg:text-lg font-semibold text-slate-900">{pageTitles[currentPage]}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200
          ${searchFocused ? 'border-violet-300 ring-2 ring-violet-100 w-56' : 'border-slate-200 w-44'}`}>
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search dashboard"
          />
        </div>

        {/* Time range selector */}
        {currentPage === 'overview' && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowRangeDropdown(!showRangeDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              aria-haspopup="listbox"
              aria-expanded={showRangeDropdown}
            >
              <span>{timeRanges.find(r => r.value === timeRange)?.label}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {showRangeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50"
                role="listbox"
              >
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      onTimeRangeChange(range.value);
                      setShowRangeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors
                      ${range.value === timeRange ? 'bg-violet-50 text-violet-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="option"
                    aria-selected={range.value === timeRange}
                  >
                    {range.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Notifications bell */}
        <button
          onClick={onNotificationClick}
          className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <Bell size={18} className="text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-violet-600 rounded-full" />
          )}
        </button>
      </div>
    </motion.header>
  );
}
