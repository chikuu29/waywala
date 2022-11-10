import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent implements OnInit {
  SP = SPINNER.threeStrings;
  loadertext:any=''
  constructor(private ngxService: NgxUiLoaderService,private _route:Router,private agriculture:AgricultureService) { }
  
  ngOnInit(): void {
  
    
    this.agriculture.loadertext.subscribe(res=>{
        this.loadertext=res;
    })
  }
  navigateTostatusPage(){
    this._route.navigateByUrl('/agriculture/check-status')
  }

}
