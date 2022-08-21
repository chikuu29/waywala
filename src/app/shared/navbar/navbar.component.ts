import { Component, HostListener, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public screenWidth: any;
  public navBtnCollapse:Boolean=false;
  @HostListener('window:resize', ['$event'])
  onResizes(event:any) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    
  }

  constructor() { }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    console.log("screenSize", this.screenWidth);




  }

  public toggleNavBtn(){
    this.navBtnCollapse=!this.navBtnCollapse

  }

}
