import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { CartComponent } from './cart/cart.component'
import { LoginComponent } from './login/login.component'
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: ProductComponent},
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'user', component: UserComponent},
  // { path: 'user/:id', component: EditComponent},
  {path: "edit", component:EditComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
