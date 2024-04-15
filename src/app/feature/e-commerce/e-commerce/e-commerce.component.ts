import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '../all-product-list/product';
import { ProductService } from '../all-product-list/productservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})

export class ECommerceComponent implements OnInit {
  // [x: string]: any;
  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  bannerItems:any[]=[
    {
      image_url:"assets/e-commerce/248_Fashion_sale_facebook_cover_page_template.jpg"
    },
    {
      image_url:"assets/e-commerce/7874805.jpg"
    }
  ]

  constructor(private productService: ProductService, private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Store : Buying Product , Selling Your Product')
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

  copyCoponCode(copyText: any) {
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    // navigator.clipboard.writeText(copyText);
    alert("Copied the text: " + copyText);
  }

  deactive() {
    console.log("outside");
    const result = document.getElementById('result');
    result?.classList.add('hidden');


  }

}
