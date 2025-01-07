import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockDataStore } from './mock-data.service';
import { User } from '../../../core/interfaces/user.interface';
import { UserExportOptions } from '../models/user-export.interface';
import {
  UserSearchParams,
  UserBulkAction,
} from '../models/user-management.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly SIMULATED_DELAY = 500; // 500ms delay to simulate network latency

  constructor(private mockStore: MockDataStore) {}

  getUsers(
    params: UserSearchParams
  ): Observable<{ data: User[]; total: number }> {
    try {
      // Simulate API call
      return of(this.mockStore.getUsers(params)).pipe(
        delay(this.SIMULATED_DELAY),
        map((users) => ({
          data: users,
          total: this.mockStore.getUsers().length, // Get total count without pagination
        }))
      );
    } catch (error) {
      return throwError(() => new Error('Failed to fetch users'));
    }
  }

  getUserById(id: number): Observable<User> {
    try {
      const user = this.mockStore.getUserById(id);
      if (!user) {
        return throwError(() => new Error('User not found'));
      }
      return of(user).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  createUser(userData: Partial<User>): Observable<User> {
    try {
      // Simulate validation
      if (!userData.username || !userData.email) {
        return throwError(() => new Error('Username and email are required'));
      }

      const newUser = this.mockStore.createUser(userData);
      return of(newUser).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    try {
      const updatedUser = this.mockStore.updateUser(id, userData);
      return of(updatedUser).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  deleteUser(id: number): Observable<void> {
    try {
      this.mockStore.deleteUser(id);
      return of(void 0).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  bulkAction(action: UserBulkAction): Observable<void> {
    try {
      action.userIds.forEach((id) => {
        switch (action.type) {
          case 'activate':
            this.mockStore.updateUser(id, { isActive: true });
            break;
          case 'deactivate':
            this.mockStore.updateUser(id, { isActive: false });
            break;
          case 'delete':
            this.mockStore.deleteUser(id);
            break;
        }
      });
      return of(void 0).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  exportUsers(options: UserExportOptions): Observable<Blob> {
    // Simulate export functionality
    try {
      const users = this.mockStore.getUsers(options.filters);
      const csvContent = this.generateCsv(users, options.columns || []);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      return of(blob).pipe(delay(this.SIMULATED_DELAY));
    } catch (error) {
      return throwError(() => error);
    }
  }

  private generateCsv(users: User[], columns: string[]): string {
    // Simple CSV generation
    const headers = columns.length
      ? columns
      : ['id', 'username', 'email', 'role'];
    const rows = users.map((user) =>
      headers.map((col) => (user as any)[col]).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
