export const VALIDATION = {
  PATTERNS: {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
  },
  MESSAGES: {
    REQUIRED: 'This field is required',
    EMAIL: 'Please enter a valid email address',
    PASSWORD: 'Password must be at least 8 characters with letters and numbers',
    PHONE: 'Please enter a valid phone number',
  },
  LENGTHS: {
    MIN_PASSWORD: 8,
    MAX_PASSWORD: 32,
    MIN_USERNAME: 3,
    MAX_USERNAME: 50,
  },
} as const;
