import { Customer, Notification, ActivityItem, RevenueDataPoint, UserDataPoint, TimeRange } from '../types';

const firstNames = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Quinn', 'Avery', 'Sage', 'Drew', 'Blake', 'Cameron', 'Dakota', 'Emerson', 'Finley', 'Harper', 'Kai', 'Logan', 'Peyton', 'Reese'];
const lastNames = ['Chen', 'Patel', 'Kim', 'Santos', 'Mueller', 'Nakamura', 'Okafor', 'Johansson', 'Rivera', 'Singh', 'Andersen', 'Dubois', 'Kowalski', 'Tanaka', 'Volkov', 'Martinez', 'Larsson', 'Nguyen', 'Williams', 'Brown'];
const companies = ['TechFlow Inc', 'DataSync Labs', 'CloudBridge', 'Nexus Digital', 'Vertex Solutions', 'Pulse Systems', 'Orbit Analytics', 'Summit Software', 'Cascade Tech', 'Horizon AI', 'Prism Data', 'Atlas Corp', 'Zenith Labs', 'Forge Digital', 'Quantum Works', 'Stellar Ops', 'Nova Platform', 'Cipher Security', 'Ember Cloud', 'Vantage IO'];
const plans = ['Starter', 'Professional', 'Enterprise'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCustomers(): Customer[] {
  const statuses: Customer['status'][] = ['active', 'active', 'active', 'active', 'trial', 'trial', 'churned', 'paused'];
  return Array.from({ length: 48 }, (_, i) => {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const status = randomFrom(statuses);
    const plan = status === 'trial' ? 'Starter' : randomFrom(plans);
    const mrr = plan === 'Starter' ? 29 : plan === 'Professional' ? 79 : 199;
    const daysAgo = Math.floor(Math.random() * 365);
    const joined = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];
    const lastActiveDays = status === 'churned' ? Math.floor(Math.random() * 60) + 30 : Math.floor(Math.random() * 7);
    const lastActive = new Date(Date.now() - lastActiveDays * 86400000).toISOString().split('T')[0];
    return {
      id: `CUS-${String(i + 1).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[i % companies.length].toLowerCase().replace(/\s+/g, '')}.com`,
      company: companies[i % companies.length],
      plan,
      mrr: status === 'churned' ? 0 : mrr,
      status,
      joined,
      lastActive,
    };
  });
}

export const customers: Customer[] = generateCustomers();

export const notifications: Notification[] = [
  { id: 'n1', title: 'Payment Failed', message: 'Invoice #4821 for TechFlow Inc failed processing.', time: '2m ago', read: false, type: 'alert' },
  { id: 'n2', title: 'New Enterprise Signup', message: 'Vertex Solutions upgraded to Enterprise plan.', time: '15m ago', read: false, type: 'success' },
  { id: 'n3', title: 'Churn Alert', message: '3 accounts inactive for 30+ days this week.', time: '1h ago', read: false, type: 'warning' },
  { id: 'n4', title: 'Feature Release', message: 'v2.4.0 deployed with new analytics module.', time: '3h ago', read: true, type: 'info' },
  { id: 'n5', title: 'Support Ticket', message: 'High priority ticket from Cascade Tech.', time: '4h ago', read: true, type: 'alert' },
  { id: 'n6', title: 'Milestone Reached', message: 'Monthly recurring revenue exceeded $150K.', time: '6h ago', read: true, type: 'success' },
  { id: 'n7', title: 'API Rate Limit', message: 'DataSync Labs approaching rate limit threshold.', time: '8h ago', read: true, type: 'warning' },
  { id: 'n8', title: 'Scheduled Maintenance', message: 'Database maintenance scheduled for Sunday 2AM UTC.', time: '1d ago', read: true, type: 'info' },
];

export const activities: ActivityItem[] = [
  { id: 'a1', action: 'Signed up', user: 'Sarah Chen', target: 'Starter plan', time: '2 min ago', type: 'signup' },
  { id: 'a2', action: 'Upgraded to', user: 'Marcus Patel', target: 'Enterprise', time: '18 min ago', type: 'upgrade' },
  { id: 'a3', action: 'Payment received', user: 'Nexus Digital', target: '$199/mo', time: '45 min ago', type: 'payment' },
  { id: 'a4', action: 'Cancelled subscription', user: 'Jordan Kim', target: 'Professional', time: '1h ago', type: 'cancel' },
  { id: 'a5', action: 'Support ticket opened', user: 'Atlas Corp', target: 'Billing inquiry', time: '2h ago', type: 'support' },
  { id: 'a6', action: 'Signed up', user: 'Taylor Santos', target: 'Trial', time: '3h ago', type: 'signup' },
  { id: 'a7', action: 'Payment received', user: 'Prism Data', target: '$79/mo', time: '4h ago', type: 'payment' },
  { id: 'a8', action: 'Upgraded to', user: 'Forge Digital', target: 'Professional', time: '5h ago', type: 'upgrade' },
  { id: 'a9', action: 'Support ticket resolved', user: 'Summit Software', target: 'API integration', time: '6h ago', type: 'support' },
  { id: 'a10', action: 'Signed up', user: 'Casey Mueller', target: 'Professional', time: '8h ago', type: 'signup' },
];

function generateRevenueData(range: TimeRange): RevenueDataPoint[] {
  const points: RevenueDataPoint[] = [];
  let count = 7;
  let dateFormat: (d: Date) => string = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  switch (range) {
    case '7d':
      count = 7;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '30d':
      count = 30;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '90d':
      count = 12;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '12m':
      count = 12;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      break;
  }

  const baseRevenue = 142000;
  const baseMrr = 14800;

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    if (range === '7d' || range === '30d') {
      date.setDate(date.getDate() - i);
    } else if (range === '90d') {
      date.setDate(date.getDate() - i * 7);
    } else {
      date.setMonth(date.getMonth() - i);
    }

    const growthFactor = 1 + (count - i) * 0.02;
    const variance = 0.9 + Math.random() * 0.2;

    points.push({
      date: dateFormat(date),
      revenue: Math.round(baseRevenue * growthFactor * variance / (range === '7d' || range === '30d' ? 30 : 1)),
      mrr: Math.round(baseMrr * growthFactor * variance),
    });
  }

  return points;
}

function generateUserData(range: TimeRange): UserDataPoint[] {
  const points: UserDataPoint[] = [];
  let count = 7;
  let dateFormat: (d: Date) => string = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  switch (range) {
    case '7d':
      count = 7;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '30d':
      count = 30;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '90d':
      count = 12;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '12m':
      count = 12;
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      break;
  }

  const baseActive = 12400;
  const baseNew = 340;

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    if (range === '7d' || range === '30d') {
      date.setDate(date.getDate() - i);
    } else if (range === '90d') {
      date.setDate(date.getDate() - i * 7);
    } else {
      date.setMonth(date.getMonth() - i);
    }

    const growthFactor = 1 + (count - i) * 0.015;
    const variance = 0.85 + Math.random() * 0.3;

    points.push({
      date: dateFormat(date),
      activeUsers: Math.round(baseActive * growthFactor * variance),
      newUsers: Math.round(baseNew * variance),
    });
  }

  return points;
}

export function getRevenueData(range: TimeRange): RevenueDataPoint[] {
  return generateRevenueData(range);
}

export function getUserData(range: TimeRange): UserDataPoint[] {
  return generateUserData(range);
}

export function getMetricsForRange(range: TimeRange) {
  const multipliers: Record<TimeRange, number> = { '7d': 0.25, '30d': 1, '90d': 3, '12m': 12 };
  const m = multipliers[range];

  return {
    revenue: { value: `$${(148.2 * m).toFixed(1)}K`, change: 12.4, label: 'Monthly Recurring Revenue' },
    activeUsers: { value: '12,847', change: 8.2, label: 'Active Users' },
    churnRate: { value: '2.1%', change: -0.3, label: 'Monthly Churn Rate' },
    conversion: { value: '4.7%', change: 1.1, label: 'Trial to Paid' },
  };
}
