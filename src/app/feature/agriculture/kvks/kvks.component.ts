import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { kvks } from './kvks';

@Component({
  selector: 'app-kvks',
  templateUrl: './kvks.component.html',
  styleUrls: ['./kvks.component.scss']
})
export class KvksComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  kvkdetailsForm=new FormGroup({
    country: new FormControl({name:'India'}, [Validators.required]),
    state: new FormControl({name:'odisha'}, [Validators.required]),
    district: new FormControl({name:''}, [Validators.required])
  }) 
  allDistricts:any[]= [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Sonepur",
    "Sundargarh"
  ]
  countries: any[];
  district:any=[]
  state:any[]
 
  totalKvksDetails: kvks[] = [];
  serchloading:boolean=false
  screenWidth:any;
  @HostListener('window:resize', ['$event'])
  onResizes(event: any) {
    this.screenWidth = window.innerWidth;
  }
  constructor(private apiparameter:ApiParameterScript) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    
    this.countries = [
      { name: 'India' }
    ];
    this.state=[{name:'odisha'}]
    this.allDistricts.forEach(district=>{
      this.district.push({name:district})
    })
   
    this.getKvks({"select":"*","projection":"","auth":true})
    console.log(this.kvkdetailsForm.value);
    
  }

  public getKvks(apiData:any){

   
    this.blockUI.start('loading...')
    this.apiparameter.fetchdata('Kvks_Details',apiData).subscribe((res:any)=>{
      console.log(res);
      this.serchloading=false;
      this.blockUI.stop()
      if(res.success){
        this.totalKvksDetails=res['data']
      }else{
        Swal.fire('error',res.message,'error')
      }
      
    })
    

  }

  public search(){
    console.log(this.kvkdetailsForm);
    var district=this.kvkdetailsForm.value.district?.name;
    var state=this.kvkdetailsForm.value.state?.name;
    if(district!='' && state !=''){
      let apidata={
        "select":"*",
        "projection":`district='${this.kvkdetailsForm.value.district?.name}' AND state='${this.kvkdetailsForm.value.state?.name}'`,
        "auth":true
      }
      this.serchloading=true;
      this.getKvks(apidata)
    }else{
      console.log("please slecte details");
      
    }
    
   

    
  }

}
