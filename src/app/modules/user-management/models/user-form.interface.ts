export interface UserFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  permissions: string[];
  isActive: boolean;
}
