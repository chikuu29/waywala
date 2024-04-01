import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categoryList } from 'src/app/appInterface/categoryList';

@Component({
  selector: 'app-agriculture-product-page',
  templateUrl: './agriculture-product-page.component.html',
  styleUrls: ['./agriculture-product-page.component.scss']
})
export class AgricultureProductPageComponent implements OnInit {

  categoryList: categoryList[] = []
  public category: string = '';
  public allProductList: any[] = []
  public loadingSkeltonLoader: boolean = true
  constructor(
    private _rout: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.categoryList = [
      
      {
        taitel: "Agricultural Medicine",
        url: "/store/agriculture/product/Agricultural Medicine",
        image: 'assets/e-commerce/agricultural.jpg',
        subcategories:[]
      },
      {
        taitel: "Agricultural Machineries",
        url: "/store/agriculture/product/Agricultural Machineries",
        image: 'assets/e-commerce/Agricultural_machineries.png'
      },
      {
        taitel: "Agricultural Instruments",
        url: "/store/agriculture/product/Agricultural Instruments",
        image: 'assets/e-commerce/AgriculturalInstruments.png'
      },
      {
        taitel: "Agricultural Products",
        url: "/store/agriculture/product/Agricultural Products",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      },
      {
        taitel: "Agricultural Products",
        url: "/store/agriculture/product/Agricultural Products",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      }
      ,
      {
        taitel: "Agricultural Seeds",
        url: "/store/agriculture/product/Seeds",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      },
      {
        taitel: "Agricultural Vegetables",
        url: "/store/agriculture/product/Vegetables",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      },
      {
        taitel: "Agricultural Fruits",
        url: "/store/agriculture/product/Fruits",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      },
      {
        taitel: "Agricultural Fertilizers",
        url: "/store/agriculture/product/Fertilizers",
        image: 'assets/e-commerce/AgriculturalProducts.png'
      }
    ]
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      // this.eCommerceServicesService.refreshComponent.next(true)
      this.category = res.category
      // this.getproductList(this.category);

    })
  }
  deactive() {
    console.log("outside");
    const result = document.getElementById('result');
    result?.classList.add('hidden');
  }
}
