import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';
@Component({
  selector: 'app-generate-query',
  templateUrl: './generate-query.component.html',
  styleUrls: ['./generate-query.component.scss'],
  providers: [MessageService, AppService]
})
export class GenerateQueryComponent implements OnInit {

  images: String[] = [];
  fileuploadForm = new FormGroup({
    desc: new FormControl('', [Validators.required])
    // file: new FormControl('', [Validators.required]),
    // fileSource: new FormControl('', [Validators.required])

  })

  isLogin=false;
  multiple = true;
  uploadedFiles: any[] = [];
  caseData:any={};
  constructor(private http: HttpClient, private loader: NgxUiLoaderService, private messageService: MessageService, private appservices: AppService,private agriculture:AgricultureService) { }
  uploadURL: any;
  ngOnInit(): void {

    // console.log(this.appservices);

    // console.log(this.appservices.loginUserData.token ? this.appservices.loginUserData.token:'');
    // this.isLogin=this.appservices.loginUserData;
    console.log(this.appservices);
    
    this.uploadURL = `https://waywala.com/api/agri/upload.php?token=${this.appservices.loginUserData.token ? this.appservices.loginUserData.token : ''}`;
    console.log(this.uploadURL);


  }


  public createCase() {

    if (this.fileuploadForm.valid && this.uploadedFiles.length > 0) {
      
      console.log(this.fileuploadForm.value);
      this.caseData={
        email:this.appservices.loginUserData.useremail,
        description:this.fileuploadForm.value.desc
      }

      // console.log(this.caseData);
      
      this.agriculture.createCase(this.caseData).subscribe((res)=>{
        console.log(res);

        if(res.success){
          Swal.fire(
            res.message,
            `Your Case Is Created With this <span class="fw-bold">Case ID-${res.caseId}</span>  Please Note This`,
            'success'
          ).then(()=>{
            
            

          })

        }else{
          Swal.fire("Please Try", res.message,'error')
        }
        

      })

    } else {

      this.messageService.add({ severity: 'warn', summary: 'Please Fill All data & upload file', detail: '' });


    }





  }


  onUpload(event: any) {
    var res=event.originalEvent['body'];
    if(res.success){
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.messageService.add({ severity: 'success', summary: 'success', detail: res.msg });

    }else{
      this.messageService.add({ severity: 'error', summary: 'error', detail: res.msg });
    }

  
  }



}
