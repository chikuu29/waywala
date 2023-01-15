import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  sliders:any[]=[]
  
  constructor() { }
  ngOnInit(): void {
    this.sliders=[{},{},{}]
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
