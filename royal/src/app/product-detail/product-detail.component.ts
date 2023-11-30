import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../interface/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { this.route.params.subscribe(params => {
    const productId = +params['id']; // Convert to a number
    this.fetchProductDetails(productId);
  });}

  fetchProductDetails(productId: number): void {
    this.productService.getProduct(productId)
      .subscribe(product => {
        // Use the product details as needed in your component
        console.log('Product Details:', product);
      });
  }
  
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productService.getProduct(id)
    .subscribe((data: Product | Product[]) => {
      if (Array.isArray(data)) {
        // Handle array case (multiple products)
        // You might want to assign the first product in the array or handle it differently
        this.product = data[0];
      } else {
        // Handle single product case
        this.product = data;
      }
    });
  }





}
