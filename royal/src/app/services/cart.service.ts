import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Cart } from '../interface/cart';;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: Cart[] = [];
  public productList = new BehaviorSubject<any>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts() {
    const storedData = localStorage.getItem('productsInCart');
  
    if (storedData) {
      const products = JSON.parse(storedData) as Cart[];
      this.productList.next(products);
    }
  
    return this.productList.asObservable();
  }

  setProduct(product: Cart[]) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: Cart) {
    this.cartItemList.push(product);
    localStorage.setItem('productsInCart', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
  
    const totalPrice = this.getTotalPrice();
    console.log('Total Price:', totalPrice);
  }

  getTotalPrice(): number {
    let grandTotal: number = 0;
    this.cartItemList.forEach((item: Cart) => {
      grandTotal += item.total;
    });
    return grandTotal;
  }

  removeCartItem(product: Cart) {
    const storedData = localStorage.getItem('productsInCart');
    const products = storedData ? JSON.parse(storedData) as Cart[] : [];
  
    if (products) {
      const updatedProducts = products.filter((p: Cart) => p.id !== product.id);
  
      const updatedData = JSON.stringify(updatedProducts);
      localStorage.setItem('productsInCart', updatedData); 
  
      this.cartItemList = updatedProducts;
      this.productList.next(this.cartItemList);
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.removeItem('productsInCart');
  }
}
