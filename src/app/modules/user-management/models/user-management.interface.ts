import { User } from '../../../core/interfaces/user.interface';
import { UserTableState } from './user-table.interface';

export interface UserManagementState {
  users: User[];
  selectedUser: User | null;
  tableState: UserTableState;
  isLoading: boolean;
  error: string | null;
}

export interface UserSearchParams extends Partial<UserTableState> {
  includeInactive?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface UserBulkAction {
  type: 'activate' | 'deactivate' | 'delete';
  userIds: number[];
}
