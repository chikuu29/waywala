import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  order_history:any[]=[]
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  constructor(private ApiParameterScript:ApiParameterScript,private appservices:AppService) { 
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
  }

  



  ngOnInit(): void {

    var query=`SELECT e_commerce_product.product_Name,e_commerce_product.product_Images,e_commerce_order.*,e_commerce_order_details.* FROM e_commerce_order LEFT JOIN e_commerce_order_details ON e_commerce_order.order_id = e_commerce_order_details.order_ID LEFT JOIN e_commerce_product ON e_commerce_order_details.order_product_ID = e_commerce_product.product_Id WHERE e_commerce_order.order_created_by_user_email = '${this.appservices.authStatus.email}' ORDER BY e_commerce_order_details.order_details_ID DESC `
    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res:any)=>{
      console.log(res);
      if(res.success){

        res['data'].map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })

        // this.order_history= _.orderBy( res['data'], ['created_at'], ['desc']);
        this.order_history=res['data']

      }
      
    })
  }

}
