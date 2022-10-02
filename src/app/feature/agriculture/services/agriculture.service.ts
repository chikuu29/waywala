import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AgricultureService {

  constructor(private http: HttpClient, private appservices: AppService) { }


  public createCase(caseData: any) {

    return this.http.post<any>(`${this.appservices.getApipath()}agri/createcase.php`, caseData)

  }
}
