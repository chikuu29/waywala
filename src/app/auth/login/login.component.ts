import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public submitLoginBtn(){
    
    sessionStorage.setItem("login","true");
    Swal.fire({
      title: 'Great!',
      text: 'Login Success',
      icon: 'success',
     
    })
    
  }

}
