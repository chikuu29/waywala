import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const appConfig = require('../../config/config.json')
const appDetailConfig = require('../../config/app.json')
const country_state_district = require('../../config/country_state_district.json')

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appConfig: any;
  private appDetailConfig: any;
  private country_state_district_Data: any;
  // public isLogin: Boolean = false
  constructor(private _auth: AuthService) {
    this.appConfig = appConfig;
    this.appDetailConfig = appDetailConfig
    this.country_state_district_Data = country_state_district['states']
    console.log("App Services Calling");
  }
  public getAdminApiPath() {
    return environment.baseAdminApiURL;
  }
  public getApipath() {
    return environment.baseApiURL;
  }
  public getApiKey() {
    return environment.apiKey;
  }

  get baseURL(){
    return environment.baseURL;
  }

  public marketPlaceApiKey() {
    return environment.marketPlaceApiKey;
  }

  get authStatus() {
    return this._auth.getAuthStatus();
  }
  get getappconfig() {
    return this.appConfig;
  }

  get getappVersion() {
    return this.appDetailConfig
  }

  get country_state_district(){
    return this.country_state_district_Data
  }







}
