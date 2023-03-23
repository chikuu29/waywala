import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentGetwayService } from '../services/payment-getway.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(   
    private _rout: ActivatedRoute,
    private payment_getway: PaymentGetwayService
    ) { }

  ngOnInit(): void {

    this._rout.params.subscribe((res: any) => {
      console.log(res.orderID);
      this.payment_getway.orderStatus(res.orderID).subscribe((res:any)=>{
        console.log(res);
        
      })
      

    })
  }

}
