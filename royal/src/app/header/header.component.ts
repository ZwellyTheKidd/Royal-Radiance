import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: UserData | null = null;
  public totalItem: number = 0;
  
  constructor(private authService:AuthenticationService, private cartService: CartService) { }



  ngOnInit(): void {
    this.getCurrentUser();

    this.cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length
    })
    
  }

  getCurrentUser(): void {
    this.authService.displayName()

      .subscribe(userData => {
        if (userData !== null) {
          this.userData = userData;
          console.log('user Data:', this.userData);
        } else {
          console.log('User data is null');
        }
      },
      error => {
        console.log('error');
      });
  }

}
