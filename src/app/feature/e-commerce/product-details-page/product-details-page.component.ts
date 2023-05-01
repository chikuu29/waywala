import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { Product } from '../product-section/product';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CoustomAlertMaterialUiComponent } from 'src/app/shared/coustom-alert-material-ui/coustom-alert-material-ui.component';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common'
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
  images: any[] = [];
  displayBasic: boolean = false
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(
    private _rout: ActivatedRoute,
    private router: Router,
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private eCommerceService: ECommerceServicesService,
    private _snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta,
    private location: Location
  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "shop/images/";
    console.log("this", this.imageURL);

  }

  ngOnInit(): void {
    this.blockUI.start('Loading...')
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Id='${res.productID}') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`;

      this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        this.blockUI.stop()
        console.log(res);
        if (res.success && res['data'].length > 0) {
          res.data.map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })

          this.product = res['data'][0];
          this.activeImage = this.imageURL + this.product['product_Images'][0]
          // var images = this.product.product_Images;
          this.product.product_Images.forEach((e: any) => {
            this.images.push(
              {
                "previewImageSrc": `${this.imageURL}${e}`,
                "thumbnailImageSrc": `${this.imageURL}${e}`,
                "alt": e,
                "title": e
              }
            )
          })
          // console.log(this.images);
          this.title.setTitle(this.product.product_Name || 'No Product found');
          this.meta.updateTag({ property: 'description', content: this.product.product_Name || '' });
          this.meta.updateTag({ property: 'og:image', content: this.activeImage });
          this.meta.updateTag({ property: 'og:title', content: this.product.product_Name || '' });
          this.meta.updateTag({ property: 'og:description', content: this.product.product_Name || '' });
          this.meta.updateTag({ property: 'og:image:alt', content: this.product.product_Name || '' });
        



        } else {

          this.product = {}
          this.location.back();
        }

      })

    })

  }
  showCustomAlert() {
    this._snackBar.openFromComponent(CoustomAlertMaterialUiComponent, {
      duration: 2000
    });

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

    if (this.appservices.authStatus && this.appservices.authStatus.isLogin) {

      this.blockUI.start('Adding To Your Bag...')
      this.apiParameterScript.fetchdata('e_commerce_product_kart', { "select": "user_CART_ID", "projection": `product_CART_ID='${addToKartProductObject.product_CART_ID}' AND product_CART_BY_Email='${this.appservices.authStatus.email}'` }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          var updateApiData = {
            "data": `product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}'`,
            "projection": `user_CART_ID=${res['data'][0].user_CART_ID}`
          }
          this.apiParameterScript.updatedata('e_commerce_product_kart', updateApiData).subscribe((res: any) => {
            this.blockUI.stop()
            this.showCustomAlert()
            // this.router.navigate(["/store/my/bag"])
          }
          )
        } else {
          var saveApiData = {
            "data": `product_CART_ID='${addToKartProductObject.product_CART_ID}',product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}',product_CART_BY_Email='${this.appservices.authStatus.email}',product_CART_Status='active'`,

          }
          this.apiParameterScript.savedata('e_commerce_product_kart', saveApiData, false).subscribe((res: any) => {
            this.blockUI.stop()
            this.showCustomAlert()
            if (res.success) {
              this.eCommerceService.generateCartItemCount.next(true)

              // this.router.navigate(["/store/my/bag"])
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
      this.router.navigate(["/store/my/bag"])
    }


  }

  buy(product: Product) {
    var addToKartProductObject = {
      product_CART_ID: product.product_Id,
      product_CART_QUANTITY: this.product_QUANTITY,
      product_CART_CREATED_TIME: moment().format('MMMM Do YYYY, h:mm:ss a').toString(),
      product_CART_BY_Email: "Not Availble"
    }

    if (this.appservices.authStatus && this.appservices.authStatus.isLogin) {

      this.blockUI.start('Adding To Your Bag...')
      this.apiParameterScript.fetchdata('e_commerce_product_kart', { "select": "user_CART_ID", "projection": `product_CART_ID='${addToKartProductObject.product_CART_ID}' AND product_CART_BY_Email='${this.appservices.authStatus.email}'` }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          var updateApiData = {
            "data": `product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}'`,
            "projection": `user_CART_ID=${res['data'][0].user_CART_ID}`
          }
          this.apiParameterScript.updatedata('e_commerce_product_kart', updateApiData).subscribe((res: any) => {
            this.blockUI.stop()
            // this.showCustomAlert()  
            this.router.navigate(["/store/my/bag"])
          }
          )
        } else {
          var saveApiData = {
            "data": `product_CART_ID='${addToKartProductObject.product_CART_ID}',product_CART_QUANTITY=${addToKartProductObject.product_CART_QUANTITY},product_CART_CREATED_TIME='${addToKartProductObject.product_CART_CREATED_TIME}',product_CART_BY_Email='${this.appservices.authStatus.email}',product_CART_Status='active'`,

          }
          this.apiParameterScript.savedata('e_commerce_product_kart', saveApiData, false).subscribe((res: any) => {
            this.blockUI.stop()
            // this.showCustomAlert()
            if (res.success) {
              this.eCommerceService.generateCartItemCount.next(true)

              // this.router.navigate(["/store/my/bag"])
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
      this.router.navigate(["/store/my/bag"])
    }

  }


  shareOnWhatsApp() {

    const url = `whatsapp://send?text=${this.product.product_Name} : ${this.appservices.baseURL}store/product/${this.product.product_Id}`;
    window.open(url, '_blank', 'height=600,width=800');
  }

}


