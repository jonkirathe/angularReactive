import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiService = inject(ApiService);

  constructor() { }

  getProducts(): Observable<any> {
    return this.apiService.get('/products')
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
}
