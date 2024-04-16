import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('serch_result_box', { static: false }) serchResultBox: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onscroll(event: any) {
    console.log('hi');

    var searchbar = document.getElementById('search-bar');
    if (window.scrollY > 100) {
      searchbar?.classList.add('search-scrolled')
    } else {
      searchbar?.classList.remove('search-scrolled')
    }

  }
  serchinputValue: any;
  searchText$ = new Subject<string>();
  constructor(
    private router: Router,
    private ApiParameterScript: ApiParameterScript,
    private appservice: AppService,
  ) {

    this.searchText$.pipe(
      debounceTime(300), // Adjust debounce time as needed (300 milliseconds in this example)
      distinctUntilChanged() // Only emit when the search text changes
    ).subscribe(searchText => {
      // Call your API function with the searchText here
      this.fetchSearchResults(searchText);

      this.createSearch_HISTORY(searchText)
    });
  }

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
      "order": 'id',
      "limit": 5
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
  fetchSearchResults(searchText: string) {
    console.log("getSerch result");
    var searchQuery = `SELECT product_Id ,product_Name,product_Images FROM e_commerce_product WHERE  product_Live_Status='active' AND e_commerce_product.product_stock_count>0 AND (product_Name LIKE '%${searchText}%' OR  product_Description LIKE '%${searchText}%' OR product_Category LIKE '%${searchText}%' OR product_SubCategory LIKE '%${searchText}%') `;

    console.log("serch query",searchQuery)



    this.ApiParameterScript.fetchDataFormQuery(searchQuery).pipe(
      map((response: any) => {
        // Check if the "data" property exists and is an array
        if (response && response.data && Array.isArray(response.data)) {
          // Modify each user object by adding a timestamp property
          const modifiedData = response.data.map((data: any) => {
            var image = data.product_Images.split(',')
            return {
              ...data,
              type: 'DIRECT_PRODUCT_SEARCH',
              url: `store/product/${data.product_Id}`,
              text: data.product_Name,
              product_Images: image.length > 0 ? this.appservice.getAdminApiPath() + "shop/images/" + image[0] : '',
              imageURL: image.length > 0 ? this.appservice.getAdminApiPath() + "shop/images/" + image[0] : ''

            };
          });

          // Return the modified response object
          return { ...response, data: modifiedData };
        }

        // Return the original response if the structure is not as expected
        return response;
      })
    ).subscribe((res: any) => {


      if (res.success) {
        this.DEFULT_SERCH_HISTORY = res['data']
      }


    })
  }


  looking(event: any) {
    console.log("serchstring", event.target.value);
    var searchText = event.target.value.trim(); // Get the text entered by the user
    if (searchText !== '') this.searchText$.next(event.target.value);
  }
  public search() {

    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        'q': this.serchinputValue,
        'category': 'Vegitable'
      }
    };
    this.router.navigate(['store/search'], navigationExtras);


  }

  public searchResult(data: any) {
    // console.log("hi", this.serchinputValue.replace(/\s+/g, '+'));
    if (data.type != 'DIRECT_PRODUCT_SEARCH') {
      let navigationExtras: NavigationExtras = {
        queryParams:
        {
          'q': data.text
        }
      };
      this.router.navigate(['store/search'], navigationExtras);
    } else {
      
       var url=this.appservice.baseURL+data.url
       window.open(url, '_blank');
    }
  }
  createSearch_HISTORY(data: any) {



    if(this.appservice.authStatus){
    var query = {
      "select": "*",
      "projection": `search_BY='${this.appservice.authStatus ? this.appservice.authStatus.email : ''}' AND search_text='${data}'`
    }

    this.ApiParameterScript.fetchdata('search_history', query).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
      } else {
        var apiData = {
          "data": `search_BY='${this.appservice.authStatus ? this.appservice.authStatus.email : ''}',create_modify_date_time='${moment().format('DD MMM YYYY, hh:mm A')}',search_text='${data}',search_category='${data}'`

        }
        this.ApiParameterScript.savedata('search_history', apiData, false).subscribe((res) => {
          console.log(res);

        })
      }
    })
  }

  }
  public active() {
    const result = document.getElementById('result');
    result?.classList.remove('hidden');
  }

  public deactive() {
   
    const resultBoxElement: HTMLElement = this.serchResultBox.nativeElement;
    resultBoxElement.classList.add('hidden');
   
    
  }


}
