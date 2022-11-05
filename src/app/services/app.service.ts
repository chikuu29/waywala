import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { RegistrationService } from './registration.service';
const appConfig = require('../../config/config.json')

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appConfig: any;
 
  // public isLogin: Boolean = false
  constructor(private _auth:AuthService) {
    this.appConfig=appConfig;
    console.log("App Services Calling");

  }

  public getApipath() {
    return environment.baseApiURL;
  }
  public getApiKey() {
    return environment.apiKey;
  }
  get authStatus() {
    return this._auth.getAuthStatus();
  }
  get getappconfig() {
    return this.appConfig;
  }



  





}
