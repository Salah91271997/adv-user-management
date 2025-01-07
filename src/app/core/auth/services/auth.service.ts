import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { PERMISSIONS } from '../../constant/auth.constants';
import { User, LoginCredentials, AuthResponse } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly TOKEN_KEY = 'auth_token';

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      // Decode token and set user
      this.setCurrentUser(this.decodeToken(token));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // For demo purposes using mock data
    const mockUsers = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
    ];

    const user = mockUsers.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      const response: AuthResponse = {
        user: {
          id: 1,
          username: user.username,
          email: `${user.username}@example.com`,
          role: user.role as 'admin' | 'user',
          permissions:
            user.role === 'admin'
              ? Object.values(PERMISSIONS)
              : [PERMISSIONS.VIEW_USERS],
        },
        token: 'mock_jwt_token',
      };

      return of(response).pipe(
        tap((res) => {
          console.log(res, 'res');

          localStorage.setItem(this.TOKEN_KEY, res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.setCurrentUser(res.user);
        }),
        map((res) => res.user)
      );
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    console.log('logout');
    this.router.navigate(['/auth/login']);

    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  hasPermission(permission: string): boolean {
    let user = this.currentUserSubject.value;
    if (!user || !user.permissions) {
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    }
    console.log(user, 'user');

    return user?.permissions.includes(permission) ?? false;
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private decodeToken(token: string): User {
    return {} as User;
  }
}
