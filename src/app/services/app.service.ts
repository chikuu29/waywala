import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { RegistrationService } from './registration.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  // public isLogin: Boolean = false
  constructor() {
    console.log("App Services Calling");

  }

  public getApipath() {
    return environment.baseApiURL;
  }
  public getApiKey() {
    return environment.apiKey;
  }


  // public getLoginInfo(data: any) {
  //   const simpleObservable = new Observable((Observable) => {
  //     var loginiinfo = localStorage.getItem(data);
  //     if (loginiinfo != null) {
  //       Observable.next({ "success": true, data: loginiinfo });
  //       Observable.complete();

  //     }
  //     Observable.next({ "success": false });
  //     Observable.complete();
  //   })
  //   return simpleObservable

  // }
 

  get loginUserData(){
    var loginiinfo = localStorage.getItem('loginiinfo');
    if (loginiinfo != null) {
      return JSON.parse(localStorage.getItem("loginiinfo") || '')
    }else{
      return '';
    }
  }



  





}
