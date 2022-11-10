import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { OtpComponent } from 'src/app/shared/otp/otp.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private auth: AuthService, private loader: NgxUiLoaderService, private toastr: ToastrService, private router: Router, private modalService: NgbModal) { }

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  });


  ngOnInit(): void {

  }

  getErrorMessage() {

    if (this.loginForm.controls.email.hasError('required') || this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  public submitLoginBtn() {


    if (this.loginForm.valid) {
      this.loader.start()
      this.auth.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: any) => {
        console.log(res);
        this.loader.stop();
        if (res.status) {
          this.toastr.success(res.message, "Done");
          res['isLogin'] = true;
          // localStorage.setItem('loginiinfo', JSON.stringify(res))
          var expiration_date = new Date(new Date().getTime() + 86400 * 1000).toString();
          this.auth.authentication(res.username, res.useremail, true, "user", res.token, expiration_date);
          this.router.navigateByUrl('agriculture')
        } else {
          this.toastr.error(res.message);
          var needOTPValidation = res.needOTPValidation == undefined ? false : true;
          console.log(needOTPValidation);

          if (needOTPValidation) {

            const modalRef = this.modalService.open(OtpComponent);
            modalRef.componentInstance.modalTitle = "You Need To Valiadte Your OTP";
            modalRef.componentInstance.OtpType = "Email",
            modalRef.componentInstance.otpSendTo = this.loginForm.value.email
            modalRef.result.then((modalInstance: any) => {
              if (modalInstance.success) {
                this.router.navigateByUrl('auth/login')
              }
            })

          }



        }

      })



    }

  }



}
