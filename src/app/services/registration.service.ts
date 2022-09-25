import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient,private appservices:AppService) { }
  public signUp(userData:any){
    return this.http.post<any>(`${this.appservices.getApipath()}auth/signup.php?key=${this.appservices.getApiKey()}`,userData)
  }
  public otpValidate(data:any){
    return this.http.post<any>(`${this.appservices.getApipath()}auth/otpvalidate.php`,data)
  }

  public resendOTP(data:any){
    return this.http.post<any>(`${this.appservices.getApipath()}auth/resendotp.php`,data)

  }

  
}
