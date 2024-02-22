import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Product } from '../interface/product';
import { CartService } from '../services/cart.service';
import { Cart } from '../interface/cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  public products: any = []
  public grandTotal!: number;
  public cartItems: Cart[] = [];
  cartTotal = 0;


  constructor(
    private router: Router,
    private msg: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.calcCartTotal();
      this.saveToLocalStorage();
    });
  }

  calcCartTotal() {
    this.grandTotal = 0;
    this.products.forEach((item: Product) => {
      this.grandTotal += item.price;
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('cartLength', this.products.length.toString());
    localStorage.setItem('grandTotal', this.grandTotal.toString());
  }

  goCheckout(): void {
    this.router.navigateByUrl('/checkout');
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item)
  }

  emptyCart() {
    this.cartService.removeAllCart()
  }

  increaseQuantity(item: Cart): void {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: Cart): void {
    this.cartService.decreaseQuantity(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }


}