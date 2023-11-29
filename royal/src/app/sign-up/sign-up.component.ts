import { Component, OnInit} from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();

  constructor(){}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null) {
      form.reset();
      this.user={
        UserName:'',
        Password:'',
        Email:'',
        FirstName:'',
        LastName:'',
      }
    }
  }

  onSubmit(): void {
    // Handle form submission logic here
    console.log(this.user);
  }


}
