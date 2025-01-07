export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
}

// core/auth/models/auth.model.ts
export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
