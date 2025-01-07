@Injectable({
  providedIn: 'root',
})
export class DashboardErrorService {
  constructor(
    private toastService: ToastService,
    private loggerService: LoggerService
  ) {}

  handleError(error: Error, context: string): void {
    const errorMessage = `Dashboard Error (${context}): ${error.message}`;
    this.loggerService.error(errorMessage, error);
    this.toastService.showError(
      'An error occurred while loading dashboard data. Please try again.'
    );
  }
}

//services/dashboard-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardState } from '../interfaces/dashboard-state.interface';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ToastService } from '../../../core/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private initialState: DashboardState = {
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      activePercentage: 0,
    },
    userActivity: {
      labels: [],
      datasets: {
        activeUsers: [],
        newUsers: [],
      },
    },
    activityDistribution: {
      labels: [],
      values: [],
    },
    recentActivities: [],
    selectedPeriod: DASHBOARD_CONSTANTS.CHART_PERIODS[0].value,
    isLoading: false,
    error: null,
  };

  private state = new BehaviorSubject<DashboardState>(this.initialState);
  state$ = this.state.asObservable();

  updateState(newState: Partial<DashboardState>): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
  }

  setLoading(loading: boolean): void {
    this.updateState({ isLoading: loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  resetState(): void {
    this.state.next(this.initialState);
  }
}
