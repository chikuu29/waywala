import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true
  public hide2 = true
  private userData:any={name:'',email:'',phone:'',password:''}
  constructor() { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    checkbox:new FormControl('', [Validators.required]),

  }

  )

  ngOnInit(): void {
  }

  public registerSubmitBtn() {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
        Swal.fire({
          title: 'Sorry!',
          text: 'Mismatch Confirm Password',
          icon: 'error',
        })
      } else {

        this.userData.name=this.registerForm.value.name;
        this.userData.email=this.registerForm.value.email;
        this.userData.phone=this.registerForm.value.phone;
        this.userData.password=this.registerForm.value.password;

        console.log("Register Data ",this.userData);
        




        





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
