import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { CaseReviewComponent } from 'src/app/shared/case-review/case-review.component';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  order_history: any[] = []
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  constructor(
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private toster: ToastrService,
    private modalService: NgbModal

  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
  }





  ngOnInit(): void {

    // var query=`SELECT e_commerce_product.product_Name,e_commerce_product.product_Description,e_commerce_product.product_Images,e_commerce_order.*,e_commerce_order_details.* FROM e_commerce_order LEFT JOIN e_commerce_order_details ON e_commerce_order.order_id = e_commerce_order_details.order_ID LEFT JOIN e_commerce_product ON e_commerce_order_details.order_product_ID = e_commerce_product.product_Id WHERE e_commerce_order.order_created_by_user_email = '${this.appservices.authStatus.email}' ORDER BY e_commerce_order_details.order_details_ID DESC `
    var query = `SELECT
    e_commerce_product.product_Name,
    e_commerce_product.product_Description,
    e_commerce_product.product_Images,
    e_commerce_order.*,
    e_commerce_order_details.order_details_ID,
    e_commerce_order_details.order_product_ID,
    e_commerce_order_details.order_QUANTITY,
    e_commerce_order_details.order_product_MRP_PRICE,
    e_commerce_order_details.order_delivery_date,
    e_commerce_order_details.order_shipped_date,
    e_commerce_order_details.order_product_Selling_PRICE,
    e_commerce_order_details.order_cancle_date,
    e_commerce_order_details.is_order_cancle,
    e_commerce_order_details.order_shipping_billing_address_details,
    e_commerce_order_details.order_current_status,
    e_commerce_order_details.order_current_msg,
    e_commerce_order_details.order_expected_delivery_date,
    e_commerce_product_rating.product_Rating
    FROM
        e_commerce_order
    LEFT JOIN e_commerce_order_details ON e_commerce_order.order_id = e_commerce_order_details.order_ID
    LEFT JOIN e_commerce_product ON e_commerce_order_details.order_product_ID = e_commerce_product.product_Id
    LEFT JOIN e_commerce_product_rating ON e_commerce_order_details.order_ID=e_commerce_product_rating.product_Rating_Order_ID AND e_commerce_product_rating.product_Id=e_commerce_order_details.order_product_ID
    WHERE
        e_commerce_order.order_created_by_user_email = '${this.appservices.authStatus.email}'
    ORDER BY
        e_commerce_order_details.order_details_ID
    DESC;`
    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
      console.log(res);
      if (res.success) {

        console.log("hii",res['data']);
        
        res['data'].map((data: any) => {
          console.log("hii",data.product_Images);
          
          data['product_Images'] = data.product_Images?data.product_Images.split(','):[];
        })

        // this.order_history= _.orderBy( res['data'], ['created_at'], ['desc']);
        this.order_history = res['data']

      }

    })
  }


  public onrate(event: any, order: any) {
    var apiData = {
      "select": "product_Raiting_ID,product_Rating_Email",
      "projection": `product_Rating_Email='${this.appservices.authStatus.email}' AND product_Id='${order.order_product_ID}' AND product_Rating_Order_ID='${order.order_id}'`
    }
    this.blockUI.start("Please wait...")
    this.ApiParameterScript.fetchdata("e_commerce_product_rating", apiData).subscribe((res: any) => {
      console.log("res", res);

      if (res.success && res['data'].length > 0) {
        var updateData = {
          "data": `product_Rating=${event.value},product_Rating_Time='${moment().format('MMMM Do YYYY, h:mm:ss a').toString()}'`,
          "projection": `product_Raiting_ID =${res['data'][0].product_Raiting_ID}`
        }
        // console.log(updateData);
        this.ApiParameterScript.updatedata("e_commerce_product_rating", updateData).subscribe((updateRes: any) => {
          console.log(updateRes);
          this.blockUI.stop()

          if (updateRes.success) {
            this.toster.info(`You Gave ${event.value} Star Rating`)
            this.openreview(event, order)
          }
        })

      }
      else {
        var insertData = {
          "data": `product_Rating=${event.value},product_Id='${order.order_product_ID}',product_Rating_Order_ID='${order.order_id}',product_Rating_By='${this.appservices.authStatus ? this.appservices.authStatus.name : "unknown"}',product_Rating_Time='${moment().format('MMMM Do YYYY, h:mm:ss a').toString()}',product_Rating_Email='${this.appservices.authStatus ? this.appservices.authStatus.email : 'unknown'}'`
        }
        // console.log(insertData);
        this.ApiParameterScript.savedata("e_commerce_product_rating", insertData, false).subscribe((insertRes: any) => {

          this.blockUI.stop()
          if (insertRes.success) {
            this.toster.info(`You Gave ${event.value} Star Rating`)
            this.openreview(event, order)

          }
        })
      }

    })

  }


  openreview(event: any, order: any) {

    const modalRef = this.modalService.open(CaseReviewComponent);
    modalRef.componentInstance.modalTitle = "Please Give Your FeedBack!";
    modalRef.componentInstance.rating = event.value;
    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {

        var apiData = {
          "select": "product_Raiting_ID,product_Rating_Email",
          "projection": `product_Rating_Email='${this.appservices.authStatus.email}' AND product_Id='${order.order_product_ID}' AND product_Rating_Order_ID='${order.order_id}'`
        }
        this.ApiParameterScript.fetchdata("e_commerce_product_rating", apiData).subscribe((res: any) => {
          console.log("res", res);

          if (res.success && res['data'].length > 0) {
            var updateApiData = {
              "data": `product_Review='${modalInstance.feedBack}'`,
              "projection": `product_Raiting_ID =${res['data'][0].product_Raiting_ID}`
            }
            console.log("updateApiData--->", updateApiData);
            this.blockUI.start();
            this.ApiParameterScript.updatedata('e_commerce_product_rating', updateApiData).subscribe((res: any) => {
              console.log(res);
              this.blockUI.stop()
              if (res.success) {
                this.toster.success("Thank you for your feedback")

              } else {
                this.toster.error("Somwthings Went Wroung")
              }

            })
          }
        })

      }
    }, ((reason: any) => {
      console.log(reason);
    }))

  }



}
