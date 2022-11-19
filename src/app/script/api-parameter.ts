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
        private apiservices:ApiService
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
                var loginInfo:any ={}
                if(apiData['auth'] && apiData['auth']){
                    loginInfo  = {role:'user'}
                }else{
                    loginInfo=this.appservices.authStatus
                }
                let getrole = loginInfo['role'] ? loginInfo['role'] : 'user';
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
    public savedate(db: string, apiData: any) {
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
                    this.apiservices.save(apiData).subscribe((res: any) => {
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



}