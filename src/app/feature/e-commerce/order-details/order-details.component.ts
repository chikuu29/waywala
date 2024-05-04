import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  orderDetails: any
  visible: boolean = false
  statusTextForm = new FormGroup({
    reasonText: new FormControl('', [Validators.required]),
  })
  constructor(
    private _rout: ActivatedRoute,
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private confirmationService: ConfirmationService
  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {
    this._rout.params.subscribe((res: any) => {
      console.log(res);

      var query = `SELECT e_commerce_product.product_Category,e_commerce_product.product_canclation_hours,e_commerce_product.product_Name,e_commerce_product.product_Description,e_commerce_product.product_Images,e_commerce_order.*,e_commerce_order_details.* FROM e_commerce_order LEFT JOIN e_commerce_order_details ON e_commerce_order.order_id = e_commerce_order_details.order_ID LEFT JOIN e_commerce_product ON e_commerce_order_details.order_product_ID = e_commerce_product.product_Id WHERE e_commerce_order_details.order_ID='${res.order_id}' AND e_commerce_order_details.order_product_ID='${res.product_id}' AND e_commerce_order.order_created_by_user_email = '${this.appservices.authStatus.email}' ORDER BY e_commerce_order_details.order_details_ID DESC `
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        console.log(res);
        if (res.success) {

          res['data'].map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })

          this.orderDetails = res['data'][0]




        }


      })

    })
  }


  cancle_order() {
    console.log("order", this.orderDetails);
    // Current time
    const currentTime: any = new Date();

    // Specific date (May 4, 2024, 05:01 PM)
    const specificDate: any = new Date(this.orderDetails['created_at']);

    // Calculate the difference in milliseconds
    const timeDifferenceMs = specificDate - currentTime;

    // Convert milliseconds to seconds
    const timeDifferenceSec = timeDifferenceMs / 1000;

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceSec / 3600);

    console.log(hours);

    if (hours < this.orderDetails.product_canclation_hours) {
      console.log("hii");

      this.confirmationService.confirm({

        message: `Are you Know This Is Order Payment Mode Is ${this.orderDetails.order_payment_mode} Still Want To Cancle`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.visible = true;

        },
        reject: (type: any) => {

        }
      })


    } else {
      Swal.fire("This Product Not Be Cancled Now", '', 'error')
    }



  }



  cancle_With_reason() {
    if (this.statusTextForm.valid) {
      this.orderDetails['reasonText'] = this.statusTextForm.value.reasonText

      console.log(this.orderDetails);

      this.ApiParameterScript.dynamicApiExecute('secure/order_cancled.php', this.orderDetails).subscribe((res: any) => {
        this.visible = false
        if (res.success) {
          Swal.fire('Success', res.message, 'success').then(() => {
            this.ngOnInit()
          })
        }


      })
    } else {
      Swal.fire("Opps!", "please Enter The Reson Details For Cancle Order", 'error')
    }

  }
}
