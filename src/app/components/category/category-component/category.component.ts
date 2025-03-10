import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() name: string  = '';
  @Input() category: ICategory[] = [];
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  userRole: string = 'USER'; // Rol por defecto

  constructor() {
    const userData = localStorage.getItem('auth_user');
    if (userData) {
      const userObj = JSON.parse(userData);
      this.userRole = userObj.role?.name || 'USER';
    }
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'SUPER_ADMIN';
  }
}
