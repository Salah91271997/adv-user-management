import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, tap, finalize, catchError } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { DashboardErrorService } from './dashboard-error.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import {
  DashboardStats,
  UserActivityData,
  ActivityDistribution,
  RecentActivity,
} from '../models/dashbaord.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  // State Management
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  private userActivitySubject = new BehaviorSubject<UserActivityData | null>(
    null
  );
  private activityDistributionSubject =
    new BehaviorSubject<ActivityDistribution | null>(null);
  private recentActivitiesSubject = new BehaviorSubject<RecentActivity[]>([]);
  private selectedPeriodSubject = new BehaviorSubject<number>(7);

  // Loading States
  private statsLoadingSubject = new BehaviorSubject<boolean>(false);
  private chartLoadingSubject = new BehaviorSubject<boolean>(false);
  private activitiesLoadingSubject = new BehaviorSubject<boolean>(false);

  // Error States
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Observables
  stats$ = this.statsSubject.asObservable();
  userActivity$ = this.userActivitySubject.asObservable();
  activityDistribution$ = this.activityDistributionSubject.asObservable();
  recentActivities$ = this.recentActivitiesSubject.asObservable();
  selectedPeriod$ = this.selectedPeriodSubject.asObservable();

  statsLoading$ = this.statsLoadingSubject.asObservable();
  chartLoading$ = this.chartLoadingSubject.asObservable();
  activitiesLoading$ = this.activitiesLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private dashboardService: DashboardService,
    private errorService: DashboardErrorService,
    private loaderService: LoaderService
  ) {}

  loadDashboardData(): void {
    this.errorSubject.next(null);
    this.loaderService.show();

    forkJoin({
      stats: this.loadStats(),
      activity: this.loadUserActivity(),
      distribution: this.loadActivityDistribution(),
      recent: this.loadRecentActivities(),
    })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (data) => {},
        error: (error) => this.handleError(error),
      });
  }

  private loadStats(): Observable<DashboardStats> {
    this.statsLoadingSubject.next(true);
    return this.dashboardService.getStats().pipe(
      tap((stats) => this.statsSubject.next(stats)),
      finalize(() => this.statsLoadingSubject.next(false))
    );
  }

  private loadUserActivity(days: number = 7): Observable<UserActivityData> {
    this.chartLoadingSubject.next(true);
    return this.dashboardService.getUserActivity(days).pipe(
      tap((data) => {
        this.userActivitySubject.next(data);
      }),
      finalize(() => this.chartLoadingSubject.next(false))
    );
  }

  private loadActivityDistribution(): Observable<ActivityDistribution> {
    return this.dashboardService.getActivityDistribution().pipe(
      tap((data) => {
        this.activityDistributionSubject.next(data);
        console.log(data);
      })
    );
  }

  private loadRecentActivities(): Observable<RecentActivity[]> {
    this.activitiesLoadingSubject.next(true);
    return this.dashboardService.getRecentActivities().pipe(
      tap((activities) => this.recentActivitiesSubject.next(activities)),
      finalize(() => this.activitiesLoadingSubject.next(false))
    );
  }

  updatePeriod(days: number): void {
    this.selectedPeriodSubject.next(days);
    this.loadUserActivity(days).subscribe({
      error: (error) => this.handleError(error),
    });
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  private handleError(error: any): void {
    this.errorService.handleError(error, 'Dashboard');
    this.errorSubject.next('Failed to load dashboard data');
  }
}
