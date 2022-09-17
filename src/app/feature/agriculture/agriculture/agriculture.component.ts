import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent implements OnInit {
  SP = SPINNER.squareJellyBox;
  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  

  }

}
