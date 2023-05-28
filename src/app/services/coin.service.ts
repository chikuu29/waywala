import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  headers:any;
  constructor(private http:HttpClient,private appservices:AppService) { 
    console.log(this.appservices.baseURL);
    console.log("Calling Api Services");
    var headers = new HttpHeaders()
      .set("Authorization",this.appservices.authStatus?this.appservices.authStatus._refreshkey:this.appservices.getApiKey())
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
    this.headers = headers;
    
  }


  public getcoinAccountStatus(){
    var apiData={
      "mailid":this.appservices.authStatus?this.appservices.authStatus.email:''
    }
    return this.http.post(`${this.appservices.getApipath()}/secure/coin/coin_account_status.php`,apiData,{headers:this.headers});
  }

  public validateOTPForActiveCoinAccount(otp:any){
    var apiData={
      "mailid":this.appservices.authStatus?this.appservices.authStatus.email:'',
      "otp":otp
    }
    return this.http.post(`${this.appservices.getApipath()}/secure/coin/otpmatch.php`,apiData,{headers:this.headers});
  }


}
