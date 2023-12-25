import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _, { capitalize } from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-search-market-information',
  templateUrl: './search-market-information.component.html',
  styleUrls: ['./search-market-information.component.scss']
})
export class SearchMarketInformationComponent implements OnInit {
  searchMarketInfoForm = new FormGroup({
    market_name: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required])

  })

  marketNameOption: any[]
  districtOption: any[]
  stateOption: any[]
  // SELECT market_name, product_name, quantity, DATE(date) AS extracted_date, COUNT(*) as total_count, SUM(quantity) as total_quantity, AVG(price) as average_price FROM market_place_information GROUP BY market_name, product_name, quantity, DATE(date) ORDER BY market_name, product_name, quantity, extracted_date;
  constructor(
    private api: ApiParameterScript
  ) { }

  ngOnInit(): void {

    var query = `select state from market_place_information  group by state`
    this.api.fetchDataFormQuery(query).subscribe((stateOptionRes: any) => {
      if (stateOptionRes.success && stateOptionRes.data.length > 0) {
        this.stateOption = _.map(stateOptionRes.data, item => ({
          name: capitalize(item.state),
          value: item.state
        }))
      }else{
        this.stateOption=[]
      }
    })
  }

  getDistrictstate() {
    var query = `SELECT DISTINCT district 
    FROM market_place_information where state='${this.searchMarketInfoForm.value.state}'`
    this.api.fetchDataFormQuery(query).subscribe((districtOptionRes: any) => {
      if (districtOptionRes.success && districtOptionRes.data.length > 0) {
        this.districtOption = _.map(districtOptionRes.data, item => ({
          name: capitalize(item.district),
          value: item.district
        }))
      }else{
        this.districtOption=[]
      }
    })
  }

  getMarketName(){
    var query = `SELECT DISTINCT market_name 
    FROM market_place_information where district='${this.searchMarketInfoForm.value.district}'`
    this.api.fetchDataFormQuery(query).subscribe((marketOptionRes: any) => {
      if (marketOptionRes.success && marketOptionRes.data.length > 0) {
        this.marketNameOption = _.map(marketOptionRes.data, item => ({
          name: capitalize(item.market_name),
          value: item.market_name
        }))
      }else{
        this.marketNameOption=[]
      }
    })
  }

}
