import { Component , OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userData: UserData | null = null;


  constructor(private authService:AuthenticationService,private router:Router){}

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



logOut(): void {
  this.authService.logOut().subscribe(
    () => {
      // Redirect to the login page or perform other actions after successful logout
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error('Logout failed', error);
    }
  );
}







}