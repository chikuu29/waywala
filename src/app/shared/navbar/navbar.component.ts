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
  @HostListener('window:resize', ['$event'])
  onResizes(event: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private appservices: AppService, public toast: ToastrService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.auth.getLoginInfo('loginiinfo').subscribe((res: any) => {

      if (res.success) {
        this.isLogin=JSON.parse(res.data)['isLogin'];
      } else {
        this.isLogin = false
      }

    })
  }

  public toggleNavBtn() {
    this.navBtnCollapse = !this.navBtnCollapse;
  }

  public logout() {
    this.auth.clearLoginInfo().subscribe((res: any) => {
      if (res.success) {
        this.toast.success('Logout Successfull');
        this.ngOnInit()
      }

    })
  }

}
