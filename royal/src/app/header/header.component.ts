import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  products: Product[] = [];
  searchTerm$ = new Subject<string>();

  constructor(private productService: ProductService) {}



  ngOnInit(): void {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.productService.searchProduct(term))
      )
      .subscribe(products => {
        this.products = products;
      });
  }
  searchProduct(searchTerm: string): void {
    if (searchTerm.trim() !== '') {
      this.searchTerm$.next(searchTerm);
    } else {
      // If the search term is empty, clear the products array
      this.products = [];
    }
  }

  
}
