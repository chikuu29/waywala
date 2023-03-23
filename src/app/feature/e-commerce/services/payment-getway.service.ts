import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentGetwayService {

  get native_window() {
    return _window();
  }
  headers: any;
  constructor(private http: HttpClient, private AppService: AppService) {
    var headers = new HttpHeaders()
      .set("Authorization", this.AppService.authStatus._refreshkey)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
    this.headers = headers;
  }

  createOrder(apiData: any,requestID:any) {
    apiData['loginInfo'] =this.AppService.authStatus;
    return this.http.post(`${this.AppService.getApipath()}secure/create_order.php?r=${requestID}`,apiData,{ headers: this.headers });
  }

  orderStatus(order_id:any){
    return this.http.get(`${this.AppService.getApipath()}secure/getstatus.php?order_id=${order_id}`)
  }



}
