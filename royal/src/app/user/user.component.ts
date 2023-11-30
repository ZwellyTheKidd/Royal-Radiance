import { Component, Input } from '@angular/core';
import { Userservice } from '../get-single-user.service';
import { UserData } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user: UserData;

  constructor(private userService: Userservice, private router: Router) { }


ngOnInit(): void {
  this.getProducts();
}

getProducts(): void {
  this.userService.getProducts()
  .subscribe(products => this.products = products);
}


  
  
  
  
  constructor() {}
}

export  class User{}
