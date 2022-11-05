import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';
@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.scss']
})
export class CheckStatusComponent implements OnInit {
  searchForm=new FormGroup({
    case_id: new FormControl('', [Validators.required,Validators.pattern("^WAC[0-9]{13}$")])
  })
  constructor(

    private agriculture:AgricultureService,
    private appservices:AppService,
    private apiParameterScript:ApiParameterScript
   
    ) { }
 
  ngOnInit(): void {
    
    
  }
  loading = false;

  search(case_id:any) {
    this.loading = true;
    var apiData={
      "select":"*",
      "projection":`case_id='${case_id}'`
    }
    this.apiParameterScript.fetchdata('agriculture_case',apiData).subscribe((res:any)=>{
      this.loading = false;
      console.log(res);
    })
  }
  getErrorMessage(){
   

      if (this.searchForm.controls.case_id.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.searchForm.controls.case_id.hasError('pattern') ? 'Case No Most Start With "WAC0000000000000"' : '';
    
  }



 
}
