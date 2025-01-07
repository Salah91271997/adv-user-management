import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../core/interfaces/user.interface';
import { UserManagementFacade } from '../../services/user-management.facade..service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  showUserForm = false;
  selectedUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(private facade: UserManagementFacade) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.facade.userService
      .getUsers({})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  showCreateUserDialog(): void {
    this.selectedUser = null;
    this.showUserForm = true;
  }

  onEdit(user: User): void {
    this.selectedUser = user;
    this.showUserForm = true;

    if (this.selectedUser) {
      this.facade.userService
        .getUserById(this.selectedUser.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.selectedUser = response;
          },
        });
    }
  }

  onDelete(user: User): void {
    this.facade.userService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadUsers();
        },
      });
  }

  onUserFormSave(user: User): void {
    console.log(user);

    if (this.selectedUser) {
      this.facade.userService
        .updateUser(this.selectedUser.id, user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.hideUserForm();
          },
        });
    } else {
      this.facade.userService
        .createUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.hideUserForm();
          },
        });
    }
  }

  onImpersonate(user: User): void {
    // Handle impersonate
  }

  hideUserForm(): void {
    this.showUserForm = false;
    this.selectedUser = null;
    this.loadUsers();
  }

  onSearch(term: string): void {
    console.log(term);

    this.facade.updateSearchTerm(term);
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
