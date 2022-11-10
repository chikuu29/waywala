import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthRespose } from '../appInterface/Auth-Respons';
import { user } from '../appModules/userModules';
import { AppService } from '../services/app.service';
const SecureStorage = require('secure-web-storage');
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

var SECRET_KEY = '1E99412323A4ED2WAYWALASECRET_KEY';
var secureCryptoStorage = new SecureStorage(localStorage, {
  hash: function hash(key: any) {
    // key = CryptoJS.SHA256(key, SECRET_KEY);
    key = CryptoJS.SHA256(key, [SECRET_KEY])
    return key.toString();
  },
  encrypt: function encrypt(data: any) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data: any) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  }
});
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  deactiveAutoLogout: any
  constructor(
    private http: HttpClient,
    private _router: Router
  ) {}
  private getApipath() {
    return environment.baseApiURL;
  }
  public signIn(email: any, password: any) {
    return this.http.post<AuthRespose>(`${this.getApipath()}auth/login.php`, {
      email: email,
      password: password,
      isReturnSecureToken: true
    })
  }

  public getAuthStatus() {

    try {
      var loginiinfo = secureCryptoStorage.getItem('authInfo');
      if (loginiinfo != null) {
        return loginiinfo
      } else {
        return undefined;
      }

    } catch (error) {
      return undefined
    }
  }

  public authentication( name: string, email: string, isLogin: boolean, role: String, _refreshkey: any, expiration_date: any) {
    var userInfo = new user(name, email, isLogin, role, _refreshkey, expiration_date)
    this.user.next(userInfo);
    secureCryptoStorage.setItem("authInfo",userInfo);
    this.autoLogout(new Date(expiration_date).getTime() - new Date().getTime())

  }
  public autoSignIn() {
    console.log("AutoSignIn Time", moment().format());
    var authInfo = this.getAuthStatus();
    if (!authInfo) {
      return;
    }
    if (new Date(authInfo.expiration_date).getTime() > new Date().getTime()) {
      console.log("AUTO LOGIN SUCCESSFULL");
      this.authentication(authInfo.name, authInfo.email, true, authInfo.role, authInfo._refreshkey, authInfo.expiration_date)

    } else {
      console.log("YOUR TOKEN EXPIRA");
      this.user.next(null)
      localStorage.clear()

    }

  }
  public autoLogout(expiration_date: any) {
    console.log("activating Auto Logout");
    this.deactiveAutoLogout = setTimeout(() => {
      this.logout()
    }, expiration_date);

  }
  public logout() {
    this.user.next(null);
    location.reload()
    localStorage.clear();
    if (this.deactiveAutoLogout) {
      console.log("deactivating Auto Logout");
      clearTimeout(this.deactiveAutoLogout)
    }

  }

}
