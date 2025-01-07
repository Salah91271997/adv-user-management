import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import {
  UserTableState,
  UserTableFilters,
} from '../models/user-table.interface';
import { UserSearchService } from './user-search.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementFacade {
  private selectedUsersSubject = new BehaviorSubject<number[]>([]);
  selectedUsers$ = this.selectedUsersSubject.asObservable();

  constructor(
    public userService: UserService,
    private userSearchService: UserSearchService,
    private toastService: ToastService
  ) {}

  // Expose state from search service
  tableState$ = this.userSearchService.state$;
  searchTerm$ = this.userSearchService.searchTerm$;

  // Users state from user service
  users$ = this.userService.getUsers.bind(this.userService);

  loadUsers(params?: Partial<UserTableState>): void {
    if (params) {
      this.userSearchService.updateState(params);
    }
    this.userService
      .getUsers(this.userSearchService.getCurrentState())
      .subscribe();
  }

  updateFilters(filters: Partial<UserTableFilters>): void {
    this.userSearchService.updateFilters(filters);
    this.loadUsers();
  }

  updateSearchTerm(term: string): void {
    this.userSearchService.updateSearchTerm(term);
    this.loadUsers();
  }

  selectUsers(userIds: number[]): void {
    this.selectedUsersSubject.next(userIds);
  }

  bulkAction(action: 'activate' | 'deactivate' | 'delete'): void {
    const selectedUsers = this.selectedUsersSubject.value;
    if (!selectedUsers.length) return;

    this.userService
      .bulkAction({ type: action, userIds: selectedUsers })
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Bulk action completed successfully');
          this.loadUsers();
          this.selectUsers([]);
        },
        error: () => {
          this.toastService.showError('Failed to perform bulk action');
        },
      });
  }

  exportUsers(format: 'csv' | 'excel'): void {
    const currentState = this.userSearchService.getCurrentState();
    this.userService
      .exportUsers({
        format,
        filters: currentState.filters,
      })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `users-export.${format}`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.toastService.showError('Failed to export users');
        },
      });
  }

  addUser(user: any): void {
    this.userService.createUser(user).subscribe({
      next: () => {
        this.toastService.showSuccess('User created successfully');
        this.loadUsers();
      },
      error: () => {
        this.toastService.showError('Failed to create user');
      },
    });
  }
}
