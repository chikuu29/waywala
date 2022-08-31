import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthRespose } from '../appInterface/Auth-Respons';
import { User } from '../appModules/userModules';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();


  constructor(private http:HttpClient,private appaservices:AppService) { }

  public login(email:any,password:any){
    return this.http.post<AuthRespose>(`${this.appaservices.getApipath()}login.php`,{
      email:email,
      password:password,
      isReturnSecureToken:true
    }).pipe(
      tap(res=>{
        this.authenticatedUser(res.name,res.email,res.refreshToken?'':'')
        
      })
    );
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


  private authenticatedUser(name: String,email: String,token: String){


    const user= new User(name,email,token);

    console.log("userData",user);
    
    this.user.next(user);


  }
  

}
