import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  serchinputValue: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public search() {
    console.log(this.serchinputValue);

    console.log("hi", this.serchinputValue.replace(/\s+/g, '+'));

    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        'q': this.serchinputValue,
        'category': 'Vegitable'
      }
    };
    this.router.navigate(['e-commerce/search'], navigationExtras);

  }

  public searchResult() {
    // console.log("hi", this.serchinputValue.replace(/\s+/g, '+'));
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        'q': this.serchinputValue,
        'category': 'Vegitable'
      }
    };
    this.router.navigate(['e-commerce/search'], navigationExtras);
  }

  public active() {
    const result = document.getElementById('result');
    result?.classList.remove('hidden');
  }

  public deactive() {
    const result = document.getElementById('result');
    // result?.classList.add('hidden');
  }


}
