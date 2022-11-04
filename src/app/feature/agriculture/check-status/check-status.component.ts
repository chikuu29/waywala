import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.scss']
})
export class CheckStatusComponent implements OnInit {
  searchForm=new FormGroup({
    case_id: new FormControl('', [Validators.required,Validators.pattern("^WAC[0-9]{13}$")])
  })
  constructor() { }

  ngOnInit(): void {
  }
  loading = false;

  search(case_id:any) {
    console.log(case_id);
    
      
      
  }
  getErrorMessage(){
   

      if (this.searchForm.controls.case_id.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.searchForm.controls.case_id.hasError('pattern') ? 'Case No Most Start With "WAC0000000000000"' : '';
    
  }
}
