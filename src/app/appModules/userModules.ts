
export class user{
    constructor(
        public name:String ,
        public email:String,
        public isLogin:boolean,
        public role:any,
        private _refreshkey:any,
        public expiration_date:any,
        public user_profile_image:any

    ){
    
    }

    get token(){
        var currentDate=new Date().getTime();             
        if( new Date(this.expiration_date).getTime() > currentDate){
            return this._refreshkey;
        }
        return null
    }

}