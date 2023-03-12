import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { Product } from './product';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {

  @Input() sectionName:String="Section Name"

  allProductList:Product[]=[];
  imageURL:string="https://admin.waywala.com/api/shop/images/"
  constructor(private apiParameterScript:ApiParameterScript,private router:Router,private appservice:AppService) { 

  }

  ngOnInit(): void {
    console.log(this.sectionName);
    this.imageURL=this.appservice.getAdminApiPath()+"shop/images/"
    // this.allProductList
    var query=`SELECT p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Category='Vegetable') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`
    this.apiParameterScript.fetchDataFormQuery(query).subscribe((res:any)=>{
      console.log(res);
      if(res.success && res['data'].length>0){
        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })
        this.allProductList=res['data'];
        console.log("allProductList",this.allProductList);
        
      }else{
        this.allProductList=[]
      }
      
    })
    
  }

}
