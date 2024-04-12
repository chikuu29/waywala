import { Component, Input, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Product } from '../product-section/product';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-suggested-product-list',
  templateUrl: './suggested-product-list.component.html',
  styleUrls: ['./suggested-product-list.component.scss']
})
export class SuggestedProductListComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @Input() sectionName: String = "Section Name"
  @Input() search_by: String = "Books & Education"
  @Input() allProductList: Product[] = [];
  @Input() loadingSkeltonLoader: boolean = true;
  @Input() imageURL: string = "https://admin.waywala.com/api/shop/images/"
  @Input() nodataVisible: boolean = false
  @Input() productSectionMode: boolean = true
  constructor(
    private apiParameterScript: ApiParameterScript,
    private router: Router,
    private appservice: AppService
  ) { }

  ngOnInit(): void {

    this.imageURL = this.appservice.getAdminApiPath() + "shop/images/";
    if (this.productSectionMode) {
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND 
      (e_commerce_product.product_Category LIKE '%${this.search_by}%' OR e_commerce_product.product_SubCategory LIKE '%${this.search_by}%' OR e_commerce_product.product_Description LIKE '%${this.search_by}%'))
 p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`
      this.apiParameterScript.fetchDataFormQuery(query).subscribe(

        (res: any) => {
          console.log("Suggested Product", res);
          console.log("Suggested Product", res);
          // this.blockUI.stop();
          if (res.success && res['data'].length > 0) {
            res.data.map((data: any) => {
              data['product_Images'] = data.product_Images.split(',');
            })
            this.loadingSkeltonLoader = false
            this.allProductList = res['data'];
            console.log("allProductList", this.allProductList);

          } else {
            this.loadingSkeltonLoader = false
            this.allProductList = []
          }

        }, (error: any) => {
          console.log("error", error);

        }
      )
    } else {
      this.loadingSkeltonLoader = false
      this.allProductList = []
    }
  }

}
