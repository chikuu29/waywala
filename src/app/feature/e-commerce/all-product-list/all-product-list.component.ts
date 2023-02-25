import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from './product';
import { ProductService } from './productservice';

@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-product-list.component.html',
  styleUrls: ['./all-product-list.component.scss']
})
export class AllProductListComponent implements OnInit {

  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().then((data: any) => this.products = data);
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
