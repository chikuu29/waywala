import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppService } from 'src/app/services/app.service';
import { CoinService } from 'src/app/services/coin.service';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-my-coin-zone',
  templateUrl: './my-coin-zone.component.html',
  styleUrls: ['./my-coin-zone.component.scss']
})
export class MyCoinZoneComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  authStatus: any;
  coinAccountInfo: any = {
    "isCoinAccountActive": false,
    "account_Deatais": {}

  };
  constructor(
    private taitel: Title,
    private appService: AppService,
    private coinSevices: CoinService,
    config: NgbModalConfig, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.taitel.setTitle('My Coin Zone')
    this.authStatus = this.appService.authStatus
    console.log(this.appService.authStatus);

    this.blockUI.start();
    this.coinSevices.getcoinAccountStatus().subscribe((res: any) => {
      console.log(res);
      this.blockUI.stop();
      if (res.success && !res.isCoinAccountActive) {

        const modalRef = this.modalService.open(OtpComponent);
        modalRef.componentInstance.modalTitle = res.name;
        modalRef.componentInstance.otpForCoin = true;
        modalRef.componentInstance.OtpType = "Email",
          modalRef.componentInstance.otpSendTo = res.email
        modalRef.result.then((modalInstance: any) => {

          console.log("log");


        })

      } else {
        this.coinAccountInfo = {
          "isCoinAccountActive": res.isCoinAccountActive,
          "account_Deatais": res['account']
        }

      }

      console.log("hiiii", this.coinAccountInfo);

      // active_status
      // :
      // 1
      // available_coin
      // :
      // 0
      // coin_used
      // :
      // 0
      // create_date_time
      // :
      // "2023-05-28 06:37:11"
      // total_earned_coin
      // :
      // 0
      // update_date_time
      // :
      // "0000-00-00 00:00:00"



    })

  }

}
