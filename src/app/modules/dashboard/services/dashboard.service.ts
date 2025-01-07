import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DateRangeFilter } from '../interfaces/dashboard-state.interface';
import { DashboardMockService } from './dashboard-mock.service';
import {
  DashboardStats,
  UserActivityData,
  ActivityDistribution,
  RecentActivity,
} from '../models/dashbaord.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly SIMULATED_DELAY = 500;

  constructor(private mockService: DashboardMockService) {}

  getStats(): Observable<DashboardStats> {
    try {
      const stats = this.mockService.getStats();
      return of(stats).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => new Error('Failed to fetch dashboard stats'));
    }
  }

  getUserActivity(days: number): Observable<UserActivityData> {
    try {
      const data = this.mockService.getUserActivity(days);
      return of(data).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => new Error('Failed to fetch user activity data'));
    }
  }

  getActivityDistribution(): Observable<ActivityDistribution> {
    try {
      const data = this.mockService.getActivityDistribution();

      return of(data).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(
        () => new Error('Failed to fetch activity distribution')
      );
    }
  }

  getRecentActivities(): Observable<RecentActivity[]> {
    try {
      const activities = this.mockService.getRecentActivities();
      return of(activities).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => new Error('Failed to fetch recent activities'));
    }
  }

  getDataByDateRange(dateRange: DateRangeFilter): Observable<UserActivityData> {
    try {
      // Calculate days between dates
      const days = Math.ceil(
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const data = this.mockService.getUserActivity(days);
      return of(data).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => new Error('Failed to fetch data for date range'));
    }
  }
}
