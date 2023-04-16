import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { ECommerceServicesService } from '../services/e-commerce-services.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  imageURL: string = "https://admin.waywala.com/api/shop/images/"
  public category:string='';
  public allProductList:any[]=[]
  public loadingSkeltonLoader: boolean = true
  constructor(
    private _rout: ActivatedRoute,
    private router: Router,
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private eCommerceServicesService:ECommerceServicesService
  ) { }

  ngOnInit(): void {
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      // this.eCommerceServicesService.refreshComponent.next(true)
      this.category=res.category
      this.getproductList(this.category);

    })
  }

  getproductList(category:any){
    this.imageURL = this.appservices.getAdminApiPath() + "shop/images/"
    this.loadingSkeltonLoader=true;
    var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Category='${this.category}') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`
    this.apiParameterScript.fetchDataFormQuery(query).subscribe(
      (res: any) => {
        // this.blockUI.stop();
        this.loadingSkeltonLoader = false
        if (res.success && res['data'].length > 0) {
          res.data.map((data: any) => {
            data['product_Images'] = data.product_Images.split(',');
          })
          // this.loadingSkeltonLoader = false
          this.allProductList = res['data'];
          console.log("allProductList", this.allProductList);

        } else {
          // this.loadingSkeltonLoader = false
          this.allProductList = []
        }

      }
    )
  }



}
