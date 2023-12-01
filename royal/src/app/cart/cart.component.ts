import { Component, OnInit } from '@angular/core';
import { MessagerService } from '../services/messager.service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems = [
    {id: 1, productId: 2, productName: "ABC", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", price: 2000}
  ]; // Assuming cartItems is an array of items
  cartTotal = 2000;

  constructor(private  msg: MessagerService) {}

  ngOnInit() {

    this.msg.getMessages().subscribe(products => {
      // Assuming product is an item you want to add to cartItems
      console.log(products);
      // this.cartItems.push(product);

      // this.cartItems.forEach(item => {
      //   this.cartTotal += (item.qty * item.price)
      // });
    })
  }
}

