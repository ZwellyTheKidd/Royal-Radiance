// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService:AuthenticationService,private router: Router){
  }

  ngOnInit(){
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(){
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result=>{
        console.log(result); 
          
          if (result.success) {
            console.log('success');
            this.router.navigate(['/home']);
          } else {
            alert(result.message);
            console.log('fail');
          }
   
      })
    }
  }

  

  
}



