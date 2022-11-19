import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public feedback: any[] = []
  constructor(
    private apiParameterScript:ApiParameterScript
  ) { }

  ngOnInit(): void {

    this.apiParameterScript.fetchdata("agriculture_case_review",{select:"case_review,case_review_time,case_review_note,feedback_by",order:'id'}).subscribe((res:any)=>{
      console.log(res);

      if(res.success){
        res['data'].forEach((element:any) => {
          console.log(element);
          if(element.case_review>3){
            this.feedback.push(element)
          }
          
          
        });
        // this.feedback=res['data']
      }else{
        this.feedback=[]
      }
      
    })
  }

}
