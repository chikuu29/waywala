import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { ECommerceServicesService } from '../services/e-commerce-services.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  allKartItem: any[] = [];
  totalProductDiscount:number=0
  totalProductMRP_Price:number=0
  totalProductPrice: number = 0
  totalShippingPrice: number = 20
  constructor(
    private ApiParameterScript: ApiParameterScript,
    private AppService: AppService,
    private eCommerceService: ECommerceServicesService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.imageURL = this.AppService.getAdminApiPath() + "/shop/images/";
    if (this.AppService.authStatus) {
      var myKart: any = window.localStorage.getItem('myKartData') != null ? JSON.parse(window.localStorage.getItem('myKartData') as any) : [];
      console.log("Local Stroage Data", myKart);
      if (myKart.length > 0) {

        this.ApiParameterScript.fetchdata('e_commerce_product_kart', { "select": "product_CART_ID", "projection": `product_CART_BY_Email='${this.AppService.authStatus.email}'` }).subscribe((res: any) => {
           
          console.log("res Data",res);
          
          if(res.success){
          console.log(res['data']);
          myKart=_.differenceBy(myKart, res['data'],"product_CART_ID")
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
    console.log("calculateTotalProductPrice", this.allKartItem);
    this.totalProductPrice = _.sumBy(this.allKartItem, (product) => product.product_Selling_Price * product.product_CART_QUANTITY);
    this.totalProductDiscount=_.sumBy(this.allKartItem, (product) =>(product.product_Mrp_Price * product.product_CART_QUANTITY )- (product.product_Selling_Price * product.product_CART_QUANTITY) )
    this.totalProductMRP_Price=_.sumBy(this.allKartItem, (product) => product.product_Mrp_Price * product.product_CART_QUANTITY)
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
}
