import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {
  private apiKey='edc0b85bbaab57d08c25eea5e8ab1f7a'
  constructor(private http:HttpClient) { }

  
  public getaddressFormLogitudeAndLatiture(lag:any,lat:any){
      return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lag}&localityLanguage=en`)
  }

  public currentWeatherReportThroughCity(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${this.apiKey}`);

  }


}
