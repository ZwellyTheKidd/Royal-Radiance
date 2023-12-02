import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: UserData | null = null;

  
  constructor(private authService:AuthenticationService) { }



  ngOnInit(): void {
    this.getCurrentUser();
  
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
