import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { AuthLayoutComponent } from './core/layout/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/components/main-layout/main-layout.component';
import { CoreModule } from './core/core.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    DashboardModule,
    UserManagementModule,
    CoreModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
