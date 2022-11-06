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
  @HostListener("window", ['$event'])
  window: any;
  searchForm = new FormGroup({
    case_id: new FormControl('', [Validators.required, Validators.pattern("^WAC[0-9]{4,13}$")])
  })
  caseAllDeatails: any={};
  constructor(

    private agriculture: AgricultureService,
    private appservices: AppService,
    private apiParameterScript: ApiParameterScript

  ) { }

  ngOnInit(): void {

    this.window = window
    



  }
  loading = false;

  search(case_id: any) {
    this.loading = true;
    var apiData = {
      "select": "*",
      "projection": `case_id='${case_id}'`
    }
    this.apiParameterScript.fetchdata('agriculture_case', apiData).subscribe((res: any) => {
      this.loading = false;
      if (res.success && res['data'].length>0) {
        this.caseAllDeatails['caseInformation'] = res['data']
        this.caseAllDeatails['case_id']=res['data'][0]['case_id']
        this.caseAllDeatails['satus']=res['data'][0]['case_status']
        console.log(this.caseAllDeatails);
        
      } else {
        
      }
    })
  }
  getErrorMessage() {


    if (this.searchForm.controls.case_id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.searchForm.controls.case_id.hasError('pattern') ? 'Case No Most Be Start With "WAC"' : '';

  }

  print(doc: any) {
    console.log(doc);

    var printContents = document.getElementById("chiku")?.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents ? printContents : '';
    doc.print()
    document.body.innerHTML = originalContents;
    // location.reload()



  }



}
