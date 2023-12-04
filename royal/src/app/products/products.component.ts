import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
}) export class ProductsComponent implements OnInit {


  products: Product[] = [];
  isAscendingOrder = true;


  constructor(private productService: ProductService, private router: Router,) { }


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


  // get laptops category
  getLaptops(): void {
    this.productService.getLaptops()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }

  // get smartphones category
  getsmartphones(): void {
    this.productService.getsmartphones()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }

  // get fragrances category
  getfragrances(): void {
    this.productService.getfragrances()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }
  // get skincare category
  getskincare(): void {
    this.productService.getskincare()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }
  // get womensshoes category
  getwomensshoes(): void {
    this.productService.getwomensshoes()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }
  // get mensshoes category
  getmensshoes(): void {
    this.productService.getmensshoes()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }
  // get sunglasses category
  getsunglasses(): void {
    this.productService.getsunglasses()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }
  // get automotive category
  getautomotive(): void {
    this.productService.getautomotive()
      .subscribe(products => {
        console.log('Product Data:', products);

        if (Array.isArray(products)) {
          this.products = products;
        } else {
          console.error('Invalid response format. Expected an array of products.');
        }
      });
  }


  sortAsc(): void {
    this.isAscendingOrder = true;

    this.products.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  sortDesc(): void {
    this.isAscendingOrder = false;

    this.products.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }

  sortPriceHighToLow(): void {
    this.isAscendingOrder = false;

    this.products.sort((a, b) => {
      return b.price - a.price;
    });
  }

  sortPriceLowToHigh(): void {
    this.isAscendingOrder = true;

    this.products.sort((a, b) => {
      return a.price - b.price;
    });
  }





  navigateProductDetails(productId: number): void {
    console.log('Navigating to product details with ID:', productId);
    this.router.navigate(['/products', productId]);
  }





}