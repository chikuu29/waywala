import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/appModules/userModules';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:any
  email:string
  constructor(private apiparameter:ApiParameterScript,private appservices:AppService) { }

  ngOnInit(): void {
    console.log(this.appservices.authStatus)
    var apiData ={
      "select":"*",
      "projection":`email='${this.appservices.authStatus.email}'`
    }
    this.apiparameter.fetchdata('user',apiData).subscribe((res:any)=>{

      console.log(res)
      if(res.success){
        this.profile=res['data'][0]
      }else{
        Swal.fire("error",res.message,"error")
      }
    })
  }

}
