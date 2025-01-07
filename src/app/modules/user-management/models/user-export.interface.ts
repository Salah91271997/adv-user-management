import { UserTableFilters } from './user-table.interface';

export interface UserExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  filters?: UserTableFilters;
  columns?: string[];
  includeDeleted?: boolean;
}
