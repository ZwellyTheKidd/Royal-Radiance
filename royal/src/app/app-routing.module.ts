import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component'
import { LoginComponent } from './login/login.component'
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: ProductComponent},
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
