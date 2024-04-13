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
  @Input() singleLineScoller:boolean=false
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.categoryList.length == 0) {
      this.http.get('../../../../config/productCategory.json').subscribe((res: any) => {
        // console.log(res);
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
  // Check if the current route matches the category's route
  isActive(category: any): boolean {
    // return this.router.isActive('/store/category/' + category.categories, true);
    const currentUrl = decodeURIComponent(this.router.url); // Decode the current URL
    // const currentUrl = this.router.url;
    var categoryUrl = `/store/category/${category.categories}`;
    const subcategoryUrlPrefix = `/store/category/${category.categories}/subcategory/`;
    // console.log("cu", currentUrl);
    // console.log(currentUrl.startsWith(categoryUrl));
    // // console.log(currentUrl.startsWith(categoryUrl));
    // console.log(currentUrl.startsWith(subcategoryUrlPrefix));
    // const agri_categoryUrl = `/store/category/${category.categories}`;
    // const agri_subcategoryUrlPrefix = `/store/category/${category.categories}/subcategory/`;
    // console.log(categoryUrl,subcategoryUrlPrefix);
    
    if (category.actualCategory) {

      categoryUrl=`/store/agriculture/product/${category?.categories}`

    } else {
      categoryUrl = `/store/category/${category?.categories}`
     
    }

    return currentUrl.startsWith(categoryUrl) || currentUrl.startsWith(subcategoryUrlPrefix);
  }


  navigate(category: any) {

    var url = ""

    if (category.actualCategory) {

      url=`/store/agriculture/product/${category?.categories}`

    } else {
      url = `/store/category/${category?.categories}`
     
    }
    this.router.navigateByUrl(url)
    // [routerLink]="category?.url?category?.url:'/store/category/'+category?.categories"
  }

}
