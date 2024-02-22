import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  @ViewChild('paypalref', { static: true }) private paypalRef!: ElementRef;

  cartLength: number = 0;
  grandTotal: number = 0;
  delivery: number = 0;;

  ngOnInit(): void {
    window.paypal
     .Buttons({
       style:{
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'pay'
       },

       createOrder: (data: any,actions: any)=>{
        return actions.order.create({
          purchase_units: [
            {
              amount:{
                value: '1000',
                currency_code: 'USD',
              }
            }
          ]
        })
       },

       onApprove: (data: any,actions: any)=>{
        return actions.order.capture().then((details: any) => {
          alert('Transaction Successful')
        })
       },

       onError: (error: any) =>{
        console.log(error);
       }



     })
     .render(this.paypalRef.nativeElement);


     

     this.cartLength = parseInt(localStorage.getItem('cartLength') || '0', 10);
    this.grandTotal = parseFloat(localStorage.getItem('grandTotal') || '0');

    this.delivery=this.grandTotal+70;








  }
 

}
