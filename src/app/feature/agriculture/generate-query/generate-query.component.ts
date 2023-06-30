import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-generate-query',
  templateUrl: './generate-query.component.html',
  styleUrls: ['./generate-query.component.scss'],
  providers: [MessageService, AppService]
})
export class GenerateQueryComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  fileuploadForm = new FormGroup({
    desc: new FormControl('', [Validators.required])
    
  })

  isLogin=false;
  multiple = true;
  uploadedFiles: any[] = [];
  caseData:any={};
  uploadURL: any;
  isfileUploaded:boolean=false;
  SP = SPINNER.squareJellyBox;
  public loaderText:any='';
  constructor(private http: HttpClient, private loader: NgxUiLoaderService, private messageService: MessageService, private appservices: AppService,private agriculture:AgricultureService) { }
 
  ngOnInit(): void {
  
    this.uploadURL = `${this.appservices.getApipath()}agri/upload.php?token=${this.appservices.authStatus ? this.appservices.authStatus._refreshkey : ''}`;
    // console.log(this.uploadURL);
    
  }


  public createCase() {
    // this.loader.start();
    // this.agriculture.loadertext.next('Case Creating')
    this.blockUI.start("Case Creating")
    if (this.fileuploadForm.valid && this.uploadedFiles.length > 0) {
      this.caseData={
        email:this.appservices.authStatus.email,
        description:this.fileuploadForm.value.desc
      }
      this.agriculture.createCase(this.caseData).subscribe((res)=>{
        console.log(res);
        this.blockUI.stop()
        if(res.success){
          Swal.fire(
            res.message,
            `Your Case Is Created With this <span class="fw-bold">Case ID-${res.caseId}</span>  Please Note This`,
            'success'
          ).then(()=>{
            window.location.reload()
          })
        }else{
          Swal.fire("Please Try", res.message,'error')
        }
      })

    } else {
      this.blockUI.stop()
      this.messageService.add({ severity: 'warn', summary: 'warning', detail: 'Please Fill All data & upload file' });
    }
  }

  onUpload(event: any) {
    var res=event.originalEvent['body'];
    if(res.success){
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.isfileUploaded=res.success;
      this.messageService.add({ severity: 'success', summary: 'success', detail: res.msg });

    }else{
      this.messageService.add({ severity: 'error', summary: 'error', detail: res.msg });
    }
  }

  cancle(){
    this.uploadedFiles=[];
    this.isfileUploaded=false;
  }



}
