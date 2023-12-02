import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagerService {
  subject = new Subject();

  constructor() {}

  sendMessage(product: any) {
    console.log(product);
    this.subject.next(product);
  }

  getMessages() {
    return this.subject.asObservable();
  }

}
