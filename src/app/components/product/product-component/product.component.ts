import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() name: string  = '';
  @Input() description: string  = '';
  @Input() price: number  = 0;
  @Input() stock: number  = 0;
  @Input() product: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();

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

console.log(localStorage.getItem('auth_user'));