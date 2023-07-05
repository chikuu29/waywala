import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SPINNER, NgxUiLoaderService } from 'ngx-ui-loader';
import { CoinService } from 'src/app/services/coin.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-generic-otp-verification',
  templateUrl: './generic-otp-verification.component.html',
  styleUrls: ['./generic-otp-verification.component.scss']
})
export class GenericOtpVerificationComponent implements OnInit {

 
  public modalTitle: String = ''
  public otpSendTo: any;
  SP = SPINNER.squareJellyBox;
  public loaderText = 'Validating OTP';
  constructor
    (
      public activeModal: NgbActiveModal,
      private toastr: ToastrService,
      private loader: NgxUiLoaderService,

    ) { }

  ngOnInit(): void {

  }

  public validateOTP() {
    this.loaderText = 'Validating OTP';
    this.loader.startLoader('loader-01');
    var otp = "";
    var otpInput = document.getElementsByClassName('form-control');
    Object.entries(otpInput).forEach((a: any) => { otp += a[1].value })
    
    if (otp != '' && otp.length >= 6) {
      this.activeModal.close({"TYPE":"RETURN_USER_ENTER_OTP","OTP":otp})
    } else {
      this.loader.stopLoader('loader-01');
      this.toastr.error("Please enter your 6-digit OTP")
    }
  }

  public reSendOTP() {
    // this.loaderText = "Resend OTP Sending"
    // this.loader.startLoader('loader-01');
    this.activeModal.close({"TYPE":"USER_WANT_TO_RESEND_OTP"})

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
