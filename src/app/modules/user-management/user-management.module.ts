import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { DashboardStatsPipe } from '../dashboard/pipes/dashboard-stats.pipe';
//import splitButton moduke  from primeng
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserTableComponent,
    UserDetailComponent,
    UserAvatarComponent,
    HasPermissionDirective,
    DashboardStatsPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    TooltipModule,
    MultiSelectModule,
    CardModule,
    UserManagementRoutingModule,
    SplitButtonModule,
  ],

  providers: [ConfirmationService],
})
export class UserManagementModule {}
