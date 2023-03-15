import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  allKartItem: any[] = []
  constructor(private ApiParameterScript: ApiParameterScript, private AppService: AppService) { }

  ngOnInit(): void {
    this.imageURL = this.AppService.getAdminApiPath() + "/shop/images/";
    var myKart: any = window.localStorage.getItem('myKartData') != null ? JSON.parse(window.localStorage.getItem('myKartData') as any) : [];
    console.log("AppService", this.AppService.authStatus.email);
    console.log("MyKart", myKart);
    _.map(myKart, (object: any) => {
      object.product_CART_BY_Email = this.AppService.authStatus.email,
        object['product_CART_Status'] = 'active'
    })
    var apiData = {
      "multiInsert": true,
      "keyName": encodeURIComponent(JSON.stringify(["product_CART_ID", "product_CART_QUANTITY", "product_CART_BY_Email", "product_CART_Status", "product_CART_CREATED_TIME"])),
      "multiDataSet": encodeURIComponent(JSON.stringify(myKart))
    }
    console.log(apiData);
    // console.log(decodeURIComponent(apiData.multiDataSet));
    this.ApiParameterScript.savedata('e_commerce_product_kart', apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        window.localStorage.removeItem('myKartData');
      }

    })
    this.getKartInformation();



  }

  private getKartInformation() {

    var sqlQuery = `SELECT p.*, CAST(COALESCE(AVG(pr.product_Rating),0) AS INTEGER) AS product_AVG_Rating, COUNT(pr.product_Rating) AS product_Total_Rating FROM ( SELECT * FROM e_commerce_product ep INNER JOIN e_commerce_product_kart epk ON epk.product_CART_ID = ep.product_Id WHERE ep.product_Live_Status = 'active' AND epk.product_CART_BY_Email = '${this.AppService.authStatus.email}' ) p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id;`
    this.ApiParameterScript.fetchDataFormQuery(sqlQuery).subscribe((res: any) => {
      console.log("kart data", res);
      if (res.success) {
        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })
        this.allKartItem = res['data'];
        console.log("allKartItem", this.allKartItem);

      }

    })


  }



  stepUp(index: number) {

    if (this.allKartItem[index].product_Quantity_Available >= this.allKartItem[index].product_CART_QUANTITY) this.allKartItem[index].product_CART_QUANTITY += 1
  }
  stepDown(index: number) {
    if (1 < this.allKartItem[index].product_CART_QUANTITY) this.allKartItem[index].product_CART_QUANTITY -= 1
  }

  onChangeQuantity(event: any, index: number) {
    console.log("onChangeQuantity",this.allKartItem[index].product_CART_QUANTITY);
    try {
            

          if(this.allKartItem[index].product_CART_QUANTITY && this.allKartItem[index].product_CART_QUANTITY<=this.allKartItem[index].product_Quantity_Available){
            console.log("hi");
            
          }else{
            this.allKartItem[index].product_CART_QUANTITY = 1
          }
      // if (this.allKartItem[index].product_CART_QUANTITY !== '' || this.allKartItem[index].product_CART_QUANTITY !==null) {
 
        
      //   if (this.allKartItem[index].product_CART_QUANTITY > this.allKartItem[index].product_CART_QUANTITY) {
      //     this.allKartItem[index].product_CART_QUANTITY = 1
      //   } else {
      //     // if (this.allKartItem[index].product_CART_QUANTITY == 0) {
      //     //   this.allKartItem[index].product_CART_QUANTITY = 1
      //     // } else {
      //     //   this.allKartItem[index].product_CART_QUANTITY = 1;
      //     // }
      //   }
      // }else{
      //   console.log("hi");
        
      //      this.allKartItem[index].product_CART_QUANTITY = 1;
      // }
    } catch (error) {
      console.log(error);

    }


  }
}
