import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  serchinputValue:any;
  constructor() { }

  ngOnInit(): void {
  }

  public search(){
    console.log(this.serchinputValue);
    
  }
}
