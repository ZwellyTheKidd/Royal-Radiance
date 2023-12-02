import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable , of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productURL = 'https://dummyjson.com/products'; // Corrected URL with protocol

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productURL) // Use 'any' as the type for the response
      .pipe(
        map(response => response.products), // Extract the 'products' array from the response
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }
  
  getProduct(id: number): Observable<Product | Product[]> {
    const url = `${this.productURL}/${id}`;
    return this.http.get<Product | Product[]>(url).pipe(
      tap(_ => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product | Product[]>(`getProduct id=${id}`))
    );
  }

  searchProduct(searchTerm?: string): Observable<Product[]> {
    let url = this.productURL;
  
    // Append the search term to the URL if provided
    if (searchTerm) {
      url += `/search?q=${searchTerm}`;
    }
  
    return this.http.get<any>(url)
      .pipe(
        map(response => response.products),
        tap(_ => this.log(`fetched products${searchTerm ? ' for ' + searchTerm : ''}`)),
        catchError(this.handleError<Product[]>('searchProduct', []))
      );
  }
  
  
  




  

  private log(message: string): void {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}