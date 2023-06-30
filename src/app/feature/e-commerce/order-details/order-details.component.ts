import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  orderDetails:any
  constructor(
    private _rout: ActivatedRoute,
    private ApiParameterScript:ApiParameterScript,
    private appservices:AppService
  ) { 
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {
    this._rout.params.subscribe((res: any) => {
      console.log(res);

      var query=`SELECT e_commerce_product.product_Category,e_commerce_product.product_Name,e_commerce_product.product_Description,e_commerce_product.product_Images,e_commerce_order.*,e_commerce_order_details.* FROM e_commerce_order LEFT JOIN e_commerce_order_details ON e_commerce_order.order_id = e_commerce_order_details.order_ID LEFT JOIN e_commerce_product ON e_commerce_order_details.order_product_ID = e_commerce_product.product_Id WHERE e_commerce_order_details.order_ID='${res.order_id}' AND e_commerce_order_details.order_product_ID='${res.product_id}' AND e_commerce_order.order_created_by_user_email = '${this.appservices.authStatus.email}' ORDER BY e_commerce_order_details.order_details_ID DESC `
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res:any)=>{
        console.log(res);
        if(res.success){
  
          res['data'].map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })

          this.orderDetails=res['data'][0]
  
  
        
  
        }

        
      })
      
    })
  }


  cancle_order(){
    Swal.fire("Cancled Is Not Allow",'','error')
  }

}
