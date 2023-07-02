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
    this.activeModal.close({"success":true,"feedBack":this.feedBack})
   
  }

}
