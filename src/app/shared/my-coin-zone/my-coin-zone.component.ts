import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-coin-zone',
  templateUrl: './my-coin-zone.component.html',
  styleUrls: ['./my-coin-zone.component.scss']
})
export class MyCoinZoneComponent implements OnInit {

  constructor(
    private taitel:Title
  ) { }

  ngOnInit(): void {
    this.taitel.setTitle('My Coin Zone')
  }

}
