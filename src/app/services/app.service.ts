import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const appConfig = require('../../config/config.json')
const appDetailConfig= require('../../config/app.json')
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appConfig: any;
  private appDetailConfig:any;
 
  // public isLogin: Boolean = false
  constructor(private _auth:AuthService) {
    this.appConfig=appConfig;
    this.appDetailConfig=appDetailConfig
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

  get getappVersion(){
    return this.appDetailConfig
  }


  





}
