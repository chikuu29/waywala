import { Component, Input, OnInit } from '@angular/core';
import { categoryList } from 'src/app/appInterface/categoryList';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  @Input() categoryList: categoryList[] = [
    {
      taitel: "Special Offer",
      url: "/store/my-offer",
      image: 'assets/e-commerce/special-offer.png'
    },
    {
      taitel: "Vegetable",
      url: "/store/category/Vegetable",
      image: 'assets/e-commerce/vegitable.jpg'
    },
    {
      taitel: "Grocery",
      url: "/store/category/Grocery",
      image: 'assets/e-commerce/grocery.png'
    },
    {
      taitel: "Fashion",
      url: "/store/category/Fashion",
      image: 'assets/e-commerce/fashion.png'
    },
    {
      taitel: "Agricultural Medicine",
      url: "/store/category/Agricultural Medicine",
      image: 'assets/e-commerce/agricultural.jpg'
    }
    


  ]
  constructor() { }

  ngOnInit(): void {

  }

}
