import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { PaymentGetwayService } from '../services/payment-getway.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  productconfirmationDATA: any =
    {
      "order_Type": "ONLINE",
      "order_Payment_Deatails":{}

  };
  constructor(
    private _rout: ActivatedRoute,
    private payment_getway: PaymentGetwayService,
    private ApiParameterScript:ApiParameterScript
  ) { }

  ngOnInit(): void {

    this._rout.params.subscribe((res: any) => {
      console.log(res.orderID);
      
      this.payment_getway.orderStatus(res.orderID).subscribe((res: any) => {
        console.log(res);
        if(res){
          this.productconfirmationDATA['order_Payment_Deatails']=res
        }
        console.log(this.productconfirmationDATA);
        


      })


    })
  }

}
