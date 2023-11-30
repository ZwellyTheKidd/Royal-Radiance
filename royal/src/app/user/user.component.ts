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
  
  }


}
