import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private appaservices:AppService) { }

  public login(data:any){
    return this.http.post<any>(`${this.appaservices.getApipath()}login.php`,data);
  }




  public getLoginInfo(data: any) {
    const simpleObservable = new Observable((Observable) => {
      var loginiinfo=localStorage.getItem(data);
      if(loginiinfo!=null){
        Observable.next({"success": true,data:loginiinfo});
        Observable.complete();

      }
      Observable.next({ "success": false});
      Observable.complete();
    })
    return simpleObservable

  }

  public clearLoginInfo() {

    const simpleObservable = new Observable((Observable) => {
      localStorage.clear();
      Observable.next({ "success": true });
      Observable.complete();
    })
    return simpleObservable

  }

}
