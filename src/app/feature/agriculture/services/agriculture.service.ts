import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AgricultureService {

  
  loadertext:BehaviorSubject<any>=new BehaviorSubject<any>('');
  constructor(private http: HttpClient, private appservices: AppService) { }
  public createCase(caseData: any) {
    return this.http.post<any>(`${this.appservices.getApipath()}agri/createcase.php`, caseData)
  }

  public fetchCaseStatus(case_id:any){
    var apiData={}
    return this.http.post(`${this.appservices.getApipath()}generic/fetchdata.php`,apiData)
  }


}
