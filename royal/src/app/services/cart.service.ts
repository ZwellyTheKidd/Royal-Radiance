import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cart } from '../interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemList: Cart[] = [];
  private productList = new BehaviorSubject<Cart[]>([]);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Cart[]> {
    const storedData = localStorage.getItem('productsInCart');
  
    if (storedData) {
      const products = JSON.parse(storedData) as Cart[];
      this.productList.next(products);
    }
  
    return this.productList.asObservable();
  }

  setProduct(products: Cart[]) {
    this.cartItemList = [...products];
    this.productList.next(this.cartItemList);
  }

  addToCart(product: Cart) {
    this.cartItemList.push(product);
    this.updateLocalStorage();
  }

  getTotalPrice(): number {
    return this.cartItemList.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeCartItem(product: Cart) {
    this.cartItemList = this.cartItemList.filter((p) => p.id !== product.id);
    this.updateLocalStorage();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.updateLocalStorage();
  }

  increaseQuantity(item: Cart): void {
    if (item.quantity < 10) {
      item.quantity += 1;
      this.updateLocalStorage();
    }
  }

  decreaseQuantity(item: Cart): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('productsInCart', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
  }
}