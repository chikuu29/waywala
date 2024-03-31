import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
export interface marketInformation {
  id?:number;
  name?:string;
  crop?:string;
  country?:string;
  state?:string;
  district?:string;
  currentDate?:any;
  currentPrice?:number;
  graphDateArray:any;
  graphPriceArray:any;

}

@Component({
  selector: 'app-market-place-graph',
  templateUrl: './market-place-graph.component.html',
  styleUrls: ['./market-place-graph.component.scss']
})
export class MarketPlaceGraphComponent implements OnInit {

  basicData: any;
  basicOptions: any;

  marketInformation:marketInformation={
    graphDateArray: [],
    graphPriceArray: []
  }

  constructor(private _rout: ActivatedRoute, private apiparemeter: ApiParameterScript) { }

  ngOnInit(): void {

    this._rout.params.subscribe(query => {
      console.log(query);
      this.apiparemeter.marketPlaceApi(1003, query).subscribe(
        (res: any) => {
         console.log("huu",res);
         
          if(res.success && res['data'].length>0){
            console.log("res", res);
            this.marketInformation['crop']=res['data'][0]['crop']
            this.marketInformation['state']=res['data'][0]['state']
            this.marketInformation['country']=res['data'][0]['country']
            this.marketInformation['district']=res['data'][0]['district']
            this.marketInformation['currentDate']=moment(res['data'][0]['currentDate'], 'MMM Do YYYY, h:mm:ss').format("DD MMMM YYYY")
            this.marketInformation['currentPrice']=res['data'][0]['currentPrice']
            res['data'].forEach((element:any) => {
                  // console.log("hshs",moment(element.previousDate, 'MMMM Do YYYY, h:mm:ss a').format('DD MMM'));
                  this.marketInformation.graphDateArray.push(moment(element.previousDate, 'MMMM Do YYYY, h:mm:ss a').format('DD MMM'))
                  this.marketInformation.graphPriceArray.push(element.previousPrice)
            });
            this.marketInformation.graphDateArray.push(moment(this.marketInformation['currentDate'], 'MMMM Do YYYY, h:mm:ss a').format('DD MMM'))
            this.marketInformation.graphPriceArray.push(this.marketInformation['currentPrice'])
            console.log("hiiiis",this.marketInformation);
            this.fetchingGraphData();

          }
        }
      )


    })















   
  }

  fetchingGraphData(){
    this.basicData = {
      labels: this.marketInformation.graphDateArray,
      datasets: [
        {
          label: this.marketInformation.crop,
          data: this.marketInformation.graphPriceArray,
          borderColor: '#42A5F5',
          tension: .4,
          backgroundColor: '#87CEEB'
        }
      ]
    };

    console.log("basic",this.basicData);
    
  }

}
