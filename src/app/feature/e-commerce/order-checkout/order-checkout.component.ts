import { Component, OnInit } from '@angular/core';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { Product } from '../product-section/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CheckOutProductOrder, priceDetails } from 'src/app/appInterface/checkOutProductOrder';
import _, { isNumber } from 'lodash';
import moment from 'moment';
import { PaymentGetwayService } from '../services/payment-getway.service';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
})
export class OrderCheckoutComponent implements OnInit {

  public checkOutProductList: any[] = []
  public activeStepperNumber: number = 1;
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'

  order_shipping_billing_address_details: any = {}
  selectedAddress: any
  order_price_details: priceDetails = {
    total_price: 0,
    final_price: 0,
    total_copun_discount: 0,
    total_mrp_price: 0
  }
  private orderCheckOutInfo: CheckOutProductOrder = {}
  isAddressSelected: boolean = false
  constructor(
    private ecommerceServices: ECommerceServicesService,
    private router: Router,
    private app: AppService,
    private modalService: NgbModal,
    private api: ApiParameterScript,
    private payment_getway:PaymentGetwayService
  ) {
    this.imageURL = this.app.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {

    this.ecommerceServices.checkoutItemList.subscribe((product_id_list) => {
      console.log("CheckOutProcutList", product_id_list);
      // product_id = "fe01ce2a7fbac8fafaed7c982a04e2295441678284309"
      if (product_id_list.length>0) {
        // this.checkOutProductList = checkOutProductList
        // this.orderCheckOutInfo.order_product_inventory=checkOutProductList

        this.getProduct(product_id_list);
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
          confirmButtonText: "GO TO CART",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          // if (result.isConfirmed) {
            this.router.navigateByUrl('/store/my/bag');
            // Swal.fire("Saved!", "", "success");
          // }
        });

      }
    })

    if (this.app.authStatus) {

      this.api.fetchDataFormQuery(`SELECT *  FROM user_address WHERE user_ID='${this.app.authStatus.email}'`).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          //  console.log("hi",res);
          this.order_shipping_billing_address_details = JSON.parse(res['data'][0]['address_INFO'])

          console.log("Selected Address");
          res['data'].map((address: any) => {
            var data = JSON.parse(address['address_INFO'])
            var temp = []
            temp.push(data['name']);
            temp.push(data['address']);
            temp.push(data['landmark']);
            temp.push(data['original_phone'] + ',' + data['alternative_phone']);
            temp.push(data['locality']);
            temp.push(data['city']);
            temp.push(data['pin_code']);
            temp.push(data['state'].name);
            temp.push(data['country']);
            address['display_address_INFO'] = temp.join(",\n")
          })
          this.selectedAddress = res['data'][0]
          this.order_shipping_billing_address_details=JSON.parse(res['data'][0]['address_INFO'])
          this.orderCheckOutInfo.order_biling_address = JSON.parse(res['data'][0]['address_INFO'])
          this.orderCheckOutInfo.order_shipping_address = JSON.parse(res['data'][0]['address_INFO'])
          this.isAddressSelected = true
        } else {
          console.log("no Address Found");
          this.isAddressSelected = false
          // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
        }
      })


    }
  }


  getProduct(product_id: string[]) {
    const formattedIds = product_id.map(id => `'${id}'`).join(',');
    var query = `SELECT p.product_Has_Own_Delivery,p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_stock_count,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Id IN (${formattedIds})) p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`;
   console.log(query);
   
    this.api.fetchDataFormQuery(query).subscribe((res: any) => {
      console.log(res);
      
      if (res.success && res['data'].length > 0) {
        console.log(res);

        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })

        this.checkOutProductList = res['data']
        this.createOrderCheckOutInfo();


      } else {

      }



    })

  }


  createOrderCheckOutInfo() {

    // const product=this.checkOutProductList
    this.orderCheckOutInfo['order_product_inventory'] = this.generateProductInventory(this.checkOutProductList)
    this.orderCheckOutInfo['order_price_details'] = this.calculateTotalProductPrice(this.checkOutProductList)
    this.orderCheckOutInfo['order_offer_details'] = this.generateOffer()
    console.log("final", this.orderCheckOutInfo);
    this.order_price_details = this.orderCheckOutInfo['order_price_details']
  }

  generateProductInventory(productList: any[]): any[] {
    _.map(productList, (product) => {

      product['order_quantity'] = product['order_quantity'] ? product['order_quantity'] : 1

    })

    return productList
  }


  appyCopun() {

    this.orderCheckOutInfo.order_copun_details = {
      copun_code: 'TEXT',
      copun_discount_price: 10
    }
    console.log("apply", this.orderCheckOutInfo);

    // const totalPrice = this.order_price_details.total_price ? this.order_price_details.total_price : 0
    this.order_price_details.total_copun_discount = 10
    // this.order_price_details.final_price = totalPrice - this.order_price_details.total_copun_discount
    // this.createOrderCheckOutInfo()
    this.updatePrice()
  }


  updatePrice() {

    try {
      var total_copun_discount = 0
      if (this.orderCheckOutInfo.order_copun_details) {
        total_copun_discount = isNumber(this.orderCheckOutInfo.order_copun_details.copun_discount_price) ? this.orderCheckOutInfo.order_copun_details.copun_discount_price : 0
      }
      var total_price = _.sumBy(this.checkOutProductList, (product: any) => product.product_Selling_Price * product.order_quantity)
      // var final_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)
      console.log(total_copun_discount);
      var updatedPrice: priceDetails = {
        total_mrp_price: _.sumBy(this.checkOutProductList, (product: any) => product.product_Mrp_Price * product.order_quantity),
        total_copun_discount: total_copun_discount,
        total_price: isNumber(total_price) ? total_price : 0,
        final_price: total_price - total_copun_discount
      };
      this.order_price_details = updatedPrice
      this.orderCheckOutInfo.order_price_details = updatedPrice
    } catch (error) {
      console.log(error);

    }
  }

  activeStepper(index: any) {

    this.activeStepperNumber = index
    //  console.log();

    //   const ref = document.getElementById('wizard-checkout-form')
    //  console.log(ref);

  }


  next() {
    if (this.activeStepperNumber < 5) {
      this.activeStepperNumber += 1
    } else {
      this.activeStepperNumber = 1
    }
  }
  placeorder() {
    console.log("place Order", this.orderCheckOutInfo);

    try {
      this.next()
    } catch (error) {
      console.log(error);

    }


  }

  confirmOrder() {
    console.log("confrimOrder", this.orderCheckOutInfo);

    if (this.isAddressSelected) {
        this.next()
    } else {
      Swal.fire('Warning', 'Please Select Address', 'warning')
    }

  }

  addAddress() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    // modalRef.componentInstance.modalTitle = res.name;
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email

    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {
        // this.firstFormGroup.setValue({ isAddressAvailble: 'yes' })
        this.selectedAddress=modalInstance.address
        this.order_shipping_billing_address_details=JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_biling_address = JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_shipping_address = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.isAddressSelected=true
      }
    }, (reason: any) => {
      this.isAddressSelected=false
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })
  }

  editAddress() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    modalRef.componentInstance.isDirectOpenEditMode = true
    modalRef.componentInstance.edit(this.selectedAddress)
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email
    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {

        // this.firstFormGroup.setValue({ isAddressAvailble: 'yes' })
        // this.order_shipping_billing_address_details = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.selectedAddress=modalInstance.address
        this.order_shipping_billing_address_details=JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_biling_address = JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_shipping_address = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.isAddressSelected=true


      }
    }, (reason: any) => {
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })
  }


  stepUp(index: number) {


    if (this.checkOutProductList[index].product_stock_count > this.checkOutProductList[index].order_quantity) {
      this.checkOutProductList[index].order_quantity += 1;
      this.updatePrice()
    }

  }
  stepDown(index: number) {
    if (1 < this.checkOutProductList[index].order_quantity) {
      this.checkOutProductList[index].order_quantity -= 1
      this.updatePrice()
    }

  }
  onChangeQuantity(event: any, index: number) {
    console.log("onChangeQuantity", this.checkOutProductList[index].order_quantity);
    try {


      if (this.checkOutProductList[index].order_quantity && this.checkOutProductList[index].order_quantity <= this.checkOutProductList[index].product_stock_count) {


      } else {
        this.checkOutProductList[index].order_quantity = this.checkOutProductList[index].product_stock_count
      }
      this.updatePrice()
    } catch (error) {
      console.log(error);

    }


  }



  private calculateTotalProductPrice(productList: Product[]): priceDetails {
    // console.log("calculasteTotalProductPrice", this.checkOutProductList);
    var total_copun_discount = 0
    if (this.orderCheckOutInfo.order_copun_details) {
      total_copun_discount = isNumber(this.orderCheckOutInfo.order_copun_details.copun_discount_price) ? this.orderCheckOutInfo.order_copun_details.copun_discount_price : 0
    }

    var total_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)
    // var final_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)

    return {
      total_mrp_price: _.sumBy(productList, (product: any) => product.product_Mrp_Price * product.order_quantity),
      total_copun_discount: total_copun_discount,
      total_price: isNumber(total_price) ? total_price : 0,
      final_price: total_price - total_copun_discount
    };

  }

  private generateOffer() {
    return {}
  }
  private generateOrderID() {
    const prefix = 'WORD';
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, ''); // Get today's date in ddmmyyyy format
    const randomNumber = Math.floor(Math.random() * new Date().getTime()); // Generate a 10-digit random number
    return prefix + date + randomNumber;
  }

  pay(payment_mode:string){
    console.log(payment_mode);
    if(this.isAddressSelected){

      this.orderCheckOutInfo.order_id=this.generateOrderID()
      this.orderCheckOutInfo.order_payment_mode=payment_mode
      this.orderCheckOutInfo.order_details=this.orderCheckOutInfo.order_product_inventory
      this.orderCheckOutInfo.order_currency="INR"
      this.orderCheckOutInfo.order_created_time=moment().format('DD MMM YYYY, hh:mm A')
      this.orderCheckOutInfo.customer_details={
        "customer_id": "not_availble",
        "customer_name": this.orderCheckOutInfo.order_shipping_address.name,
        "customer_email": `${this.app.authStatus.email}`,
        "customer_phone": this.orderCheckOutInfo.order_shipping_address.original_phone
      },
      this.orderCheckOutInfo.order_shipping_billing_address_details=this.orderCheckOutInfo.order_shipping_address
      this.orderCheckOutInfo.order_amount=this.orderCheckOutInfo.order_price_details?.final_price
      this.orderCheckOutInfo.order_meta={
        "notify_url": "https://test.cashfree.com/pgappsdemos/return.php",
        "return_url": `${this.app.baseURL}store/order/confirmation/status/{order_id}`,
        "payment_methods": "cc,dc,upi"
      }
      this.orderCheckOutInfo.order_note="NA"

      // console.log(this.orderCheckOutInfo)
      this.payment_getway.createOrder(this.orderCheckOutInfo, payment_mode == "COD" ? 1200 : 1201).subscribe((res: any) => {
        // this.blockUI.stop();
        console.log(res);
        // var paymentSessionId = res.payment_session_id;
        if (res.success) {
          var apiData = {
            "projection": `product_CART_BY_Email='${this.app.authStatus.email}'`,
          }
          this.api.deletedata("e_commerce_product_kart", apiData, false).subscribe((res: any) => {
          })
          if (res.order_Payment_Method == 'ONLINE') {
            this.startCapturingPayment(res.payment_session_id);
          } else {
            // console.log("This IS a COD ORDER");
            document.location.href = `${this.app.baseURL}store/order/confirmation/status/${res.order_id}`
          }
        } else {
          alert("SOMETHIGS WENT WRONG")
        }

      })
      // console.log(this.orderCheckOutInfo);
      

    }else{
      Swal.fire('Warning', 'Please Select Address', 'warning')
    }
    
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
}
