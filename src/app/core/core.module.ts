import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
@NgModule({
  declarations: [AuthLayoutComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    AvatarModule,
    PanelMenuModule,
    RouterModule,
  ],
  exports: [],
  providers: [],
})
export class CoreModule {}
