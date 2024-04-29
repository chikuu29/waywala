
import { Injectable } from '@angular/core';
const SecureStorage = require('secure-web-storage');
import * as CryptoJS from 'crypto-js';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from wherever you have stored it
    // const token = localStorage.getItem('authToken'); // You can store token in local storage for this example
    try {
     
      var loginInfo = secureCryptoStorage.getItem('authInfo');
      if (loginInfo) {
      //  console.log("If a token exists, append it to the Authorization header")
        const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${loginInfo._refreshkey}`)
        });
        return next.handle(clonedRequest);
      } else {
        // If no token, proceed with the original request
        // console.log("If no token, proceed with the original request");
        
        return next.handle(request);
      }

    } catch (error) {
      // If no token, proceed with the original request
      // console.log("No TOKEN");
      return next.handle(request);
    }

    // If no token, proceed with the original request
    // return next.handle(request);
  }
}
