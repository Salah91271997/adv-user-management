import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  @Input() name = '';
  @Input() imageUrl = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  private colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
  ];

  get backgroundColor(): string {
    return this.colors[Math.abs(this.hashCode(this.name)) % this.colors.length];
  }

  getInitials(): string {
    return this.name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  private hashCode(str: string): number {
    return str.split('').reduce((hash, char) => {
      return (hash << 5) - hash + char.charCodeAt(0);
    }, 0);
  }
}
