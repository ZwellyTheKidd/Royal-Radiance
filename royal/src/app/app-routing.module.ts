import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ProductsComponent, title: 'Home'},
  { path: 'products/:id', component: ProductDetailComponent, title: 'Product Details'},
  { path: 'register', component: RegisterComponent, title: 'Register'},
  { path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'user', component: UserComponent, title: 'User Profile'},
  { path: 'cart', component: CartComponent, title: 'Cart'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
