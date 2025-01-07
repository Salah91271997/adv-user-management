import { Injectable } from '@angular/core';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import {
  ActivityDistribution,
  DashboardStats,
  RecentActivity,
  UserActivityData,
} from '../models/dashbaord.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardMockService {
  private generateRandomData(
    length: number,
    min: number,
    max: number
  ): number[] {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  }

  private generateDates(days: number): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      );
    }

    return dates;
  }

  getStats(): DashboardStats {
    return {
      totalUsers: 1245,
      activeUsers: 956,
      newUsers: 128,
      activePercentage: 76.8,
    };
  }

  getUserActivity(days: number): UserActivityData {
    const labels = this.generateDates(days);

    return {
      labels,
      datasets: {
        activeUsers: this.generateRandomData(days, 800, 1000),
        newUsers: this.generateRandomData(days, 10, 50),
      },
    };
  }

  getActivityDistribution(): ActivityDistribution {
    return {
      labels: [
        'Login',
        'Profile Update',
        'Settings Change',
        'Password Reset',
        'Logout',
      ],
      values: this.generateRandomData(5, 10, 100),
    };
  }

  getRecentActivities(): RecentActivity[] {
    const activities: RecentActivity[] = [
      {
        id: 1,
        userId: 1,
        userName: 'John Doe',
        action: 'Login',
        timestamp: new Date().toISOString(),
        status: 'success',
      },
      {
        id: 2,
        userId: 2,
        userName: 'Jane Smith',
        action: 'Profile Update',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success',
      },
      {
        id: 3,
        userId: 3,
        userName: 'Mike Johnson',
        action: 'Password Change',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'warning',
      },
      // Add more mock activities as needed
    ];

    return activities;
  }
}
