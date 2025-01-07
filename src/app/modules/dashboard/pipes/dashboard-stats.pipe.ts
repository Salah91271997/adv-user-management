import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardStats',
})
export class DashboardStatsPipe implements PipeTransform {
  transform(stats: any): any[] {
    if (!stats) return [];
    return [
      { title: 'Total Users', value: stats.totalUsers },
      { title: 'Active Users', value: stats.activeUsers },
      { title: 'New Users', value: stats.newUsers },
      { title: 'Active Percentage', value: stats.activePercentage + '%' },
    ];
  }
}
