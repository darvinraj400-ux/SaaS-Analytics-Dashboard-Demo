export type TimeRange = '7d' | '30d' | '90d' | '12m';
export type NavPage = 'overview' | 'customers' | 'notifications' | 'activity' | 'settings' | 'profile';
export type CustomerStatus = 'active' | 'churned' | 'trial' | 'paused';
export type SortDirection = 'asc' | 'desc';

export interface MetricCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  mrr: number;
}

export interface UserDataPoint {
  date: string;
  activeUsers: number;
  newUsers: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  mrr: number;
  status: CustomerStatus;
  joined: string;
  lastActive: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success' | 'warning';
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  target: string;
  time: string;
  type: 'signup' | 'upgrade' | 'cancel' | 'payment' | 'support';
}
