export const AUTH_PROVIDERS = {
  LOCAL: 'local',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PERMISSIONS = {
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  IMPERSONATE_USER: 'impersonate_user',
} as const;
export const AUTH = {
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'current_user',
  },
  ROLES: {
    ADMIN: 'ADMIN',
    USER: 'USER',
  },
  PERMISSIONS: {
    VIEW_USERS: 'VIEW_USERS',
    CREATE_USER: 'CREATE_USER',
    EDIT_USER: 'EDIT_USER',
    DELETE_USER: 'DELETE_USER',
    IMPERSONATE_USER: 'IMPERSONATE_USER',
    VIEW_ANALYTICS: 'VIEW_ANALYTICS',
  },
} as const;
