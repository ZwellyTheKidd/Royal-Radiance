// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService:AuthenticationService){
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
        if(result.success){
          console.log('result')
          alert(result.message);
        }else{
          alert(result.message);
        }
      })
    }
  }

  

  
}



