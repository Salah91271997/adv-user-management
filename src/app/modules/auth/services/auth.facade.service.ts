import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { LoginCredentials } from '../../../core/interfaces/auth.interface';
import { ToastService } from '../../../core/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  login(credentials: LoginCredentials): void {
    this.isLoadingSubject.next(true);
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.toastService.showSuccess('Login successful');
      },
      error: () => {
        this.toastService.showError('Invalid credentials');
        this.isLoadingSubject.next(false);
      },
      complete: () => {
        this.isLoadingSubject.next(false);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.toastService.showInfo('Logged out successfully');
  }
}
