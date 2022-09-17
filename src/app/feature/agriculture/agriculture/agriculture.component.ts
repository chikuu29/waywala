import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent implements OnInit {
  SP = SPINNER.squareJellyBox;
  constructor(private ngxService: NgxUiLoaderService,private _route:Router) { }

  ngOnInit(): void {
  
    console.log(this._route);
    

  }
  navigateTostatusPage(){
    this._route.navigateByUrl('/agriculture/check-status')
  }
}
