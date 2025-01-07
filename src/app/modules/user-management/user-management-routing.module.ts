import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { AUTH } from '../../core/constant/auth.constants';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: [AUTH.ROLES.ADMIN] },
  },
  {
    path: 'create',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [AUTH.ROLES.ADMIN] },
  },
  {
    path: ':id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [AUTH.ROLES.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
