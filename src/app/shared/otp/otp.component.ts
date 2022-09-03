import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public OtpType:String=''
  public modalTitle:String=''
  public otpSendTo:any;
  private getOTP:any='';

  constructor(public activeModal:NgbActiveModal,private registrationService:RegistrationService) { }

  ngOnInit(): void {
  }

  public validateOTP(){
    var data={
      "email":this.otpSendTo,
      "otp":this.getOTP
    }


    
   this.registrationService.otpValidate(data).subscribe((res:any)=>{

          console.log("OTP res",res);
          

      

   })
    //console.log("validate Otp");
    //this.activeModal.close({"success":true})
    
    
    
  }

  public reSendOTP(){
    console.log("reSendOTP");
   


  }

  jumpTo(index:number,event:any){
    
    if(event.key!='' && event.key!='Backspace')this.getOTP+=event.key;
    index++;
    if(index!=6){
      document.getElementById('pc'+index)?.focus();
    }else{
      document.getElementById('pc5')?.blur();
      
      console.log('OTP',this.getOTP);
      
    }
   
  }

}
