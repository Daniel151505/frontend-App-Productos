import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/product`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/product/${id}`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/product/create`, product)
  }

  deleteProduct(id?: string): Observable<Product> {
    return this.http.delete<Product>(`${BASE_URL}/product/delete?productID=${id}`);
  }

  updateProduct(id?: string, product?: Product): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/product/update?productID=${id}`, product)
  }


}
