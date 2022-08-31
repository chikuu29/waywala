import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { RegistrationService } from 'src/app/services/registration.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    private loader: NgxUiLoaderService
  ) { }

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
        this.registrationService.signUp(this.userData).subscribe((res) => {
          this.loader.stop();
          if (res.status) {

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
