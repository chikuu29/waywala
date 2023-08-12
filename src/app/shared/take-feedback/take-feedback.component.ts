import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-take-feedback',
  templateUrl: './take-feedback.component.html',
  styleUrls: ['./take-feedback.component.scss']
})
export class TakeFeedbackComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  value!: number;
  show:boolean=false
  feedback_comment:any=''
  created_At:any;
  constructor(
    private apiparameter:ApiParameterScript,
    private appServices:AppService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.apiparameter.fetchdata('feedback',{"select":"*","projection":`user_email='${this.appServices.authStatus.email}'`}).subscribe((res:any)=>{
      if(res.success && res['data'].length>0){
        this.show=true
         this.value=res['data'][0]['user_rating']
         this.feedback_comment=res['data'][0]['user_message']
         this.created_At=res['data'][0]['created_At']

      }
    })
  }

  onRate(){
    console.log("value",this.value);
    this.show=true
    
  }
  submit(){
    this.blockUI.start("Please Wait")
    this.apiparameter.fetchdata('feedback',{"select":"*","projection":`user_email='${this.appServices.authStatus.email}'`}).subscribe((res:any)=>{
      console.log(res);
      if(res.success && res['data'].length>0){

        var updateData={
          "data":`user_rating=${this.value},user_name='${this.appServices.authStatus.name}',user_email='${this.appServices.authStatus.email}',created_At='${moment().toISOString()}',user_message='${this.feedback_comment}'`,
          "projection":`user_email='${res['data'][0]['user_email']}' AND id=${res['data'][0].id}`
        }
        this.apiparameter.updatedata('feedback',updateData).subscribe((res:any)=>{
          this.blockUI.stop()
          if(res.success){
            Swal.fire('Thanks For Feedback','Success','success').then(()=>{
                this.auth.logout()

            })
          }
          
        })
      }else{
        var saveData={
          "data":`user_rating=${this.value},user_name='${this.appServices.authStatus.name}',user_email='${this.appServices.authStatus.email}',created_At='${moment().toISOString()}',user_message='${this.feedback_comment}'`
        }
        this.apiparameter.savedata('feedback',saveData,false).subscribe((res:any)=>{
          this.blockUI.stop()
          if(res.success){
            Swal.fire('Thanks For Feedback','Success','success').then(()=>{
                this.auth.logout()

            })
          }
          

        })
      }
      
    })
  }
}
