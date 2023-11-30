import { Component } from '@angular/core';
import { Product } from '../interface/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})export class ProductsComponent {

  products: Product[] = [];

    constructor(private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        console.log('Product Data:', products);
  
        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }

  



  navigateProductDetails(productId: number): void {
    console.log('Navigating to product details with ID:', productId);
    this.router.navigate(['/products', productId]);
  }
  


  

}