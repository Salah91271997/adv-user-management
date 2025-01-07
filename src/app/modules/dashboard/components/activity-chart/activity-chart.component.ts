import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss',
})
export class ActivityChartComponent {
  @Input() data: any;
  @Input() loading = false;

  chartData: any;
  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#495057',
        },
      },
    },
    cutout: '60%',
  };

  ngOnChanges(): void {
    console.log('data', this.data);

    if (this.data) {
      this.chartData = {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values,
            backgroundColor: [
              '#42A5F5',
              '#66BB6A',
              '#FFA726',
              '#26C6DA',
              '#7E57C2',
            ],
            hoverBackgroundColor: [
              '#64B5F6',
              '#81C784',
              '#FFB74D',
              '#4DD0E1',
              '#9575CD',
            ],
          },
        ],
      };
    }
  }
}
