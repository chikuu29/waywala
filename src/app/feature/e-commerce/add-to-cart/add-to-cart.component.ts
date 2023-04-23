import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { PaymentGetwayService } from '../services/payment-getway.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  allKartItem: any[] = [];
  totalProductDiscount: number = 0
  totalProductMRP_Price: number = 0
  totalProductPrice: number = 0
  totalShippingPrice: number = 0
  isEditable = true;

  activeOrderProcessStage: boolean = false

  firstFormGroup = this._formBuilder.group({
    isAddressAvailble: ['yes', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',],
  });

  order_payment_mode: string = 'COD';
  order_shipping_billing_address_details: any ={}

  constructor(
    private ApiParameterScript: ApiParameterScript,
    private AppService: AppService,
    private eCommerceService: ECommerceServicesService,
    private confirmationService: ConfirmationService,
    private payment_getway: PaymentGetwayService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.imageURL = this.AppService.getAdminApiPath() + "/shop/images/";
    if (this.AppService.authStatus) {

      this.ApiParameterScript.fetchDataFormQuery(`SELECT *  FROM user_address WHERE user_ID='${this.AppService.authStatus.email}'`).subscribe((res:any)=>{
        if(res.success && res['data'].length>0){
          //  console.log("hi",res);
           this.order_shipping_billing_address_details=JSON.parse(res['data'][0]['address_INFO'])
           
        }else{
          // console.log("no Address Found");
          this.firstFormGroup.setValue({isAddressAvailble:'no'})
        }
      })
      var myKart: any = window.localStorage.getItem('myKartData') != null ? JSON.parse(window.localStorage.getItem('myKartData') as any) : [];
      // console.log("Local Stroage Data", myKart);
      if (myKart.length > 0) {

        this.ApiParameterScript.fetchdata('e_commerce_product_kart', { "select": "product_CART_ID", "projection": `product_CART_BY_Email='${this.AppService.authStatus.email}'` }).subscribe((res: any) => {

          console.log("res Data", res);

          if (res.success) {
            console.log(res['data']);
            myKart = _.differenceBy(myKart, res['data'], "product_CART_ID")
            _.map(myKart, (object: any) => {
              object.product_CART_BY_Email = this.AppService.authStatus.email,
                object['product_CART_Status'] = 'active'
            })
            var apiData = {
              "keyName": encodeURIComponent(JSON.stringify(["product_CART_ID", "product_CART_QUANTITY", "product_CART_BY_Email", "product_CART_Status", "product_CART_CREATED_TIME"])),
              "multiDataSet": encodeURIComponent(JSON.stringify(myKart))
            }
            this.ApiParameterScript.savedata('e_commerce_product_kart', apiData, true).subscribe((res: any) => {
              // console.log(res);
              if (res.success) {
                this.getKartInformation()
                window.localStorage.removeItem('myKartData');
              }

            })

          }



        })


      }

    }
    this.getKartInformation();

  }

  private getKartInformation() {

    var sqlQuery = `SELECT p.*, CAST(COALESCE(AVG(pr.product_Rating),0) AS INTEGER) AS product_AVG_Rating, COUNT(pr.product_Rating) AS product_Total_Rating FROM ( SELECT * FROM e_commerce_product ep INNER JOIN e_commerce_product_kart epk ON epk.product_CART_ID = ep.product_Id WHERE ep.product_Live_Status = 'active' AND epk.product_CART_BY_Email = '${this.AppService.authStatus.email}' ) p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id;`
    this.ApiParameterScript.fetchDataFormQuery(sqlQuery).subscribe((res: any) => {
      // console.log("kart data", res);
      if (res.success) {
        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })
        this.allKartItem = res['data'];
        this.calculateTotalProductPrice()
        // console.log("allKartItem", this.allKartItem);

      }

    })


  }

  private calculateTotalProductPrice() {
    // console.log("calculasteTotalProductPrice", this.allKartItem);
    this.totalProductPrice = _.sumBy(this.allKartItem, (product) => product.product_Selling_Price * product.product_CART_QUANTITY);
    this.totalProductDiscount = _.sumBy(this.allKartItem, (product) => (product.product_Mrp_Price * product.product_CART_QUANTITY) - (product.product_Selling_Price * product.product_CART_QUANTITY))
    this.totalProductMRP_Price = _.sumBy(this.allKartItem, (product) => product.product_Mrp_Price * product.product_CART_QUANTITY)
  }


  stepUp(index: number) {
    if (this.allKartItem[index].product_Quantity_Available >= this.allKartItem[index].product_CART_QUANTITY) this.allKartItem[index].product_CART_QUANTITY += 1;
    this.calculateTotalProductPrice()
  }
  stepDown(index: number) {
    if (1 < this.allKartItem[index].product_CART_QUANTITY) this.allKartItem[index].product_CART_QUANTITY -= 1
    this.calculateTotalProductPrice()
  }

  onChangeQuantity(event: any, index: number) {
    console.log("onChangeQuantity", this.allKartItem[index].product_CART_QUANTITY);
    try {


      if (this.allKartItem[index].product_CART_QUANTITY && this.allKartItem[index].product_CART_QUANTITY <= this.allKartItem[index].product_Quantity_Available) {
        console.log("hi");

      } else {
        this.allKartItem[index].product_CART_QUANTITY = 1
      }
      this.calculateTotalProductPrice()
    } catch (error) {
      console.log(error);

    }


  }


  removeProductFormCart(user_CART_ID: any) {

    this.confirmationService.confirm({
      message: 'Are you sure you want remove this Item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        console.log("removeProductFormCart", user_CART_ID);
        var apiData = {
          "projection": `user_CART_ID=${user_CART_ID}`,

        }
        this.blockUI.start('Remove Item...')
        this.ApiParameterScript.deletedata('e_commerce_product_kart', apiData, false).subscribe((res: any) => {
          this.blockUI.stop()
          if (res.success) {
            _.remove(this.allKartItem, (product) => product.user_CART_ID == user_CART_ID)
            this.calculateTotalProductPrice();
            this.eCommerceService.generateCartItemCount.next(true)
          }
          console.log(res);

        })

      }
    });



  }

  place_order() {
    this.activeOrderProcessStage = true
  }

  private startCapturingPayment(payment_session_id: any) {
    // this.activeOrderProcessStage=true
    // const dropinConfig = {
    //   components: [
    //     "order-details",
    //     "card",
    //     "app",
    //     "upi",
    //     "netbanking",
    //     "paylater",
    //     "creditcardemi",
    //     "debitcardemi",
    //     "cardlessemi",
    //   ],
    //   onSuccess: function (data: any) {
    //     console.log(data);

    //     //on success
    //   },
    //   onFailure: function (data: any) {
    //     console.log(data);
    //     //on success
    //   },
    //   style: {
    //     backgroundColor: "#ffffff",
    //     color: "#11385b",
    //     fontFamily: "Lato",
    //     fontSize: "14px",
    //     errorColor: "#ff0000",
    //     theme: "light",
    //   }

    // }

    const cashfree = new this.payment_getway.native_window.Cashfree(payment_session_id);
    cashfree.redirect();




  }

  confirm_order() {

    if(this.firstFormGroup.value.isAddressAvailble=='yes'){
    this.blockUI.start("Please Wait")
    var orderDetails = {
      "order_shipping_billing_address_details": this.order_shipping_billing_address_details,
      "order_details": this.allKartItem,
      "order_id": this.generateOrderID(),
      "order_created_time": moment().format('DD MMM YYYY, hh:mm A'),
      "customer_details": {
        "customer_id": "not_availble",
        "customer_name": this.order_shipping_billing_address_details.name,
        "customer_email": `${this.AppService.authStatus.email}`,
        "customer_phone": this.order_shipping_billing_address_details.original_phone
      },
      "order_amount": _.sumBy(this.allKartItem, (product) => product.product_Selling_Price * product.product_CART_QUANTITY) + this.totalShippingPrice,
      "order_currency": "INR",
      "order_payment_mode": this.order_payment_mode,
      "order_note": "",
      "order_meta": {
        "notify_url": "https://test.cashfree.com/pgappsdemos/return.php",
        "return_url": `${this.AppService.baseURL}store/order/confirmation/status/{order_id}`,
        "payment_methods": "cc,dc,upi"
      }
    }
    console.log("orderDetails", orderDetails);
    this.payment_getway.createOrder(orderDetails, this.order_payment_mode == "COD" ? 1200 : 1201).subscribe((res: any) => {
      this.blockUI.stop();
      console.log(res);
      // var paymentSessionId = res.payment_session_id;
      if (res.success) {
        var apiData = {
          "projection": `product_CART_BY_Email='${this.AppService.authStatus.email}'`,
        }
        this.ApiParameterScript.deletedata("e_commerce_product_kart", apiData, false).subscribe((res: any) => {
        })
        if (res.order_Payment_Method == 'ONLINE_GETWAY') {
          this.startCapturingPayment(res.payment_session_id);
        } else {
          // console.log("This IS a COD ORDER");
          document.location.href = `${this.AppService.baseURL}store/order/confirmation/status/${res.order_id}`
        }
      } else {
        alert("SOMETHIGS WENT WRONG")
      }

    })
  }else{
    Swal.fire('Please Select Your Address','','warning')
  }





  }

  private generateOrderID() {
    const prefix = 'WORD';
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, ''); // Get today's date in ddmmyyyy format
    const randomNumber = Math.floor(Math.random() * new Date().getTime()); // Generate a 10-digit random number
    return prefix + date + randomNumber;
  }


  openAddressMangment() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    // modalRef.componentInstance.modalTitle = res.name;
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email

    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {

        this.firstFormGroup.setValue({isAddressAvailble:'yes'})
        this.order_shipping_billing_address_details=JSON.parse(modalInstance.address.address_INFO)
        console.log(modalInstance);


      }
    }, (reason: any) => {
      this.firstFormGroup.setValue({isAddressAvailble:'no'})
      console.log(reason);

    })

  }
}
