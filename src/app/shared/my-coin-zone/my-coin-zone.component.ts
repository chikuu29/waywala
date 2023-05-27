import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-my-coin-zone',
  templateUrl: './my-coin-zone.component.html',
  styleUrls: ['./my-coin-zone.component.scss']
})
export class MyCoinZoneComponent implements OnInit {


  authStatus:any;
  constructor(
    private taitel:Title,
    private appService:AppService,
    private coinSevices:CoinService
  ) { }

  ngOnInit(): void {
    this.taitel.setTitle('My Coin Zone')
    this.authStatus=this.appService.authStatus
    console.log(this.appService.authStatus);
    
  }

}
