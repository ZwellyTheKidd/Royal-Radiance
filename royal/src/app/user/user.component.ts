import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserData | null;

  constructor(private authService: AuthenticationService) {
    this.userData = null;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authService.getUser().subscribe((userData) => {
      if (!userData) {
        // Redirect to login page if not authenticated
        // Optionally, you can handle this case in your template as well
        // and show a message or redirect to the login page.
      } else {
        this.userData = userData;
      }
    });
  }
}
