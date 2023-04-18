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

  public active(){
    const result = document.getElementById('result');
    result?.classList.remove('hidden');
  }

  public deactive(){
    const result = document.getElementById('result');
    result?.classList.add('hidden');
  }

 
}
