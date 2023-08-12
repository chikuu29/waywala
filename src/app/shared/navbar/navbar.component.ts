import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ECommerceServicesService } from 'src/app/feature/e-commerce/services/e-commerce-services.service';
import { AppService } from 'src/app/services/app.service';
import { TakeFeedbackComponent } from '../take-feedback/take-feedback.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public version: any
  public screenWidth: any;
  public navBtnCollapse: Boolean = false;
  public isLogin: Boolean = false;
  public LoginInformation: any;
  public authInfo: any = { "name": "" }
  public myBagDataCount: any = 0
  @HostListener('window:resize', ['$event'])
  onResizes(event: any) {
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:scroll', ['$event'])
  onscroll(event: any) {

    var selectHeader = document.getElementById('header');
    if (window.scrollY > 100) {
      selectHeader?.classList.add('header-scrolled')
    } else {
      // selectHeader?.classList.remove('header-scrolled')
    }

  }

  activeServiceDropDown: boolean = false
  sidebarVisible: boolean = false
  imagePath="https://www.waywala.com/api"
  profile:any;
  constructor(
    public _router: Router,
    public toast: ToastrService,
    private auth: AuthService,
    private app: AppService,
    private ECommerceServicesService: ECommerceServicesService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.imagePath=this.app.getApipath()+"/auth/profile/"
   

    this.version = this.app.getappVersion['version']
    this.screenWidth = window.innerWidth;
    this.auth.user.subscribe((res: any) => {
      if (res) {
        // console.log(res);
        this.profile=res;
        this.isLogin = res.token != null ? true : false;
        this.authInfo = this.auth.getAuthStatus();
      }
    })
    this.ECommerceServicesService.generateCartItemCount.subscribe((res: any) => {
      if (res) {
        this.ECommerceServicesService.bagItemCount().subscribe((res: any) => {
          this.myBagDataCount = res.myBagDataCount
          this.ECommerceServicesService.generateCartItemCount.next(false)
        })
      }

    })

  }

  onclickHideNav() {
    if (this.navBtnCollapse) {
      this.navBtnCollapse = !this.navBtnCollapse
    }

    var navbar = document.getElementById('navbar');
    navbar?.classList.remove('navbar-mobile');
  }

  public toggleNavBtn() {
    this.navBtnCollapse = !this.navBtnCollapse;
  }

  activeDropDownForMobail() {
    if (this.activeServiceDropDown) {
      this.activeServiceDropDown = false

    } else {
      this.activeServiceDropDown = true
    }

  }

  public logout() {

    const modalRef=this.modalService.open(TakeFeedbackComponent,{ fullscreen: true });
    // this.auth.logout()
  }

}
