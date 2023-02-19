import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  marketdetailsForm = new FormGroup({
    category: new FormControl({name:''}, [Validators.required]),
    cropName: new FormControl({ name: 'Select' }, [Validators.required]),
    state: new FormControl({ name: 'Select' }, [Validators.required])
  })

  category: any[] = [{ name: "Vegetable" }];
  cropName: any[]=[];
  state:any[]=[];

  marketData:any[]=[]
  constructor(public apiparameter: ApiParameterScript) { }

  ngOnInit(): void {
    this.apiparameter.marketPlaceApi(999,{}).subscribe((res: any) => {
      console.log("fetchstate", res);
      if(res.success && res['data'].length>0){
        console.log("res",res['data']);
        this.marketData=res['data'];
      }else{
        this.marketData=[]
      }
    })


  }

  fetchcrop() {
    console.log("fetch Crop Name", encodeURIComponent(JSON.stringify({ "category": this.marketdetailsForm.value.category?.name })));

    this.apiparameter.marketPlaceApi(1000, { "category": this.marketdetailsForm.value.category?.name }).subscribe((res: any) => {
      if(res.success && res['data'].length>0){
        console.log("res",res['data']);
        res['data'].forEach((element:any) => {
            this.cropName.push({
              "name":element.crop
            })
          
        });
        
          
      }else{
        this.cropName=[]
      }
    
      console.log("res", res);

    })

  }
  fetchstate(){
    this.apiparameter.marketPlaceApi(1001, { "category": this.marketdetailsForm.value.category?.name,"crop":this.marketdetailsForm.value.cropName?.name }).subscribe((res: any) => {
      console.log("fetchstate", res);
      if(res.success && res['data'].length>0){
        console.log("res",res['data']);
        res['data'].forEach((element:any) => {
            this.state.push({
              "name":element.state
            })
          
        });
      }else{
        this.state=[]
      }
    
      

    })
  }
  search() {
    this.apiparameter.marketPlaceApi(1002, { "category": this.marketdetailsForm.value.category?.name,"crop":this.marketdetailsForm.value.cropName?.name,"state":this.marketdetailsForm.value.state?.name }).subscribe((res: any) => {
      console.log("fetchstate", res);
      if(res.success && res['data'].length>0){
        console.log("res",res['data']);
        this.marketData=res['data'];
      }else{
        this.marketData=[]
      }
    })


  }

}
