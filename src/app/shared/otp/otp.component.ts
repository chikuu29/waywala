import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public OtpType: String = ''
  public modalTitle: String = ''
  public otpSendTo: any;
  SP = SPINNER.squareJellyBox;

  constructor
    (
      public activeModal: NgbActiveModal,
      private registrationService: RegistrationService,
      private toastr: ToastrService,
      private loader: NgxUiLoaderService,
      private router:Router
    ) { }

  ngOnInit(): void {

  }

  public validateOTP() {
    this.loader.startLoader('loader-01');
    var otp = "";
    var otpInput = document.getElementsByClassName('form-control');
    Object.entries(otpInput).forEach((a: any) => { otp += a[1].value })
    var data = {
      "email": this.otpSendTo,
      "otp": otp
    }
    if (otp != '' && otp.length >= 6) {
      this.registrationService.otpValidate(data).subscribe((res: any) => {
        console.log(res);
        this.loader.stopLoader('loader-01')
       
        if (res.success) {
          
          if(this.router.url=='/auth/login'){
            this.toastr.success("Your Account is Now Activated Your Can Login Now")
          }else{
            this.toastr.success(res.message)
          }
          this.activeModal.close({ "success": true })
        } else {
          this.toastr.error(res.message)
        }
      })
    } else {
      this.loader.stopLoader('loader-01');
      this.toastr.error("Please enter your 6-digit OTP")
    }
  }

  public reSendOTP() {
    console.log("reSendOTP");



  }

  jumpTo(index: number, event: any) {
    if (event.key == 'Backspace') {
      index--;
      document.getElementById('pc' + index)?.focus();

    } else {
      index++;
      if (index != 6) {
        document.getElementById('pc' + index)?.focus();
      } else {
        document.getElementById('pc5')?.blur();
      }

    }


  }

}
