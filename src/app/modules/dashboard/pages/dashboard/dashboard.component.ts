import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from '../../services/dashboard.facade.service';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboard.constants';
import { map, Subject, takeUntil } from 'rxjs';
interface PeriodOption {
  label: string;
  value: number;
  description: string;
}
type TagSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'contrast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // periods = DASHBOARD_CONSTANTS.CHART_PERIODS;
  // selectedPeriod: (typeof DASHBOARD_CONSTANTS.CHART_PERIODS)[number] =
  //   this.periods[0];
  private destroy$ = new Subject<void>();
  data$: any;
  data: any;
  periods: PeriodOption[] = [
    {
      label: 'Last 7 days',
      value: 7,
      description: 'Show data for the past week',
    },
    {
      label: 'Last 30 days',
      value: 30,
      description: 'Show data for the past month',
    },
    {
      label: 'Last 90 days',
      value: 90,
      description: 'Show data for the past quarter',
    },
  ];
  selectedPeriod: PeriodOption = this.periods[0];
  constructor(public facade: DashboardFacade) {}

  ngOnInit(): void {
    this.facade.loadDashboardData();
    this.data$ = this.facade.userActivity$.pipe(
      map((data) => ({
        labels: data ? Object.keys(data) : [],
        values: data ? Object.values(data) : [],
      }))
    );
    this.data$.subscribe((data: any) => {
      this.data = data;
      console.log(data);
    });

    // Listen for period changes
    this.facade.selectedPeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((period) => {
        this.selectedPeriod =
          this.periods.find((p) => p.value === period) || this.periods[0];
      });
  }

  onPeriodChange(event: any): void {
    this.facade.updatePeriod(event.value.value);
  }

  getStatusSeverity(status: string): TagSeverity {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'info';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
