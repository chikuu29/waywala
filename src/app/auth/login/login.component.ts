import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor() {}

  loginForm = new FormGroup({

    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required])
        
  });


  ngOnInit(): void {

    
  }

  getErrorMessage() {
    
    if (this.loginForm.controls.email.hasError('required') || this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  public submitLoginBtn(){

    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
    //   Swal.fire({
    //   title: 'Great!',
    //   text: 'Login Success',
    //   icon: 'success',
     
    // })

    }
      
  }



}
