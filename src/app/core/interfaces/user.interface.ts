import { AUTH } from '../constant/auth.constants';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: keyof typeof AUTH.ROLES;
  permissions: Array<keyof typeof AUTH.PERMISSIONS>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateDTO {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: keyof typeof AUTH.ROLES;
  permissions: Array<keyof typeof AUTH.PERMISSIONS>;
}

export interface UserUpdateDTO
  extends Partial<Omit<UserCreateDTO, 'password'>> {
  id: number;
}
