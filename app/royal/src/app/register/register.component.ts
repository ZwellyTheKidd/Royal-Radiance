
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  formGroup!: FormGroup;

  constructor(private registerService:RegisterService){
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
          alert(result.message);
        }else{
          alert(result.message);
        }
      })
    }
  }


}
