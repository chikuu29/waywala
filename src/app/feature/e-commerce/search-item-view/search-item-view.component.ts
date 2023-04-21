import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { AppService } from 'src/app/services/app.service';

import { ProductService } from '../all-product-list/productservice';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Product } from '../product-section/product';

@Component({
  selector: 'app-search-item-view',
  templateUrl: './search-item-view.component.html',
  styleUrls: ['./search-item-view.component.scss']
})
export class SearchItemViewComponent implements OnInit {

  products: Product[] = []
  searchText: any = '';
  sortByOption:any=[{name:"Low-High"},{name:'High-Low'},{name:'Newest'}];
  selctedsortByOption:any;
  constructor(
    private productService: ProductService,
    private ApiParameterScript: ApiParameterScript,
    private appservice: AppService,
    private _rout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._rout.queryParams.subscribe((res: any) => {
      console.log(res);
      this.searchText = res.q
      this.createSearch_HISTORY(res.q)
      var query = `SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE (e_commerce_product.product_Name LIKE '%${res.q}%' OR e_commerce_product.product_Category LIKE '%${res.q}%' ) AND e_commerce_product.product_Live_Status='active') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`
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

  createSearch_HISTORY(data: any) {


    var query = {
      "select": "*",
      "projection": `search_BY='${this.appservice.authStatus ? this.appservice.authStatus.email : ''}' AND search_text='${data}'`
    }

    this.ApiParameterScript.fetchdata('search_history', query).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
      } else {
        var apiData = {
          "data": `search_BY='${this.appservice.authStatus ? this.appservice.authStatus.email : ''}',create_modify_date_time='${moment().format('DD MMM YYYY, hh:mm A')}',search_text='${data}',search_category='${data}'`

        }
        this.ApiParameterScript.savedata('search_history', apiData, false).subscribe((res) => {
          console.log(res);

        })
      }
    })


  }
}
