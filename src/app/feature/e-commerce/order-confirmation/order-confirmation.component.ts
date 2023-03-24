import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { PaymentGetwayService } from '../services/payment-getway.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  skelton_Loader_active=true;
  productconfirmationDATA: any =
    {
      "order_Type": "",
      "payment_mode": "",
      "order_Payment_Deatails": {},
      "order_created": "",
      "order_items": [],
      "total_mrp_price": 0,
      "total_selling_price": 0,
      "total_dicout_price": 0,
      "total_shipping_charges": 0,
      "other_dicout": 0,
      "order_status": "",
      "customer_details": {},
    };
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'

  constructor(
    private _rout: ActivatedRoute,
    private payment_getway: PaymentGetwayService,
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService,
  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {

    this._rout.params.subscribe((res: any) => {
      console.log(res.orderID);

      this.payment_getway.orderStatus(res.orderID).subscribe((res: any) => {
        this.skelton_Loader_active=false

        res.order_items.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })
        res.order_shipping_billing_address_details = JSON.parse(res.order_shipping_billing_address_details)

        const mergedObject = { ...this.productconfirmationDATA, ...res };

        this.productconfirmationDATA = mergedObject;
        console.log(mergedObject);




      })


    })
  }

}
