import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/services/coin.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public OtpType: String = ''
  public modalTitle: String = ''
  public otpSendTo: any;
  public otpForCoin: boolean = false;
  SP = SPINNER.squareJellyBox;
  public loaderText = 'Validating OTP';

  constructor
    (
      public activeModal: NgbActiveModal,
      private registrationService: RegistrationService,
      private coinSevices:CoinService,
      private toastr: ToastrService,
      private loader: NgxUiLoaderService,
      private router: Router
    ) { }

  ngOnInit(): void {

  }

  public validateOTP() {
    this.loaderText = 'Validating OTP';
    this.loader.startLoader('loader-01');
    var otp = "";
    var otpInput = document.getElementsByClassName('form-control');
    Object.entries(otpInput).forEach((a: any) => { otp += a[1].value })
    var data = {
      "email": this.otpSendTo,
      "otp": otp
    }
    if (otp != '' && otp.length >= 6) {
      if (!this.otpForCoin) {
        this.registrationService.otpValidate(data).subscribe((res: any) => {
          console.log(res);
          this.loader.stopLoader('loader-01')

          if (res.success) {

            if (this.router.url == '/auth/login') {
              this.toastr.success("Your Account is Now Activated Your Can Login Now")
            } else {
              this.toastr.success(res.message)
            }
            this.activeModal.close({ "success": true })
          } else {
            this.toastr.error(res.message)
          }
        })
      } else {
        console.log("hii");
        this.coinSevices.validateOTPForActiveCoinAccount(otp).subscribe((res:any)=>{
          this.loader.stopLoader('loader-01')
          if (res.success) {

          
              this.toastr.success(res.message)
            
            this.activeModal.close({ "success": true })
          } else {
            this.toastr.error(res.message)
          }
        })
        

      }
    } else {
      this.loader.stopLoader('loader-01');
      this.toastr.error("Please enter your 6-digit OTP")
    }
  }

  public reSendOTP() {
    this.loaderText = "Resend OTP Sending"
    this.loader.startLoader('loader-01');
    var data = {
      "email": this.otpSendTo

    }
    this.registrationService.resendOTP(data).subscribe((res: any) => {
      this.loader.stopLoader('loader-01');
      if (res.success) {
        this.toastr.success(res.message)
      } else {
        this.toastr.error(res.message)
      }


    })




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
