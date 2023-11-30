import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productURL = 'https://fakestoreapi.com/products'; // Corrected URL with protocol

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL).pipe(
      tap((_) => this.log('fetched products')), // Updated log message
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }
  // getProduct(id: number): Observable<Product> {
  //   const url = `${this.productURL}/${id}`;
  //   return this.http.get<Product>(url).pipe(
  //     tap(_ => this.log(`fetched Product id=${id}`)),
  //     catchError(this.handleError<Product[]>(`getProduct id=${id}`))
  //   );
  // }
  getProduct(id: number): Observable<Product | Product[]> {
    const url = `${this.productURL}/${id}`;
    return this.http.get<Product | Product[]>(url).pipe(
      tap((_) => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product | Product[]>(`getProduct id=${id}`))
    );
  }

  private log(message: string): void {
    console.log(message);
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }









}
