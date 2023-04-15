import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SPINNER } from 'ngx-ui-loader';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Waywall';

  constructor(
    public _router: Router,
    private _auth: AuthService,
    private loaderconfig: LoaderService
  ) {


  }
  SP: any = 'SPINNER.foldingCube';
  loadertext: any = 'Please Wait'

  ngOnInit(): void {
    this.loaderconfig.SP.subscribe(res => {
      this.SP = res;
    })
    this.loaderconfig.loadertext.subscribe(res => {
      this.loadertext = res;
    })

    console.log("app Start");
    this._auth.autoSignIn();


  }

  display_fottor() {

    var hidden_footer = ['auth/login', 'e-commerce/my/bag','/e-commerce/my/order','agriculture/mycase','/pages/profile','/e-commerce/product/','/pages/register','/agriculture/weather','/agriculture/kvks','/agriculture/check-status']
    var isAllowTo_show_footer = true;
    hidden_footer.forEach((url: any) => {
          if(this._router.url.includes(url))isAllowTo_show_footer=false
    })

    return isAllowTo_show_footer;
  }

}
