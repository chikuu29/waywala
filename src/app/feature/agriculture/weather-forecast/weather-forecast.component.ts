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
  public locationInfo: any = {
    'city': '',
    'state': '',
    'country': '',
    'countryCode': '',
    'locality': ''
  }
  WeatherData: any;
  constructor(private weatherForcastService: WeatherForcastService) { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    };
    console.log(this.WeatherData);
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
            if (res) {
              this.locationInfo['city'] = res.city;
              this.locationInfo['state'] = res.principalSubdivision;
              this.locationInfo['country'] = res.countryName;
              this.locationInfo['countryCode'] = res.countryCode;
              this.locationInfo['locality'] = res.locality;
              this.weatherForcastService.currentWeatherReportThroughCity(res.city).subscribe((weatherdata)=>{
                console.log('weatherdata',weatherdata);
                this.setWeatherData(weatherdata)
              })
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

  setWeatherData(data: any) {
    console.log("weatherDate", data);

    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    const date = new Date();
    const hours = date.getHours();
    console.log(hours);
    this.WeatherData.isDay = hours >= 6 && hours <= 18;
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
