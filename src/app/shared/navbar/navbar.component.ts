import { Component, HostListener, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public screenWidth: any;
  public navBtnCollapse: Boolean = false;
  @HostListener('window:resize', ['$event'])
  onResizes(event: any) {
    this.screenWidth = window.innerWidth;
  }
  public isLogin:Boolean;
  constructor(private appservices:AppService) {

    this.isLogin=appservices.isLogin


  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  public toggleNavBtn() {
    this.navBtnCollapse = !this.navBtnCollapse;
  }

}
