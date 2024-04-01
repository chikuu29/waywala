import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoryList } from 'src/app/appInterface/categoryList';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  @Input() categoryList: any[] = []
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.categoryList.length == 0) {
      this.http.get('../../../../config/productCategory.json').subscribe((res: any) => {
        console.log(res);
        this.categoryList = res

      })
    }
  }

  viewSubcategoryPage(category: any, subcategory: any) {
    console.log("category", category);
    console.log("subcategory", subcategory);
    var url = `/store/category/${category.categories}/subcategory/${subcategory}`
    this.router.navigateByUrl(url)
    // /store/category/Agriculture
  }

}
