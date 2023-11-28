import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];

    constructor(private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.getProducts();
  }

  // getProducts(): void {
  //   this.productService.getProducts()
  //   .subscribe(products => this.products = products);
  // }
  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        console.log('Product Data:', products);
  
        // Assuming the response is an array of products directly
        if (Array.isArray(products)) {
          this.products = products;
        } else {
          // Handle the case where the response is not an array
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }

  



  navigateProductDetails(productId: number): void {
    console.log('Navigating to product details with ID:', productId);
    this.router.navigate(['/products', productId]);
  }
  


  

}
