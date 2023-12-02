import { Component , OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userData: UserData | null = null;


  constructor(private authService:AuthenticationService,){}

  ngOnInit(): void {
    this.getCurrentUser()
    
  }

  getCurrentUser(): void {
    this.authService.getUser()

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