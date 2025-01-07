export const USER_MANAGEMENT = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  },
  SORT: {
    DEFAULT_SORT_FIELD: 'username',
    DEFAULT_SORT_ORDER: 'asc',
  },
  USER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    BLOCKED: 'blocked',
  },
  FILTERS: {
    STATUS: 'status',
    ROLE: 'role',
    DATE_RANGE: 'dateRange',
  },
} as const;

export const USER_TABLE_COLUMNS = [
  { field: 'username', header: 'Username', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
  { field: 'role', header: 'Role', sortable: true },
  { field: 'status', header: 'Status', sortable: true },
  { field: 'createdAt', header: 'Created At', sortable: true },
] as const;
