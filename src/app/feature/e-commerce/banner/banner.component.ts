import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  images:any[]=[
    {
      image_url:"assets/e-commerce/248_Fashion_sale_facebook_cover_page_template.jpg"
    },
    {
      image_url:"assets/e-commerce/7874805.jpg"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
