import { Component, OnInit } from '@angular/core';
import { WeatherForcastService } from '../services/weather-forcast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  public lat: any;
  public lng: any;
  public locationInfo:any={
    'city':'',
    'state':'',
    'country':'',
    'countryCode':'',
    'locality':''
  }
  constructor(private weatherForcastService: WeatherForcastService) { }

  ngOnInit(): void {
    this.getLocation()
  }
  private getLocation() {


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.weatherForcastService.getaddressFormLogitudeAndLatiture(this.lng, this.lat).subscribe((res: any) => {
            console.log(res);
            if(res){
              this.locationInfo['city']=res.city;
              this.locationInfo['state']=res.principalSubdivision;
              this.locationInfo['country']=res.countryName;
              this.locationInfo['countryCode']=res.countryCode;
              this.locationInfo['locality']=res.locality;
            }
          })

        }
      }, () => {
        alert('User not allowed')
      }, { timeout: 10000 })

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
