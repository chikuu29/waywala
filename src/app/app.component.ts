import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Waywall';
  
  constructor(public _router:Router,private appservices:AppService){
    console.log("App Start");
   
  }

  
  
}
