
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  formGroup!: FormGroup;

  constructor(private registerService:RegisterService,private router: Router){
  }

  ngOnInit(){
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  register(){
    if (this.formGroup.valid) {
      this.registerService.register(this.formGroup.value).subscribe(result=>{
        if(result.success){
          console.log(result)
          this.router.navigate(['/home']);
        }else{
          alert(result.message);
        }
      })
    }
  }


}
