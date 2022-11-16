import { Component, OnInit } from '@angular/core';
import { from, map } from 'rxjs';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import _ from 'lodash';
@Component({
  selector: 'app-mycase',
  templateUrl: './mycase.component.html',
  styleUrls: ['./mycase.component.scss']
})
export class MycaseComponent implements OnInit {

  constructor(
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService
  ) { }
  tempCasedata: any[]=[];
  caseData: any = []
  ngOnInit(): void {

    console.log(this.appservices.authStatus);

    var apiData = {
      "select": "case_id,case_received_date,case_status",
      "projection": ""
    }
    this.apiParameterScript.fetchdata('agriculture_case', apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        var caseData = from(res['data']);
        this.caseData = res['data']
        this.apiParameterScript.fetchdata("agriculture_case_review", {
          "select": "case_id,case_review",
          "projection": ""
        }).subscribe((casereview: any) => {
          console.log(casereview);
          if (casereview.success && casereview['data'].length > 0) {
            var case_review=casereview['data']
            caseData.forEach((el:any)=>{
              if(_.find(case_review,{case_id:el.case_id})){
                el['case_review']=Number(_.find(case_review,{case_id:el.case_id}).case_review)
                this.tempCasedata.push(el)
              }else{
                el['case_review']=0
                this.tempCasedata.push(el)
              }
            })
            // console.log(this.tempCasedata);
            this.caseData=this.tempCasedata
          }

        })

      } else {
        this.caseData = []
      }

    })

  }

  public onrate(event: any, case_id: any) {
    console.log(event);
    console.log(case_id);
    var apiData = {
      "select": "case_id",
      "projection": `case_id='${case_id}'`
    }
    this.apiParameterScript.fetchdata("agriculture_case_review",apiData).subscribe((res:any)=>{
      if(res.success && res['data'].length>0){
        var updateData={
          "data":`case_review=${event.value}`,
          "projection":`case_id='${case_id}'`
        }
        console.log(updateData);
        this.apiParameterScript.updatedata("agriculture_case_review",updateData).subscribe((res:any)=>{
          console.log(res);
          
        })
      }
      else{
        var insertData={
          "data":`case_review=${event.value},case_id='${case_id}'`
        }
        console.log(insertData);
        this.apiParameterScript.savedate("agriculture_case_review",insertData).subscribe((res:any)=>{
          console.log(res);
          
        })
      }
      
    })

  }

}
