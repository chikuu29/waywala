import { Injectable } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loadertext:BehaviorSubject<any>=new BehaviorSubject<any>('Please Wait');
  SP:BehaviorSubject<SPINNER>=new BehaviorSubject<SPINNER>(SPINNER.ballScaleMultiple)
  constructor() { }
}
