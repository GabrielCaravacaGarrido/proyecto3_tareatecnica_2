import { CategoryFormComponent } from './../../components/category/category-form/category-form.component';
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { CategoryService } from "../../services/category.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CategoryComponent } from "../../components/category/category-component/category.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ICategory } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'app-category-page',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    CategoryComponent,
    ModalComponent,
    CategoryFormComponent
  ]
})
export class CategoryPageComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild('addCategoryModal') public addCategoryModal: any;
  public title: string = 'Category';
  public categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
  })

  userRole: string = 'USER';

  constructor() {
    this.categoryService.getAll();

    const userData = localStorage.getItem('auth_user');
    if (userData) {
      const userObj = JSON.parse(userData);
      this.userRole = userObj.role?.name || 'USER';
    }
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'SUPER_ADMIN';
  }

  saveCategory(item: ICategory) {
    this.categoryService.save(item);
    this.modalService.closeAll();
  }

  updateCategory(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: ICategory) {
    this.categoryForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
    this.categoryForm.controls['name'].setValue(item.name ? item.name : '');
    this.modalService.displayModal('md', this.addCategoryModal);
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }
}