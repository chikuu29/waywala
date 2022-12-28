import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { kvks } from './kvks';

@Component({
  selector: 'app-kvks',
  templateUrl: './kvks.component.html',
  styleUrls: ['./kvks.component.scss']
})
export class KvksComponent implements OnInit {

  kvkdetailsForm=new FormGroup({
    country: new FormControl({name:'India'}, [Validators.required]),
    state: new FormControl({name:'odisha'}, [Validators.required]),
    district: new FormControl({name:''}, [Validators.required])
  }) 
  // selectedCountry: any ={name: 'India'};
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
  // selectedState:any
  // selectedDistrict:any
  countries: any[];
  district:any=[]
  state:any[]
 
  totalKvksDetails: kvks[] = [];
  serchloading:boolean=false
  constructor(private apiparameter:ApiParameterScript) { }

  ngOnInit(): void {
    this.countries = [
      { name: 'India' }
    ];
    this.state=[{name:'odisha'}]
    this.allDistricts.forEach(district=>{
      this.district.push({name:district})
    })
   
    this.getKvks({"select":"*","projection":""})
    console.log(this.kvkdetailsForm.value);
    
  }

  public getKvks(apiData:any){

   

    this.apiparameter.fetchdata('Kvks_Details',apiData).subscribe((res:any)=>{
      console.log(res);
      this.serchloading=false;
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
        "projection":`district='${this.kvkdetailsForm.value.district?.name}' AND state='${this.kvkdetailsForm.value.state?.name}'`
      }
      this.serchloading=true;
      this.getKvks(apidata)
    }else{
      
    }
    
   

    
  }

}
