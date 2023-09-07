import { Component, OnInit } from '@angular/core';
import { categoryList } from 'src/app/appInterface/categoryList';

@Component({
  selector: 'app-agriculture-product-page',
  templateUrl: './agriculture-product-page.component.html',
  styleUrls: ['./agriculture-product-page.component.scss']
})
export class AgricultureProductPageComponent implements OnInit {

  categoryList: categoryList[] = [


  ]
  constructor() { }

  ngOnInit(): void {
    this.categoryList = [
      {
        taitel: "Special Offer",
        url: "",
        image: 'assets/e-commerce/special-offer.png'
      },
      {
        taitel: "Agricultural Medicine",
        url: "/store/category/Agricultural Medicine",
        image: 'assets/e-commerce/agricultural.jpg'
      },
      {
        taitel: "Agricultural Machineries",
        url: "/store/category/Vegetable",
        image: 'assets/e-commerce/Agricultural_machineries.png'
      },
      {
        taitel: "Agricultural Instruments",
        url: "/store/category/Grocery",
        image: 'assets/e-commerce/AgriculturalInstruments.png'
      },
      {
        taitel: "Agricultural Products",
        url: "/store/category/Fashion",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      }
    ]
  }
  deactive() {
    console.log("outside");
    const result = document.getElementById('result');
    result?.classList.add('hidden');
  }
}
