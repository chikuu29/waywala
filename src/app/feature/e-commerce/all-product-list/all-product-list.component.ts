import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
// import { Product } from './product';
import { ProductService } from './productservice';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Product } from '../product-section/product';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-product-list.component.html',
  styleUrls: ['./all-product-list.component.scss']
})
export class AllProductListComponent implements OnInit {

  @Input() products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  imageURL: string = "https://admin.waywala.com/api/shop/images/"
  constructor(
    private productService: ProductService,
    private ApiParameterScript: ApiParameterScript,
    private appservice: AppService,

  ) { }

  ngOnInit() {
    this.imageURL = this.appservice.getAdminApiPath() + "shop/images/";




   

    // this.productService.getProducts().then((data: any) => this.products = data);
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
