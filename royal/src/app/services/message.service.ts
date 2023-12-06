import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor() {}

  private subject = new Subject<Product>();

  getMessages(): Observable<Product> {
    return this.subject.asObservable();
  }

  // Other methods to update the subject, if needed
  sendMessage(product: Product) {
    this.subject.next(product);
  }
}
