import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _, { capitalize } from 'lodash';
import moment from 'moment';
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
    state: new FormControl('', [Validators.required]),
    date:new FormControl(moment().format('YYYY-MM-DD'),[Validators.required])
  })

  marketNameOption: any[]
  districtOption: any[]
  stateOption: any[]

  productNameList:any[]=[]
  selectedDate: any=moment().format('YYYY-MM-DD');

  filterText:string=''
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


    // let fetchApiQuery=`SELECT market_name,price, product_name, quantity, DATE(date) AS extracted_date, COUNT(*) as total_count, SUM(quantity) as total_quantity, AVG(price) as average_price,state,district FROM market_place_information WHERE DATE(date) = CURDATE() GROUP BY market_name, product_name, quantity, extracted_date ORDER BY market_name, product_name, quantity, extracted_date;`

    let fetchApiQuery=`SELECT MAX(market_name) AS grouped_market_name, market_name, MAX(price) AS price, SOUNDEX(product_name) AS product_soundex, product_name, MAX(product_name) AS grouped_product_name, MAX(quantity) AS quantity, DATE(DATE) AS extracted_date, COUNT(*) AS total_review_made, SUM(quantity) AS total_quantity, AVG(price) AS average_price, MAX(state) AS state, MAX(district) AS district FROM market_place_information WHERE DATE(DATE) = CURDATE() GROUP BY SOUNDEX(market_name), state, district, product_soundex, extracted_date ORDER BY grouped_market_name, grouped_product_name, quantity, extracted_date;`
    this.api.fetchDataFormQuery(fetchApiQuery).subscribe((res:any)=>{
      this.productNameList=res['data']
      console.log(res['data']);
      
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

  search(){
    console.log("Search",this.searchMarketInfoForm.value);

    let fetchApiQuery=`SELECT market_name,price, product_name, quantity, DATE(date) AS extracted_date, COUNT(*) as total_count, SUM(quantity) as total_quantity, AVG(price) as average_price FROM market_place_information WHERE DATE(date) = '${moment(this.searchMarketInfoForm.value.date).format('YYYY-MM-DD')}' AND market_name='${this.searchMarketInfoForm.value.market_name}' AND district='${this.searchMarketInfoForm.value.district}' AND state='${this.searchMarketInfoForm.value.state}' GROUP BY market_name, product_name, quantity, extracted_date ORDER BY market_name, product_name, quantity, extracted_date;`
    this.api.fetchDataFormQuery(fetchApiQuery).subscribe((res:any)=>{
      this.productNameList=res['data']
      console.log(res['data']);
      
    })

    
  }

}
