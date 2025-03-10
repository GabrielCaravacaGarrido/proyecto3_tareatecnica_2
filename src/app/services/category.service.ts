import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory, IResponse, ISearch } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory> {
  private categorySignal = signal<ICategory[]>([]);
  private alertService: AlertService = inject(AlertService);
  protected override source: string = 'category';
  get category$() {
    return this.categorySignal;
  }
  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];


  getAll() {
    this.findAllWithParams(this.search).subscribe({
      next: (response: IResponse<ICategory[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.categorySignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: ICategory) {
    this.add(item).subscribe({
      next: (response: IResponse<ICategory>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding category', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: ICategory) {
    this.editCustomSource('', item).subscribe({
      next: (response: IResponse<ICategory>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: ICategory) {
    this.del(item.id).subscribe({
      next: (response: IResponse<ICategory>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
