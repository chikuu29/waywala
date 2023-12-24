import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationServiceServiceService {

  constructor(private http:HttpClient,private app:AppService) { }

  getRandomNumber(){
    var crypto=window.crypto
    var array=new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  initStartUpAPIConfiugration(){
      return new Promise<void>((resolve,reject)=>{
        this.http.get('../../config/config.json?var_'+this.getRandomNumber()).subscribe((config:any)=>{
          if(Object.keys(config).length>0){
            console.log(config);
            this.app.startUpAPIConfigSetup=config;
            // resolve()
          }
          resolve()
        },err=>{
          resolve()
        })
      })
  }
  initStartAppConfiugration(){
    return new Promise<void>((resolve,reject)=>{
      this.http.get('../../config/app.json?var_'+this.getRandomNumber()).subscribe((config:any)=>{
        if(Object.keys(config).length>0){
          console.log(config);
          this.app.setAppVersion=config;
          // resolve()
        }
        resolve()
      },err=>{
        resolve()
      })
    })
}
}
