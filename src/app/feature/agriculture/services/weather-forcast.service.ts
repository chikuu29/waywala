import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {

  constructor(private http:HttpClient) { }


  public getaddressFormLogitudeAndLatiture(lag:any,lat:any){
      return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lag}&localityLanguage=en`)
  }


}
