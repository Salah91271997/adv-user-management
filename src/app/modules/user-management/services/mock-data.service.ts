import { Injectable } from '@angular/core';
import { AUTH } from '../../../core/constant/auth.constants';
import { User } from '../../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDataStore {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: AUTH.ROLES.ADMIN,
      permissions: Object.values(AUTH.PERMISSIONS),
      isActive: true,
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString(),
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: AUTH.ROLES.USER,
      permissions: [AUTH.PERMISSIONS.VIEW_USERS],
      isActive: true,
      createdAt: new Date('2024-01-02').toISOString(),
      updatedAt: new Date('2024-01-02').toISOString(),
    },
    // Add more mock users as needed
  ];

  getUsers(params?: any): User[] {
    let filteredUsers = [...this.users];

    if (params) {
      // Apply filters
      if (params.searchTerm) {
        const search = params.searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.firstName.toLowerCase().includes(search) ||
            user.lastName.toLowerCase().includes(search)
        );
      }

      // Apply role filter
      if (params.filters?.role) {
        filteredUsers = filteredUsers.filter(
          (user) => user.role === params.filters.role
        );
      }

      // Apply status filter
      if (params.filters?.status) {
        filteredUsers = filteredUsers.filter(
          (user) => user.isActive === (params.filters.status === 'active')
        );
      }

      // Apply sorting
      if (params.sortField) {
        filteredUsers.sort((a: any, b: any) => {
          const aValue = a[params.sortField];
          const bValue = b[params.sortField];
          const direction = params.sortOrder === 'asc' ? 1 : -1;
          return aValue > bValue ? direction : -direction;
        });
      }

      // Apply pagination
      if (params.page && params.pageSize) {
        const start = (params.page - 1) * params.pageSize;
        filteredUsers = filteredUsers.slice(start, start + params.pageSize);
      }
    }

    return filteredUsers;
  }

  getUserById(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  createUser(userData: Partial<User>): User {
    const newUser: User = {
      id: this.getNextId(),
      username: userData.username!,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      role: userData.role!,
      permissions: userData.permissions || [],
      isActive: userData.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userData: Partial<User>): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
  }

  private getNextId(): number {
    return Math.max(...this.users.map((user) => user.id)) + 1;
  }
}
