export interface UserTableState {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  filters: UserTableFilters;
  searchTerm: string;
}

export interface UserTableFilters {
  status?: any;
  role?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
