import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  public isLogin:Boolean=false

  constructor(private router:Router) { 
    console.log("App Services Calling");
   
    
  }


  


}
