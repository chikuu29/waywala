import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
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
import { elements } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
  user_pincode: any = ''
  isProductAvailble: boolean = true
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

  ratingInformation: any = {
    review: [],
    rating: {
      "zero_star": {
        "rating_count": 0,
        "average_rating": 0
      },
      "one_star": {
        "rating_count": 0,
        "average_rating": 1
      },
      "two_star": {
        "rating_count": 0,
        "average_rating": 2
      },
      "three_star": {
        "rating_count": 0,
        "average_rating": 3
      },
      "four_star": {
        "rating_count": 0,
        "average_rating": 4
      },
      "five_star": {
        "rating_count": 0,
        "average_rating": 5
      },
    },

  }
  constructor(
    private _rout: ActivatedRoute,
    private router: Router,
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private eCommerceService: ECommerceServicesService,
    private _snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta,
    private location: Location,
    private alert: ToastrService,
    private clipboard: Clipboard
  ) {
    this.imageURL = this.appservices.getAdminApiPath() + "shop/images/";
    console.log("this", this.imageURL);

  }

  ngOnInit(): void {
    this.blockUI.start('Loading...')
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      var query = `SELECT  * FROM e_commerce_product p WHERE 
    p.product_Live_Status = 'active'
    AND p.product_Id = '${res.productID}'`
      this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        this.blockUI.stop()
        console.log(res);
        if (res.success && res['data'].length > 0) {
          res.data.map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
            data['product_delevery_pincodes'] = data.product_delevery_pincodes != null ? data.product_delevery_pincodes.split(',') : [];
          })

          this.product = res['data'][0];
          // this.user_pincode = this.product.product_Shipped_Pincode
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
          this.checkProductAvailbility()
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


      var ratingData = {
        "select": "*",
        "projection": `product_Id='${res.productID}'`,
        "order": "product_Raiting_ID"
      }
      this.apiParameterScript.fetchdata('e_commerce_product_rating', ratingData).subscribe((ratingInfo: any) => {
        if (ratingInfo.success && ratingInfo['data'].length > 0) {
          this.ratingInformation['review'] = ratingInfo['data']
          console.log(this.ratingInformation);

        }
      })

      var ratingCountQuery = `SELECT
      product_Id,
      product_Rating AS rating_category_type,
      COUNT(*) AS rating_count,
         CAST(AVG(product_Rating) AS INT) AS average_rating
      FROM
          e_commerce_product_rating
      WHERE
          product_Rating IN (0,1, 2, 3, 4, 5) AND product_Id = '${res.productID}'
      GROUP BY
          product_Rating;`
      this.apiParameterScript.fetchDataFormQuery(ratingCountQuery).subscribe((res: any) => {
        console.log("ratingCountQuery", res);

        if (res.success && res['data'].length > 0) {

          res['data'].forEach((element: any) => {


            switch (parseInt(element.rating_category_type)) {
              case 0:
                this.ratingInformation['rating']['zero_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['zero_star']['average_rating'] = element.average_rating
                break;
              case 1:
                this.ratingInformation['rating']['one_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['one_star']['average_rating'] = element.average_rating

                break;

              case 2:
                this.ratingInformation['rating']['two_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['two_star']['average_rating'] = element.average_rating

                break;

              case 3:
                this.ratingInformation['rating']['three_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['three_star']['average_rating'] = element.average_rating

                break;

              case 4:
                this.ratingInformation['rating']['four_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['four_star']['average_rating'] = element.average_rating

                break;
              case 5:
                this.ratingInformation['rating']['five_star']['rating_count'] = element.rating_count
                this.ratingInformation['rating']['five_star']['average_rating'] = element.average_rating

                break;

              default:
                console.log("No rating_category_type found");

                break;
            }


          });

          console.log("ratingInformation", this.ratingInformation);


        }


      })

    })

  }

  checkProductAvailbility() {
    var apiData = `SELECT *  FROM user_address WHERE user_ID='${this.appservices.authStatus.email}'`

    this.apiParameterScript.fetchDataFormQuery(apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        res['data'].map((address: any) => {
          var data = JSON.parse(address['address_INFO'])
          address['pin_code'] = data['pin_code']
          var temp = []
          temp.push(data['name']);
          temp.push(data['address']);
          temp.push(data['landmark']);
          temp.push(data['original_phone'] + ',' + data['alternative_phone']);
          temp.push(data['locality']);
          temp.push(data['city']);
          temp.push(data['pin_code']);
          temp.push(data['state']);
          temp.push(data['country']);
          address['display_address_INFO'] = temp.join(",\n")
        })
        this.user_pincode = res['data'][0]['pin_code']
        this.vlidate_pincode(false)
        // console.log("userAddress", res);
        // this.allAddress = res['data']
        // console.log(this.allAddress);
      }


    })
  }
  showCustomAlert() {
    this._snackBar.openFromComponent(CoustomAlertMaterialUiComponent, {
      duration: 2000
    });

  }

  stepUp() {
    if (this.product.product_stock_count >= this.product_QUANTITY) this.product_QUANTITY += 1
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
      console.log("Buy Producr", product);

      this.eCommerceService.checkoutItemList.next([product.product_Id])

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
            this.router.navigate(["/store/checkout"])
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
              this.router.navigate(["/store/checkout"])
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


  copy() {

    const url = `${this.appservices.baseURL}store/product/${this.product.product_Id}`;
    this.clipboard.copy(url)
    this.alert.success('Link Copied Successfully')

  }

  vlidate_pincode(needAlert: boolean = true) {



    if (this.user_pincode !== '') {
      console.log(this.product);
      if (this.product.product_delevery_pincodes && this.product.product_delevery_pincodes.includes(this.user_pincode)) {
        this.isProductAvailble = true
      } else {
        this.isProductAvailble = false
      }
      if (needAlert && this.isProductAvailble) {
        Swal.fire(
          {
            title: `<strong style='color:#5c54a0; font-size:30px;'>This product is available in This Picode ${this.user_pincode}</strong>`,
            html: '<h2>Congratulation</h2> <div class="pyro"><div class="before"></div><div class="after"></div></div>',
            icon: 'success'

          }).then((res: any) => {

          })
      } 
    } else {
      this.isProductAvailble = false
    }

  }


  onCopySuccess(event: any) {

    if (event) {
      // this.copiedIndex = 

      this.alert.success('Cupon copied successfully')
    }
    console.log('Text copied successfully', event);
  }

  onCopyError() {
    console.error('Error copying text');
  }


}


