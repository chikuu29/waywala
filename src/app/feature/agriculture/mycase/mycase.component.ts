import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-mycase',
  templateUrl: './mycase.component.html',
  styleUrls: ['./mycase.component.scss']
})
export class MycaseComponent implements OnInit {

  constructor(
    private apiParameterScript:ApiParameterScript,
    private appservices:AppService
    ) { }

    caseData:any=[]
  ngOnInit(): void {
    
    console.log(this.appservices.authStatus);
    
    var apiData={
      "select":"case_id,case_received_date",
      "projection":""
    }
    this.apiParameterScript.fetchdata('agriculture_case',apiData).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.caseData=res['data']

      }else{
        this.caseData=[]
      }
      
    })

  }

  public onrate(event:any,case_id:any){
    console.log(event);
    console.log(case_id);
    
  }

}
