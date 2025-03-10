import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ProductService } from "../../services/product.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductComponent } from "../../components/product/product-component/product.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { IProduct } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'app-product-page',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    ProductComponent,
    ModalComponent,
    ProductFormComponent
  ]
})
export class ProductPageComponent {
  public productService: ProductService = inject(ProductService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild('addProductModal') public addProductModal: any;
  public title: string = 'Product';
  public productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    category_id: [''],
    
  }
)

  userRole: string = 'USER';

  constructor() {
    this.productService.getAll();

    const userData = localStorage.getItem('auth_user');
    if (userData) {
      const userObj = JSON.parse(userData);
      this.userRole = userObj.role?.name || 'USER';
    }
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'SUPER_ADMIN';
  }

  saveProduct(item: IProduct) {
    this.productService.save(item);
    this.modalService.closeAll();
  }

  updateProduct(item: IProduct) {
    this.productService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: IProduct) {
    this.productForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
    this.productForm.controls['name'].setValue(item.name ? item.name : '');
    this.productForm.controls['description'].setValue(item.description ? item.description : '');
    this.productForm.controls['price'].setValue(item.price ? JSON.stringify(item.price) : '');
    this.productForm.controls['stock'].setValue(item.stock ? JSON.stringify(item.stock) : '');
    this.productForm.controls['category_id'].setValue(item.category_id ? JSON.stringify(item.category_id) : '');
    this.modalService.displayModal('md', this.addProductModal);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }
    
}