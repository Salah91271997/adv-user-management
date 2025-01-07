import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { UsersChartComponent } from './components/users-chart/users-chart.component';
import { ActivityChartComponent } from './components/activity-chart/activity-chart.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TimeAgoPipe } from './pipes/timeago.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    StatsCardComponent,
    UsersChartComponent,
    ActivityChartComponent,
    UserAvatarComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    ChartModule,
    MessageModule,
    TagModule,
    ProgressSpinnerModule,
    TooltipModule,
  ],
})
export class DashboardModule {}
