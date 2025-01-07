import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { User } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() loading = false;

  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  @Output() impersonate = new EventEmitter<User>();

  constructor(private confirmationService: ConfirmationService) {}

  onEditClick(user: User): void {
    this.edit.emit(user);
  }

  onImpersonateClick(user: User): void {
    this.impersonate.emit(user);
  }

  onDeleteClick(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete user ${user.username}?`,
      accept: () => {
        this.delete.emit(user);
      },
    });
  }
}
