import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Waywall';

  constructor(public _router: Router, private _auth: AuthService) {


  }

  ngOnInit(): void {


    console.log("app Start");
    this._auth.autoSignIn();
 

  }


}
