export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  version: '1.0.0',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'ar'],
  authConfig: {
    tokenKey: 'auth_token',
    tokenExpiryKey: 'auth_token_expiry',
    refreshTokenKey: 'refresh_token',
  },
  apiEndpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
    },
    users: {
      base: '/users',
      profile: '/users/profile',
      impersonate: '/users/impersonate',
    },
    dashboard: {
      stats: '/dashboard/stats',
      analytics: '/dashboard/analytics',
    },
  },
  toastConfig: {
    errorDuration: 5000,
    successDuration: 3000,
    warningDuration: 4000,
    infoDuration: 3000,
  },
};
