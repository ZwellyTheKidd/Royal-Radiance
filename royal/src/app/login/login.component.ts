// login.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  

  login() {
    // Implement your authentication logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);



    // For a real application, you would typically call a service to handle authentication
    // and navigate to a different route upon successful login.
  }


}


