import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sell-on-waywala',
  templateUrl: './sell-on-waywala.component.html',
  styleUrls: ['./sell-on-waywala.component.scss']
})
export class SellOnWaywalaComponent implements OnInit {

  sellOnWaywalaContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    checkbox: new FormControl('', [Validators.required]),

  })
  constructor(
    private Title:Title
  ) { }

  ngOnInit(): void {
    this.Title.setTitle('Sell on Waywala : waywala.com')
  }

  getErrorMessage(){
    
  }

}
