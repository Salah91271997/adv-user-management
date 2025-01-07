export const DASHBOARD_CONSTANTS = {
  CHART_PERIODS: [
    {
      label: 'Last 7 days',
      value: 7,
      description: 'Show data for the past week',
    },
    {
      label: 'Last 30 days',
      value: 30,
      description: 'Show data for the past month',
    },
    {
      label: 'Last 90 days',
      value: 90,
      description: 'Show data for the past quarter',
    },
  ],
  STATS_CARDS: [
    {
      id: 'total-users',
      title: 'Total Users',
      icon: 'pi pi-users',
      color: 'bg-blue-100',
    },
    {
      id: 'active-users',
      title: 'Active Users',
      icon: 'pi pi-user',
      color: 'bg-green-100',
    },
    {
      id: 'new-users',
      title: 'New Users',
      icon: 'pi pi-user-plus',
      color: 'bg-yellow-100',
    },
    {
      id: 'active-percentage',
      title: 'Active Percentage',
      icon: 'pi pi-chart-line',
      color: 'bg-purple-100',
    },
  ],
  CHART_COLORS: {
    primary: '#42A5F5',
    secondary: '#66BB6A',
    accent: '#FFA726',
    danger: '#EF4444',
    warning: '#FBBF24',
  },
  ACTIVITY_TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    PROFILE_UPDATE: 'profile_update',
    PASSWORD_CHANGE: 'password_change',
    SETTINGS_UPDATE: 'settings_update',
  },
} as const;
