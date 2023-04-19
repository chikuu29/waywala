import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ProductService } from '../all-product-list/productservice';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-section/product';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {

  products: Product[]
  constructor(
    private productService: ProductService,
    private ApiParameterScript: ApiParameterScript,
    private appservice: AppService,
    private _rout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._rout.queryParams.subscribe((res: any) => {
      console.log(res);
      
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Name LIKE '${res.q}%' AND e_commerce_product.product_Live_Status='active') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        console.log(res);
        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })
        this.products = res.data
        console.log("ok", this.products);


      })
    })
  }

}
