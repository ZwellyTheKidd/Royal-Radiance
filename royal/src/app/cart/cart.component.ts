import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Product } from '../interface/product';
import { CartService } from '../services/cart.service';
import { Cart } from '../interface/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  public products: any = []
  public grandTotal!: number;

  constructor(
    private msg: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice(); 
    }) 
  }  

  removeItem(item: any) {
    this.cartService.removeCartItem(item)
  }

  emptyCart() {
    this.cartService.removeAllCart()
  }
}