export const ROUTES = {
  AUTH: {
    LOGIN: 'auth/login',
    FORGOT_PASSWORD: 'auth/forgot-password',
  },
  DASHBOARD: 'dashboard',
  USERS: {
    LIST: 'users',
    CREATE: 'users/create',
    EDIT: 'users/edit',
    PROFILE: 'users/profile',
  },
  ANALYTICS: 'analytics',
} as const;
