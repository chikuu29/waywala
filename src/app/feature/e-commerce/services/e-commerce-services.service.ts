import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ECommerceServicesService {

  refreshComponent=new BehaviorSubject<any>(null)
  public generateCartItemCount = new BehaviorSubject<any>(true)
  constructor(
    private AppService: AppService,
    private apiParameterScrpt: ApiParameterScript
  ) {
    console.log("Calling ECommerceServicesService");
    
  }

  public bagItemCount() {
    const simpleObservable = new Observable((observer) => {
      this.apiParameterScrpt.fetchdata("e_commerce_product_kart", { "select": "COUNT(product_CART_ID) as count", "projection": `product_CART_BY_Email='${this.AppService.authStatus?.email}'` }).subscribe((res: any) => {

        try {
          if (res.success && res['data'].length > 0) {
            observer.next({ "myBagDataCount": parseInt(res['data'][0]['count']) });
            observer.complete();
          } else {
            observer.next({ "myBagDataCount": 0 });
            observer.complete();
          }
        } catch (error) {
          // console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
          observer.next({ "myBagDataCount": 0 });
          observer.complete();
        }




      })
    })
    return simpleObservable;
  }
}

