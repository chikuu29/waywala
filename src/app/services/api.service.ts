import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any;
  constructor(private http: HttpClient,private appservices:AppService) {
    console.log("Calling Api Services");
    var headers = new HttpHeaders()
      .set("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNjaGlrdTE5OTlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmOWMyMWQwMzFkY2IyZmYxMDk0Yzc4NDkwOGM4ZmRlZiIsInRpbWUiOjE2NjQ1NzM5ODcsImlkIjoiNzc1MDA2MTU2NTE2NjQ1NzM5ODcifQ.bBhYfz1W-BNfUnQtQKEys0oXkXw4nlXlKjEZfc-4xZs")
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
    this.headers = headers;

 

  }
  public getdata(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'generic/fetchdata.php', apiData, { headers: this.headers });
  }

  public update(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/update.php',apiData,{ headers: this.headers })

  }
  public delete(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/deletedata.php',apiData,{ headers: this.headers })
  }

  public save(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/savedata.php',apiData,{ headers: this.headers })
  }

  public addmedicine(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'medicine/creatmed.php',apiData,{ headers: this.headers })
  }
  

  public fetchDataQueryApi(query:any){
    return this.http.get(this.appservices.getApipath() + 'generic/getDataFormQuery.php?query='+encodeURIComponent(JSON.stringify(query)));
  }








  



}
