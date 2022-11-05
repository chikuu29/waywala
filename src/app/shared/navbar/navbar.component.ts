import { Component, HostListener, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public screenWidth: any;
  public navBtnCollapse: Boolean = false;
  public isLogin: Boolean = false;
  public LoginInformation: any;
  public authInfo:any
  @HostListener('window:resize', ['$event'])
  onResizes(event: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(public toast: ToastrService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.auth.user.subscribe((res: any) => {
      if (res) {
        // console.log(res);
        this.isLogin = res.token != null ? true : false;
      }
    })
    this.authInfo = this.auth.getAuthStatus();
    // console.log(this.authInfo);


  }

  public toggleNavBtn() {
    this.navBtnCollapse = !this.navBtnCollapse;
  }
  

  public logout() {
    this.auth.logout()
  }

}
