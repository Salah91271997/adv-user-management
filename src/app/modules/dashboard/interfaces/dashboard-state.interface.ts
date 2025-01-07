import {
  ActivityDistribution,
  DashboardStats,
  RecentActivity,
  UserActivityData,
} from '../models/dashbaord.model';

export interface DashboardState {
  stats: DashboardStats;
  userActivity: UserActivityData;
  activityDistribution: ActivityDistribution;
  recentActivities: RecentActivity[];
  selectedPeriod: number;
  isLoading: boolean;
  error: string | null;
}

export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}
