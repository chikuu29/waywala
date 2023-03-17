import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { Product } from '../product-section/product';
import { ECommerceServicesService } from '../services/e-commerce-services.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  product: Product = {};
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  activeImage: string;
  product_QUANTITY: any = 1
  constructor(
    private _rout: ActivatedRoute,
    private router: Router,
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private eCommerceService:ECommerceServicesService
  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "/shop/images/";
    console.log("this", this.imageURL);

  }

  ngOnInit(): void {
    this.blockUI.start('Loading...')
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Category='Vegetable' AND e_commerce_product.product_Id='${res.productID}') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`;

      this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        this.blockUI.stop()
        console.log(res);
        if (res.success && res['data'].length > 0) {
          res.data.map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })
          this.product = res['data'][0];
          this.activeImage = this.imageURL + this.product['product_Images'][0]


        } else {
          this.product = {}
        }

      })

    })
  }

  stepUp() {
    if (this.product.product_Quantity_Available >= this.product_QUANTITY) this.product_QUANTITY += 1
  }
  stepDown() {
    if (1 < this.product_QUANTITY) this.product_QUANTITY -= 1
  }
  clickSideImage(imageUrl: any) {
    this.activeImage = imageUrl
  }

  onChangeQuantity(event: any, max: any) {
    console.log("onChangeQuantity");
    if (this.product_QUANTITY !== '') {
      if (this.product_QUANTITY > max) {
        this.product_QUANTITY = 1
      } else {
        if (this.product_QUANTITY == 0) {
          this.product_QUANTITY = Math.abs(1)
        } else {
          this.product_QUANTITY = Math.abs(this.product_QUANTITY)
        }
      }
    }


  }


  addToBag(product: Product) {
    var addToKartProductObject = {
      product_CART_ID: product.product_Id,
      product_CART_QUANTITY: this.product_QUANTITY,
      product_CART_CREATED_TIME: moment().format('MMMM Do YYYY, h:mm:ss a').toString(),
      product_CART_BY_Email: "Not Availble"
    }
    console.log("addToKartProductObject", addToKartProductObject);
    console.log(this.appservices.authStatus);
    if (this.appservices.authStatus && this.appservices.authStatus.isLogin) {

      this.blockUI.start('Adding To Your Bag...')
      this.apiParameterScript.fetchdata('e_commerce_product_kart', { "select": "user_CART_ID", "projection": `product_CART_ID='${addToKartProductObject.product_CART_ID}' AND product_CART_BY_Email='${this.appservices.authStatus.email}'` }).subscribe((res: any) => {
        console.log(res);

        console.log(res);
        if (res.success && res['data'].length > 0) {
          var updateApiData = {
            "data": `product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}'`,
            "projection":`user_CART_ID=${res['data'][0].user_CART_ID}`
          }
          this.apiParameterScript.updatedata('e_commerce_product_kart', updateApiData).subscribe((res: any) => {
            this.blockUI.stop()            
            this.router.navigate(["/e-commerce/my/bag"])
          }
          )
        } else {
          var saveApiData = {
            "data": `product_CART_ID='${addToKartProductObject.product_CART_ID}',product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}',product_CART_BY_Email='${this.appservices.authStatus.email}',product_CART_Status='active'`,

          }
          this.apiParameterScript.savedata('e_commerce_product_kart', saveApiData, false).subscribe((res: any) => {
            this.blockUI.stop()
            if (res.success) {
              console.log("First");
              this.eCommerceService.generateCartItemCount.next(true)
              this.router.navigate(["/e-commerce/my/bag"])
            }
          }
          )
        }


      })

    } else {
      var myKart: any = window.localStorage.getItem('myKartData') != null ? JSON.parse(window.localStorage.getItem('myKartData') as any) : [];
      var findProdctKartobject = _.find(myKart, { product_CART_ID: addToKartProductObject.product_CART_ID })
      if (findProdctKartobject == undefined) {
        myKart.push(addToKartProductObject);
      } else {
        _.map(myKart, (object: any) => {
          if (object.product_CART_ID == addToKartProductObject.product_CART_ID) {
            object.product_CART_QUANTITY += addToKartProductObject.product_CART_QUANTITY
          }
        })
      }
      window.localStorage.setItem('myKartData', JSON.stringify(myKart))
      this.router.navigate(["/e-commerce/my/bag"])
    }


  }
}

