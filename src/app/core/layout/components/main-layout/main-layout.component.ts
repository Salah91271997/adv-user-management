import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isMenuVisible: boolean = true;
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/dashboard'],
    },
    {
      label: 'User Management',
      icon: 'pi pi-users',
      routerLink: ['/users'],
      visible: this.auth.hasPermission('view_users'),
    },
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: ['/profile'],
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: () => this.auth.logout(),
    },
  ];

  constructor(public auth: AuthService) {}
}
