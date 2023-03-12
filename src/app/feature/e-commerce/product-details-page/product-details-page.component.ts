import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { Product } from '../product-section/product';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {

  product: Product={};
  imageURL:string='https://admin.waywala.com/api/shop/images/'
  activeImage:string
  constructor(private _rout: ActivatedRoute, private apiParameterScript: ApiParameterScript,private appservices:AppService) {
    this.imageURL=this.appservices.getAdminApiPath()+"/shop/images/";
    console.log("this",this.imageURL);
    
   }

  ngOnInit(): void {

    this._rout.params.subscribe((res: any) => {
      console.log(res);
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Category='Vegetable' AND e_commerce_product.product_Id='${res.productID}') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`;

      this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        console.log(res);
        if (res.success && res['data'].length > 0) {
          res.data.map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })
          this.product=res['data'][0];
          this.activeImage=this.imageURL+this.product['product_Images'][0]
          

        } else {
          this.product ={}
        }

      })



    })
  }

  clickSideImage(imageUrl:any){
    this.activeImage=imageUrl
  }
}

