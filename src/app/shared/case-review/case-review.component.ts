import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiParameterScript } from 'src/app/script/api-parameter';
@Component({
  selector: 'app-case-review',
  templateUrl: './case-review.component.html',
  styleUrls: ['./case-review.component.scss']
})
export class CaseReviewComponent implements OnInit {
  modalTitle:any='';
  case_id:any='';
  rating:number=0;
  feedBack:string=''
  constructor(
    public activeModal: NgbActiveModal,
    private toster: ToastrService,
    private apiParameterScript: ApiParameterScript,
  ) { }

  ngOnInit(): void {
  }
  
  public submit(){
    console.log(this.feedBack);
    var updateApiData={
      "data":`case_review_note='${this.feedBack}'`,
      "projection":`case_id='${this.case_id}'`
    }
    console.log("updateApiData--->",updateApiData);
    this.apiParameterScript.updatedata('agriculture_case_review',updateApiData).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.toster.success("Thank you for your feedback")
        this.activeModal.close({"success":true})
      }else{
        this.activeModal.close({"success":false})
      }
      
    })
  }

}
