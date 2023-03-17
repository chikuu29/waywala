import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { ApiService } from "../services/api.service";
import { AppService } from "../services/app.service";


@Injectable({
    providedIn: 'root'
})
export class ApiParameterScript {

    constructor(
        private http: HttpClient,
        private appservices: AppService,
        private apiservices: ApiService
    ) {
        console.log("Calling API Parametere");
    }


    /**
     * {
                "select":"*",
                "db":"agriculture_case",
                "projection":"case_id='WAC9981665835533'",
                "loginInfo":{
                                "email":"cchiku1999@gmail.com",
                                    "id": "SURYA1234",
                                    "isLogin": true,
                                    "name": "SURYANARAYAN BISWAL",
                                    "role": "agri"
                            }
                
                }
        }

     * @param db 
     * @param apiData 
     * @returns 
     * @author Suryanarayan Biswal
     * @since 20-10-2022
     */
    public fetchdata(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['db'] = db;
                const appConfig = this.appservices.getappconfig;
                var loginInfo: any = {}
                if (apiData['auth'] && apiData['auth']) {
                    loginInfo = { role: 'GUEST_USER' }
                } else {
                    loginInfo = { role: 'LOGIN_USER' }
                    // loginInfo = this.appservices.authStatus
                }
                let getrole = loginInfo['role'];
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                if (appConfig['roleConfig'][getrole] && outh) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.getdata(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Access Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


    /**
    * {
        "data":"case_status='accepted'",
        "db":"agriculture_case",
        "projection":"case_id='WAC4641665460808ggggddd'",
        "loginInfo":{
                        "email":"cchiku1999@gmail.com",
                            "id": "SURYA1234",
                            "isLogin": true,
                            "name": "SURYANARAYAN BISWAL",
                            "role": "agri"
                    }
        
        }

    * @param db 
    * @param apiData 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 20-10-2022
    */
    public updatedata(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['db'] = db;
                const appConfig = this.appservices.getappconfig;
                const loginInfo = this.appservices.authStatus;
                console.log(loginInfo);

                let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.update(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


    /**
    * {
        "data":"case_status='accepted'",
        "auth":true,
        "multiInsert":boolean,
        "keyName":"["product_ID","product_QUANTITY","product_CART_BY_Email","product_CART_Status","product_CART_CREATED_TIME"],
        "multiData":'[{product_ID:"Test",product_QUANTITY:'Surya',product_CART_BY_Email:'BBSR'}]'
      }
    * @param db 
    * @param apiData 
    * @param multiInsert /boolean 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 20-10-2022
    */
    public savedata(db: string, apiData: any, multiInsert: boolean) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['db'] = db;
                apiData['multiInsert'] = multiInsert
                const appConfig = this.appservices.getappconfig;
                var loginInfo: any = {}
                apiData['multiInsert'] = apiData['multiInsert'] ? apiData['multiInsert'] : false;
                if (apiData['auth'] && apiData['auth']) {
                    loginInfo = { role: 'GUEST_USER' }
                } else {
                    loginInfo = { role: 'LOGIN_USER' }
                }
                let getrole = loginInfo['role'];
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                if (appConfig['roleConfig'][getrole] && (outh || outhForUpdate)) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.save(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.savedata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }



    /**
    * {
       
        "db":"agriculture_case",
        "projection":"case_id='WAC4641665460808ggggddd'",when multidelete is false
        "projection":"case_id",when multidelete is true
        "data":[1,2,3],when multidelete is true
        "multidelete":true/false
        "loginInfo":{
                        "email":"cchiku1999@gmail.com",
                            "id": "SURYA1234",
                            "isLogin": true,
                            "name": "SURYANARAYAN BISWAL",
                            "role": "agri"
                    }
        
        }

    * @param db 
    * @param apiData 
    * @param multidelete 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 20-10-2022
    */
    public deletedata(db: string, apiData: any,multidelete:boolean) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['db'] = db;
                apiData['multidelete']=multidelete;
                // if (apiData['multidelete'] == undefined) {
                //     apiData['multidelete'] = false
                //     apiData['data'] = ''
                // }
                const appConfig = this.appservices.getappconfig;
                const loginInfo = this.appservices.authStatus;
                let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                let outhForDelete = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForDelete'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForDelete'].includes(db) : false : false;
                if (appConfig['roleConfig'][getrole] && (outh && outhForDelete)) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.delete(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied for Delete Operation" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }

    /**
    * {
        "data":"case_status='accepted'",
        "db":"agriculture_case",
        "projection":"case_id='WAC4641665460808ggggddd'",
        "loginInfo":{
                        "email":"cchiku1999@gmail.com",
                            "id": "SURYA1234",
                            "isLogin": true,
                            "name": "SURYANARAYAN BISWAL",
                            "role": "agri"
                    }
        
        }

    * @param db 
    * @param apiData 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 01-11-2022
    */
    public addMedicine(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['db'] = db;
                const appConfig = this.appservices.getappconfig;
                const loginInfo = this.appservices.authStatus;
                let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.addmedicine(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


    /**
    * @param requestid 
    * @param data 
    * @query {"id":1}
    * @returns 
    * @author Suryanarayan Biswal
    * @since 01-11-2022
    */
    public marketPlaceApi(requestid: number, apidata: any) {
        return this.http.get(this.appservices.getApipath() + `agri/market-place/market.php?requestid=${requestid}&apikey=${this.appservices.marketPlaceApiKey()}&query=${encodeURIComponent(JSON.stringify(apidata))}`)
    }
    /**
         
        * @param SqlQuery 
        * @query {"id":1}
        * @returns 
        * @author Suryanarayan Biswal
        * @since 01-11-2022
        */
    public fetchDataFormQuery(query: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                // apiData['db'] = db;
                // const appConfig = this.appservices.getappconfig;
                // const loginInfo = this.appservices.authStatus;
                // let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                // let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                // let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                // if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                //     apiData['loginInfo'] = loginInfo;
                this.apiservices.fetchDataQueryApi(query).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                })
                // } else {
                //     observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                //     observer.complete();
                // }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchDataFormQuery", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


}