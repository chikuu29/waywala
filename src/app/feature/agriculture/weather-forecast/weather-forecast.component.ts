import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { WeatherForcastService } from '../services/weather-forcast.service';
import { Title } from '@angular/platform-browser';
moment.locale('yourlang', {
  calendar: {
    nextDay: function () {
      return '[Tomorrow]';
    },
    sameDay: function () {
      return '[Today]';
    },
    lastWeek: function () {
      return '[last] dddd';
    },
    nextWeek: function () {
      return 'MMMM Do YYYY';
    }
  }
});

// lastDay : '[Yesterday]',
//     sameDay : '[Today]',
//     nextDay : '[Tomorrow]',
//     lastWeek : '[last] dddd',
//     nextWeek : 'dddd',
//     sameElse : 'L'
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public lat: any;
  public lng: any;
  public locationInfo: any = {
    'city': '',
    'state': '',
    'country': '',
    'countryCode': '',
    'locality': ''
  }
  public todayWeatherReport: any[] = []
  WeatherData: any;
  public currentDateTime: any = moment().calendar()
  public currentWeatherData: any = {}
  public selectfutureCurrentWeatherData: any = {}
  public predictionfutureData: any[] = []
  public predictionDate: any[] = []
  public isdayNight: boolean = moment().hours() >= 6 && moment().hours() <= 18;
  public skeleton_loader_active=true;

  constructor(
    private weatherForcastService: WeatherForcastService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle("WEATHER REPORT:-")
    // let hour = moment().hours();
    // this.isdayNight = moment().hours() >= 6 && moment().hours() <= 18
    this.WeatherData = {
      main: {},
      isDay: true
    };
    console.log(this.WeatherData);
    this.getLocation()
  }
  private getLocation() {

    console.log("getLocation",navigator);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // this.blockUI.start("Fetching Weather Data...")
          this.weatherForcastService.getaddressFormLogitudeAndLatiture(this.lng, this.lat).subscribe((res: any) => {
            console.log(res);
            if (res) {
              this.title.setTitle("WEATHER REPORT : "+res.city)
              this.locationInfo['city'] = res.city;
              this.locationInfo['state'] = res.principalSubdivision;
              this.locationInfo['country'] = res.countryName;
              this.locationInfo['countryCode'] = res.countryCode;
              this.locationInfo['locality'] = res.locality;
              this.weatherForcastService.currentWeatherReportThroughCity(res.city).subscribe((weatherdata) => {
                console.log(weatherdata);
                
                // console.log('weatherdata', weatherdata);
                
              },(error:any)=>{
                  this.weatherForcastService.currentWeatherReportThroughCity(res.locality).subscribe((dt:any)=>{
                    this.setWeatherData(dt)
                  })
              })
              this.weatherForcastService.getfutureWeatherData(res.city).subscribe((futureWeatherData: any) => {
                // console.log("futureWeatherData", futureWeatherData);
                this.setCurrentPredictionWeatherData(futureWeatherData['list'], true);
                this.setPredictionWeatherData(futureWeatherData);

              },(err:any)=>{
                this.weatherForcastService.getfutureWeatherData(res.locality).subscribe((dt:any)=>{
                  this.setCurrentPredictionWeatherData(dt['list'], true);
                  this.setPredictionWeatherData(dt);
                })
              })
            }else{
              alert("Some Things Went Wrong")
              console.log(res);
              
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

  setCurrentPredictionWeatherData(data: any, today: boolean) {
    // console.log("setPredictionWeatherData", data);
    // console.log("moment", moment().format('YYYY-MM-DD').toString());
    if (today) {
      this.todayWeatherReport = _.filter(data, (e) => {
        return e['dt_txt'].includes(moment().format('YYYY-MM-DD').toString())
      })
    } else {
      this.todayWeatherReport = data
    }


    this.todayWeatherReport.forEach((i: any) => {
      let hour = new Date(i.dt_txt).getHours();
      i['isday'] = hour >= 6 && hour <= 18
      if (hour >= 6 && hour <= 18) {
        i['image'] = `https://openweathermap.org/img/w/${i.weather[0].icon.replace('n', 'd')}.png`

      } else {
        i['image'] = `https://openweathermap.org/img/w/${i.weather[0].icon.replace('d', 'n')}.png`
      }


    })

    console.log("findToaday Date", this.todayWeatherReport);

    this.currentWeatherData = this.todayWeatherReport[0]

  }

  getweatherDataBaseOntime(data: any) {
    console.log("data", data);

    this.currentWeatherData = data
  }

  //set pediction weather infomation
  setPredictionWeatherData(data: any) {
    // this.blockUI.stop()
    this.skeleton_loader_active=false;
    console.log("setPredictionWeatherData", data);
    var tempFuretureData = {}
    // Get today's date
    let today = moment();

    // Loop through the next n days, adding each date to the array
    for (let i = 0; i < 7; i++) {
      // Create a new moment object for the current day
      let date = moment(today).add(i, 'days');
      // Add the date to the array
      tempFuretureData = _.filter(data['list'], (e) => {
        return e['dt_txt'].includes(date.format('YYYY-MM-DD').toString())
      })
      this.predictionfutureData.push(tempFuretureData)
      this.predictionDate.push(date.calendar());
    }
    console.log("futureDate", this.predictionDate);

    console.log("predictionfutureData", this.predictionfutureData);
    this.selectfutureCurrentWeatherData=this.predictionfutureData[0][0]





  }
  getFeatureweatherDataBaseOntime(i: any) {
    this.selectfutureCurrentWeatherData=this.predictionfutureData[i][0]
    // console.log("getFeatureweatherDataBaseOntime",this.predictionfutureData[i][0]);
  }

  view(i: any) {
    console.log();
    this.currentDateTime=this.predictionDate[i]
    this.setCurrentPredictionWeatherData(this.predictionfutureData[i], false)
  }

}
