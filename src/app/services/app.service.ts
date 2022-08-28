import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  public isLogin: Boolean = false

  constructor() {
    console.log("App Services Calling");

  }

  public getApipath() {
    return environment.baseApiURL;
  }
  public getApiKey() {
    return environment.apiKey;
  }

  





}
