export class User{
    constructor(
        public name:String,
        public email:String,
        private _token:String,
        //private _tokenExpiration:Date
    ){
    
    }



    get token(){
        return this._token;
    }
}