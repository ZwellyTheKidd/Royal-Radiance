import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserData | null;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.userData = null;
  }

  ngOnInit(): void {
  
  }

  checkUser(): void {
    this.authService.checkUser().subscribe((userData) => {
      if (!userData) {
        // Redirect to login page if not authenticated
        this.router.navigate(['user/login']);
      } else {
        // Redirect to user page if authenticated
        this.router.navigate(['user']);
      }
    });
  }

}
