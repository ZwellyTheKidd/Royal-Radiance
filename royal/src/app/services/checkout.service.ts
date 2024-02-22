import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  private grandTotalSource = new BehaviorSubject<number>(0);
  grandTotal$ = this.grandTotalSource.asObservable();

  private itemCountSource = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSource.asObservable();

  updateCartInfo(grandTotal: number, itemCount: number) {
    this.grandTotalSource.next(grandTotal);
    this.itemCountSource.next(itemCount);
  }
}
