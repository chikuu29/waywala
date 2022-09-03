import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { RegistrationService } from 'src/app/services/registration.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OtpComponent } from 'src/app/shared/otp/otp.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true
  public hide2 = true
  // "token":"waywalaDev",
  //   "email": "sss@vv.com",
  //   "name" : "fffff",
  //   "mobile_no" : "fffff",
  //   "password" : "chiku@123"
  private userData: any = {
    name: '',
    email: '',
    mobile_no: '',
    password: '',
  }

  constructor(
    private appservices: AppService,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private loader: NgxUiLoaderService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;



  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    checkbox: new FormControl('', [Validators.required]),

  })

  ngOnInit(): void {

  }

  public registerSubmitBtn() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
        this.toastr.error("Mismatch Confirm Password")
      } else {
        this.loader.start()
        this.userData.name = this.registerForm.value.name;
        this.userData.email = this.registerForm.value.email;
        this.userData.mobile_no = this.registerForm.value.phone;
        this.userData.password = this.registerForm.value.password;
        console.log("userData", this.userData);

        this.registrationService.signUp(
          {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            mobile_no: this.registerForm.value.phone,
            password: this.registerForm.value.password
          }
        ).subscribe((res) => {
          this.loader.stop();
          console.log(res);

          if (res.isOTPSend) {

            const modalRef = this.modalService.open(OtpComponent);
            modalRef.componentInstance.modalTitle = res.name;
            modalRef.componentInstance.OtpType = "Email",
              modalRef.componentInstance.otpSendTo = res.email
            modalRef.result.then((modalInstance: any) => {



            })

          } else {
            Swal.fire({ icon: 'info', title: res.message })
          }



        })
      }
    }
  }

  public getErrorMessage() {
    if (this.registerForm.controls.email.hasError('required') || this.registerForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';

  }





}
