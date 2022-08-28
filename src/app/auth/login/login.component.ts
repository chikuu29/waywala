import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  private userData:any={
    email:'',
    password:''

  }

  constructor(private auth:AuthService,  private loader:NgxUiLoaderService,  private toastr: ToastrService,private router:Router) {}

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
      this.loader.start() 
      this.userData.email=this.loginForm.value.email;
      this.userData.password=this.loginForm.value.password;

      console.log(this.userData);
      
      this.auth.login(this.userData).subscribe((res)=>{
        this.loader.stop() ;
        if(res.status){
          this.toastr.success(res.message,"Done");
          res['isLogin']=true;
          localStorage.setItem('loginiinfo',JSON.stringify(res))
          this.router.navigateByUrl('/')
        }else{
          this.toastr.error(res.message);

        }
    
      })



    }
      
  }



}
