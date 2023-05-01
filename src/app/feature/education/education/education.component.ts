import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  providers: [NgbCarouselConfig]
})
export class EducationComponent implements OnInit {
  images = [1024,1024,1025].map((n) => `https://picsum.photos/id/${n}/900/250`);

  // constructor() { }
  constructor(config: NgbCarouselConfig, private title:Title) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.title.setTitle('Education')
  }

}
