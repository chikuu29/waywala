import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import {map, Observable,take } from 'rxjs';
import { AppService } from '../services/app.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private appservices: AppService,private _auth: AuthService,private _router:Router) {
      console.log("AuthGaurd Activated");
      
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("auth Status->>>", this.appservices.authStatus);

    return this._auth.user.pipe(
      take(1),
      map(user=>{
        if(user && user.isLogin){
          return true;
        }else{
          return this._router.createUrlTree(['pages/error']);
        }
      })
    );
  }

}
