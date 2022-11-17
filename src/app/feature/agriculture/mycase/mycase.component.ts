import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseReviewComponent } from 'src/app/shared/case-review/case-review.component';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { LoaderService } from 'src/app/services/loader.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mycase',
  templateUrl: './mycase.component.html',
  styleUrls: ['./mycase.component.scss']
})
export class MycaseComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private modalService: NgbModal,
    private loaderServices: NgxUiLoaderService,
    private loaderconfig: LoaderService,
    private toster: ToastrService,
  ) { }
  tempCasedata: any[] = [];
  caseData: any = []
  ngOnInit(): void {
    // this.loaderconfig.SP.next(SPINNER.ballSpinClockwise);
    

    this.blockUI.start("Loading...")
    // this.loaderServices.start()
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
          if (casereview.success && casereview['data'].length > 0) {
            var case_review = casereview['data']
            caseData.forEach((el: any) => {
              if (_.find(case_review, { case_id: el.case_id })) {
                el['case_review'] = Number(_.find(case_review, { case_id: el.case_id }).case_review)
                this.tempCasedata.push(el)
              } else {
                el['case_review'] = 0
                this.tempCasedata.push(el)
              }
            })
            this.blockUI.stop()
            this.caseData = this.tempCasedata
          }

        })

      } else {
        this.blockUI.stop()
        this.caseData = []
      }

    })

  }

  public onrate(event: any, case_id: any) {
    // this.loaderconfig.SP.next(SPINNER.ballSpinClockwise);
    // this.loaderServices.start()
    var apiData = {
      "select": "case_id,case_review_note",
      "projection": `case_id='${case_id}'`
    }
    
    this.apiParameterScript.fetchdata("agriculture_case_review", apiData).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        var updateData = {
          "data": `case_review=${event.value}`,
          "projection": `case_id='${case_id}'`
        }
        // console.log(updateData);
        this.apiParameterScript.updatedata("agriculture_case_review", updateData).subscribe((updateRes: any) => {
          console.log(updateRes);
          this.toster.info(`You Gave ${event.value} Star Rating`)
          if (updateRes.success) {

            const modalRef = this.modalService.open(CaseReviewComponent);
            modalRef.componentInstance.modalTitle = "Please Give Your FeedBack!";
            modalRef.componentInstance.case_id = case_id;
            modalRef.componentInstance.rating = event.value;
            modalRef.result.then((modalInstance: any) => {
              if (modalInstance.success) {

              }
            }, ((reason: any) => {
              console.log(reason);
            }))


          }
        })

      }
      else {
        var insertData = {
          "data": `case_review=${event.value},case_id='${case_id}'`
        }
        // console.log(insertData);
        this.apiParameterScript.savedate("agriculture_case_review", insertData).subscribe((insertRes: any) => {
          console.log(insertRes);
          this.toster.info(`You Gave ${event.value} Star Rating`)
          if (insertRes.success) {
            const modalRef = this.modalService.open(CaseReviewComponent);
            modalRef.componentInstance.msodalTitle = "Please Give Your FeedBack!";
            modalRef.componentInstance.rating = event.value;
            modalRef.componentInstance.case_id = case_id;
            modalRef.result.then((modalInstance: any) => {
              if (modalInstance.success) {

              }
            }, ((reason: any) => {
              console.log(reason);
            }))

          }
        })
      }

    })

  }

}
