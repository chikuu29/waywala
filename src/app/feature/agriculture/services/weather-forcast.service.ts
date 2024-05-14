import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {
  private apiKey='edc0b85bbaab57d08c25eea5e8ab1f7a'
  constructor(private http:HttpClient,private app:AppService) { }

  
  public getaddressFormLogitudeAndLatiture(lag:any,lat:any){
      return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lag}&localityLanguage=en`)
  }

  public currentWeatherReportThroughCity(city:string){

    const url = this.app.getApipath() +'weather/weather.php';
    let params = new HttpParams().set('q', city.toLowerCase());
   // Make GET request with parameters
   return this.http.get(url, { params });

  }

  public getfutureWeatherData(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city.toLowerCase()}&appid=${this.apiKey}`)
  }


}
