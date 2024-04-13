import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any;
  constructor(private http: HttpClient, private appservices: AppService) {
    console.log("Calling Api Services");
    var headers = new HttpHeaders()
      .set("Authorization", this.appservices.authStatus ? this.appservices.authStatus._refreshkey : this.appservices.getApiKey())
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8,application/json")
    this.headers = headers;



  }
  public getdata(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'generic/fetchdata.php', apiData, { headers: this.headers });
  }

  public update(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'generic/update.php', apiData, { headers: this.headers })

  }
  public delete(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'generic/deletedata.php', apiData, { headers: this.headers })
  }

  public save(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'generic/savedata.php', apiData, { headers: this.headers })
  }

  public addmedicine(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'medicine/creatmed.php', apiData, { headers: this.headers })
  }


  public fetchDataQueryApi(query: string) {

    const params = { query: encodeURIComponent(query) };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.appservices.getApipath() + 'generic/getDataFormQuery.php', { params, headers });
  }

  public dyamicApiCall(path: any, data: any) {
    return this.http.post(this.appservices.getApipath() + path, data, { headers: this.headers })

  }











}
