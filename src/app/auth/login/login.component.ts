import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Title } from '@angular/platform-browser';
import { emailOrPhoneNumberValidator } from '../emailOrPhoneNumberValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  requstdata: any;
  params: {};
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private auth: AuthService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private HttpClient: HttpClient,
    private activeRouter: ActivatedRoute,
    private title: Title,

  ) { }

  redirectUrl: any
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required])

  });

  password: any;
  ngOnInit(): void {
    this.title.setTitle('Login To Waywala')
    this.redirectUrl = this.activeRouter.snapshot.queryParamMap.get('redirectUrl') || '/'

  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required') || this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    } else if (this.loginForm.controls.email.hasError('invalidEmailOrPhoneNumber')) {
      return "Please Enter Valid Email Or Phone No"
    }else{
      return "Please Enter Valid Input";
    }

    // return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  public submitLoginBtn() {


    if (this.loginForm.valid) {
      this.loader.start()
      this.auth.signIn(this.loginForm.value.email, this.loginForm.value.password,this.loginForm.value.phone).subscribe((res: any) => {
        console.log(res);
        this.loader.stop();
        if (res.status) {
          this.toastr.success(res.message, "Done");
          res['isLogin'] = true;
          // localStorage.setItem('loginiinfo', JSON.stringify(res))
          var expiration_date = new Date(new Date().getTime() + 86400 * 1000).toString();
          this.auth.authentication(res.username, res.useremail,res.userphone, true, "LOGIN_USER", res.token, expiration_date, res.user_profile_image);
          this.router.navigateByUrl(this.redirectUrl)
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

  public forgetPassword() {
    Swal.fire({
      title: '<strong>Enter Your Email ID</strong>',
      icon: 'info',
      input: 'email',
      inputPlaceholder: 'Enter Email ID',
      confirmButtonText: 'Send OTP',
      cancelButtonColor: "#DD6B55",
      showCancelButton: true,
      backdrop: false,
    }).then((result) => {
      this.params = {
        'email': result.value,
        'password': ''
      }
      if (result.isConfirmed) {
        // this.loader.start()
        this.blockUI.start("Validating Email ID...")
        this.auth.forgotpassword(this.params, 102).subscribe((res) => {
          this.blockUI.stop()
          if (res.isOTPSend) {
            Swal.fire({
              title: '<strong>Enter OTP</strong>',
              html: `<span style = 'color: red ;' >Please Check Your ${result.value} ID<span>`,
              input: 'text',
              inputPlaceholder: 'Enter OTP',
              confirmButtonText: 'Submit',
              showCancelButton: true,
              backdrop: false,
            }).then((otp) => {
              this.params = {
                'email': result.value,
                'password': ''
              }
              if (otp.isConfirmed) {
                this.blockUI.start("Validating OTP...")
                this.auth.forgotpassword(this.params, 103).subscribe((res) => {
                  this.blockUI.stop()
                  if (res.otp == otp.value) {

                    Swal.fire({
                      title: 'Set New Password',
                      html: '<input type = "text" id="password" class="swal2-input" placeholder="Enter Password">' + '<input type = "text" id="cpassword" class="swal2-input" placeholder="Conform Password">',
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


                    }).then((password) => {
                      this.params = {
                        'email': result.value,
                        'password': $('#password').val(),
                      }
                      if (password.isConfirmed) {
                        this.blockUI.start("Saving Your Deatils...")
                        this.auth.forgotpassword(this.params, 104).subscribe((res) => {
                          this.blockUI.stop()
                          if (res.isOTPSend) {
                            Swal.fire({
                              icon: 'success',
                              text: res.message
                            });
                          }
                        });
                      }
                    });

                  } else {
                    Swal.fire({
                      title: 'Sorry!',
                      icon: 'error',
                      text: "OTP Doesn't Match!"
                    });
                  }

                });
              }

            });
          } else {
            Swal.fire({
              icon: 'error',
              text: `${res.message}`,
            })
          }

        });
      }


    });

  }

}




