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
import { result } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  requstdata: any;
  params: {};
  constructor(private auth: AuthService, private loader: NgxUiLoaderService, private toastr: ToastrService, private router: Router, private modalService: NgbModal, private HttpClient: HttpClient) { }

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  });

  password: any;
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

  forgetPassword() {



    Swal.fire({
      title: '<strong>Enter u r mail id</strong>',
      icon: 'info',
      input: 'email',
      inputPlaceholder: 'Enter Email iD',
      confirmButtonText: 'Send otp',
      showCancelButton: true,
      backdrop: false,
    }).then((result) => {
      this.params = {
        'email': result.value,
        'password': ''
      }
      this.auth.forgotpassword(this.params, 102).subscribe((res) => {
        if (res.isOTPSend) {
          Swal.fire({
            title: '<strong>Enter otp</strong>',
            html: `<span style = 'color: red ;' >Otp is send to  ${result.value}<span>`,
            input: 'text',
            inputPlaceholder: 'Enter Otp',
            confirmButtonText: 'Submit',
            showCancelButton: true,
            backdrop: false,
          }).then((otp) => {
            this.params = {
              'email': result.value,
              'password': ''
            }
            if (otp.isConfirmed) {
              this.auth.forgotpassword(this.params, 103).subscribe((res) => {

                if (res.otp == otp.value) {

                  Swal.fire({
                    title: 'Set New Password',
                    html: '<input type = "text" id="password" class="swal2-input" placeholder="New Password">' + '<input type = "text" id="cpassword" class="swal2-input" placeholder="Conform Password">',
                    confirmButtonText: "Submit",
                    showConfirmButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    backdrop: false,
                    preConfirm: () => {
                      if ($('#password').val() != $('#cpassword').val()) {
                        Swal.showValidationMessage('password and conformpassword not match');
                      }
                    },
                    //text : `${showmessage}`,

                  }).then((password) => {
                    //console.log($('#password').val());
                    console.log(password);

                    this.params = {
                      'email': result.value,
                      'password': $('#password').val(),
                    }

                    if (password.isConfirmed) {

                      this.auth.forgotpassword(this.params, 104).subscribe((res) => {
                        if (res.isOTPSend) {
                          Swal.fire({
                            icon: 'success',
                            text: res.message
                          });
                        }
                      });
                    } else {

                    }
                  });

                } else {
                  Swal.fire({
                    icon: 'error',
                    text: "otp doesn't match"
                  });
                }

              

            });
          }else{
            
          }

        });
    } else {
      Swal.fire({
        icon: 'error',
        text: `${res.message}`,
      })
    }

      });
});
    //   console.log('------');
    //   //  console.log(this.requstdata);
    //   if(this.requstdata){
    //     if (result.isConfirmed) {
    //     // alert(result.value);
    //     Swal.fire({
    //       title: '<strong>Enter otp</strong>',
    //       html: `<span style = 'color: red ;' >Otp is send to  ${result.value}<span>`,
    //       input: 'text',
    //       footer : `${this.requstdata}`,
    //       inputPlaceholder: 'Enter Otp',
    //       confirmButtonText: 'Submit',
    //       showCancelButton: true,
    //     }).then((result) => {

    //     });
    //   }
    // }else{
    //   Swal.fire({
    //     title: '<strong>Try After Some Time</strong>',
    //     icon: 'error',
    //   })
    // }
    // });
  }

}


