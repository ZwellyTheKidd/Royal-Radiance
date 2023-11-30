import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { CartComponent } from './cart/cart.component'
import { LoginComponent } from './login/login.component'
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
