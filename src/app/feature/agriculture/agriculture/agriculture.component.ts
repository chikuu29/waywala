import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent implements OnInit {
  SP = SPINNER.threeStrings;
  loadertext: any = ''

  displayBanner:boolean=true
  allbannerData:any[]=[];

  constructor(
    private ngxService: NgxUiLoaderService,
    private _route: Router,
    private agriculture: AgricultureService,
    private apiParameterScript: ApiParameterScript

  ) { }


  ngOnInit(): void {

    this.agriculture.loadertext.subscribe(res => {
      this.loadertext = res;
    })
    this.getBannerInfo()
  }

  getBannerInfo() {

    let apiData = {
      'select': '*',
      'projection': `display_section='Agriculture' AND display_banner='Yes'`,
      'auth': true
    }
    this.apiParameterScript.fetchdata('banner', apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.allbannerData=res['data']
      }else{
        this.allbannerData=[]
      }

    })
  }
  navigateTostatusPage() {
    this._route.navigateByUrl('/agriculture/check-status')
  }

}
