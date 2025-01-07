export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  activePercentage: number;
}

export interface ChartPeriod {
  label: string;
  value: number;
  description: string;
}

export interface UserActivityData {
  labels: string[];
  datasets: {
    activeUsers: number[];
    newUsers: number[];
  };
}

export interface ActivityDistribution {
  labels: string[];
  values: number[];
}

export interface RecentActivity {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  details?: string;
}
