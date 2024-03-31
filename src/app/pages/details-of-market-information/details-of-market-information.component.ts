import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _, { upperCase } from 'lodash';
import moment from 'moment';
import { marketInformation } from 'src/app/feature/agriculture/market-place/market-place-graph/market-place-graph.component';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-details-of-market-information',
  templateUrl: './details-of-market-information.component.html',
  styleUrls: ['./details-of-market-information.component.scss']
})
export class DetailsOfMarketInformationComponent implements OnInit {
  queryParams: any;
  public priceList: any[] = []
  basicData: any;
  basicOptions: any;

  marketInformation: marketInformation = {
    graphDateArray: [],
    graphPriceArray: []
  }
  marketGraphData: any
  constructor(
    private route: ActivatedRoute,
    private apiParameterScript: ApiParameterScript
  ) { }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams;
    console.log("query", this.queryParams);



    // var fetchQuery=`SELECT MAX(market_name) AS grouped_market_name, market_name, MAX(price) AS price, SOUNDEX(product_name) AS product_soundex, product_name, MAX(product_name) AS grouped_product_name, MAX(quantity) AS quantity, DATE(DATE) AS extracted_date, COUNT(*) AS total_review_made, SUM(quantity) AS total_quantity, AVG(price) AS average_price, MAX(state) AS state, MAX(district) AS district FROM market_place_information WHERE DATE(DATE) = '${this.queryParams?.extracted_date}' AND market_name='${this.queryParams?.market_name}' AND district='${this.queryParams?.district}' AND state='${this.queryParams?.state}' GROUP BY SOUNDEX(market_name), state, district, product_soundex, extracted_date ORDER BY  extracted_date;`

    var fetchQuery = `SELECT COUNT(*) as total_review_made,market_name,product_name,DATE(DATE) AS extracted_date,price,quantity,category,state,district FROM market_place_information WHERE DATE(DATE) = '${this.queryParams?.extracted_date}' AND SOUNDEX(product_name) = SOUNDEX('${this.queryParams?.product_name}') AND SOUNDEX(market_name) = SOUNDEX('${this.queryParams?.market_name}') AND state = '${this.queryParams?.state}' AND district = '${this.queryParams?.district}' GROUP BY price;`

    console.log(fetchQuery);

    this.apiParameterScript.fetchDataFormQuery(fetchQuery).subscribe((res: any) => {
      console.log("iiidsuudu", res);

      const entryWithHighestReview: any = _.maxBy(res['data'], 'total_review_made');

      _.map(res['data'], (i: any) => {
        i['highestReview'] = entryWithHighestReview['total_review_made']
      })
      this.priceList = res['data']
      console.log(this.priceList);

    })

    this.getAllPriceInfo()

    this.marketGraphData = {
      "country": "India",
      "crop": "Tomato",
      "currentDate": "10 March 2023",
      "currentPrice": 1000,
      "district": "Khordha",
      "graphDateArray": ["01 Feb", "12 Feb", "23 Feb", "20 Mar"],
      "graphPriceArray": [650, 700, 100, 1000],
      "state": "Odisha"
    }

  }

  acuratePrice() {
    if (this.priceList.length > 0) {


      const entryWithHighestReview: any = _.maxBy(this.priceList, 'total_review_made');

      return entryWithHighestReview['price']
    } else {
      return 0
    }
  }

  getAllPriceInfo() {
    var fetchQuery = `SELECT COUNT(*) as total_review_made,market_name,product_name,DATE(DATE) AS extracted_date,price,quantity,category,state,district,id FROM market_place_information WHERE SOUNDEX(product_name) = SOUNDEX('${this.queryParams?.product_name}') AND SOUNDEX(market_name) = SOUNDEX('${this.queryParams?.market_name}') AND state = '${this.queryParams?.state}' AND district = '${this.queryParams?.district}' GROUP BY price;`

    console.log("getAllPriceInfo", fetchQuery);

    this.apiParameterScript.fetchDataFormQuery(fetchQuery).subscribe((res: any) => {
      console.log("Fetch getAllPriceInfo", res);

      if (res.success && res['data'].length > 0) {
        _.map(res['data'], (i: any) => {
          console.log(i);

          this.marketInformation.graphDateArray.push(moment(i.extracted_date).format('DD MMM'))
          this.marketInformation.graphPriceArray.push(i.price)
        })
        this.marketInformation['name'] = upperCase(res['data'][0]["product_name"])
        console.log("this.", this.marketInformation);
        this.fetchingGraphData(this.marketInformation)
      }
    })
  }

  fetchingGraphData(marketInformation: marketInformation) {
    this.basicData = {
      labels: marketInformation.graphDateArray,
      datasets: [
        {
          label: this.marketInformation.name,
          data: marketInformation.graphPriceArray,
          borderColor: '#42A5F5',
          tension: .4,
          fill: true,
          backgroundColor: '#87CEEB'
          // backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
  }

}
