import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  serchinputValue: any;
  constructor(
    private router: Router,
    private ApiParameterScript: ApiParameterScript,
    private appservice: AppService,
  ) { }

  DEFULT_SERCH_HISTORY: any[] = [
    {
      "text": "Vegetable",
      "type": "DEFULTSERACH",
      "imageURL": `${this.appservice.baseURL}assets/e-commerce/vegitable.jpg`
    },
    {
      "text": "Agricultural Medicine",
      "type": "DEFULTSERACH",
      "imageURL": `${this.appservice.baseURL}assets/e-commerce/agricultural.jpg`
    },
    {
      "text": "Grocery",
      "type": "DEFULTSERACH",
      "imageURL": `${this.appservice.baseURL}assets/e-commerce/grocery.png`
    },
    {
      "text": "Fashion",
      "type": "DEFULTSERACH",
      "imageURL": `${this.appservice.baseURL}assets/e-commerce/fashion.png`
    }

  ]
  ngOnInit(): void {

    var query = {
      "select": "*",
      "projection": `search_BY='${this.appservice.authStatus ? this.appservice.authStatus.email : ''}'`,
      "order":'id',
      "limit":5
    }

    this.ApiParameterScript.fetchdata('search_history', query).subscribe((res: any) => {
      console.log(res);
      // this.DEFULT_SERCH_HISTORY.
      if (res.success && res['data'].length > 0) {

        res['data'].forEach((element: any, index: any) => {
          
         
            this.DEFULT_SERCH_HISTORY = _.concat([{
              "text": element.search_text,
              "type": "USERSERACHHISTORY",
              "search_time": element.create_modify_date_time
            }], this.DEFULT_SERCH_HISTORY)
          
        });

      }




    })

  }

  public search() {
    // console.log(this.serchinputValue);

    // console.log("hi", this.serchinputValue.replace(/\s+/g, '+'));

    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        'q': this.serchinputValue,
        'category': 'Vegitable'
      }
    };
    this.router.navigate(['e-commerce/search'], navigationExtras);
    

  }

  public searchResult(data: any) {
    // console.log("hi", this.serchinputValue.replace(/\s+/g, '+'));
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        'q': data
      }
    };
 
    this.router.navigate(['e-commerce/search'], navigationExtras);
  }

  public active() {
    const result = document.getElementById('result');
    result?.classList.remove('hidden');
  }

  public deactive() {
    // console.log("clicked outside");
    // appClickedoutside (clickoutside)="deactive()"
    console.log();
    
    const result = document.getElementById('result');
    // result?.classList.add('hidden');
  }


}
