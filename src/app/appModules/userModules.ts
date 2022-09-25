import * as moment from "moment";

export class User{
    constructor(
        public name:String ,
        public email:String,
        private _token:String ,
        private _tokenExpiration:any
    ){
    
    }



    get token(){

        if (moment().format('MMMM Do YYYY, h:mm:ss a') >= moment(this._tokenExpiration).format('MMMM Do YYYY, h:mm:ss a')) {
            return this._token;
        }else{
            return null;
        }
       
    }
}