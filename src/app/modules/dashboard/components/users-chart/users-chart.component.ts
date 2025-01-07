import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ChartData } from '../../../../core/interfaces/chart.interface';

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss'],
})
export class UsersChartComponent implements OnChanges, OnInit {
  @Input() data: any;
  @Input() loading = false;

  chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [80, 85, 82, 90, 75, 88],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
      {
        label: 'New Users',
        data: [60, 65, 70, 75, 68, 72],
        fill: false,
        borderColor: '#66BB6A',
        tension: 0.4,
      },
    ],
  };

  chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('s', this.data);
  }

  ngOnChanges(): void {
    console.log('ss', this.data);
  }
}
