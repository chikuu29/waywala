import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  constructor() { }
  ngOnInit(): void {
  }

  getToPrev() {
    console.log("getToPrev");
    
    this.ngCarousel.prev();
  }
  // Move to next slide
  goToNext() {
    console.log("goToNext");
    this.ngCarousel.next();
  }

}
