import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { AgricultureService } from '../services/agriculture.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas';
import { Title } from '@angular/platform-browser';
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
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  displayBasic: boolean = false;
  selectedImage:any[]=[]
  imageURL: string = 'https://admin.waywala.com/api/medicine/upload/'
  constructor(

    private agricultureService: AgricultureService,
    private apiParameterScript: ApiParameterScript,
    private _rout: ActivatedRoute,
    private AppService:AppService,
    private title: Title,

  ) { } 

  ngOnInit(): void {

    this.title.setTitle("Agriculture Case :- CHECK YOUR CASE STATUS")
    this.imageURL = this.AppService.getAdminApiPath() + "medicine/upload/";
    this.window = window
    this._rout.params.subscribe((res:any)=>{
      if(res.caseID){
        this.searchForm.setValue({case_id:res.caseID})
        console.log(res.caseID);
        this.search(this.searchForm.value.case_id)
      }
      
      
    })
    



  }
  loading = false;

  search(case_id: any) {
    this.caseAllDeatails={}
    this.loading = true;
    let apiData = {
      "select": "*",
      "projection": `case_id='${case_id}'`,
      "auth":true
    }
    this.apiParameterScript.fetchdata('agriculture_case', apiData).subscribe((res: any) => {
     
      console.log(res);
      
      if (res.success && res['data'].length>0) {
        this.caseAllDeatails['caseInformation'] = res['data']
        this.caseAllDeatails['case_id']=res['data'][0]['case_id']
        this.caseAllDeatails['satus']=res['data'][0]['case_status']
        
        if(this.caseAllDeatails['satus'] =='completed'){
          let apiData = {
            "select": "medicine,caseSuggestion",
            "projection": `case_id='${case_id}' AND status='completed'`,
            "auth":true
          }
          this.apiParameterScript.fetchdata('agriculture_case_status',apiData).subscribe((caseResolution:any)=>{
            // console.log(caseResolution);
            this.loading = false;
            if(caseResolution.success && caseResolution['data'].length>0){
                var resolutionData=caseResolution['data'][0];
                if(resolutionData['medicine'] !=''){
                  resolutionData['medicine'] =JSON.parse(window.atob(resolutionData['medicine']))
                }
                this.caseAllDeatails['caseResolution']=resolutionData
                console.log(this.caseAllDeatails);
            }else{
              this.caseAllDeatails['caseResolution']=[]
              console.log("no data found");
              
            }
            
          })
        }else{
          this.loading = false;
          console.log('no Case Resolution Found');
          
        }
      } else {
        this.loading = false;
        this.caseAllDeatails={}
        
      }
    })
  }
  getErrorMessage() {


    if (this.searchForm.controls.case_id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.searchForm.controls.case_id.hasError('pattern') ? 'Case No Most Be Start With "WAC"' : '';

  }

  viewimage(image:any){

    this.selectedImage=[]
    this.displayBasic=true
    image.forEach((e: any) => {
      this.selectedImage.push(
        {
          "previewImageSrc": `https://admin.waywala.com/api/medicine/upload/${e}`,
          "thumbnailImageSrc": `https://admin.waywala.com/api/medicine/upload/${e}`,
          "alt": e,
          "title": e
        }
      )
    })
  }

  print(doc: any) {
    console.log(doc);
    var printContents = document.getElementById("print-section")?.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents ? printContents : '';
    doc.print()
    document.body.innerHTML = originalContents;
    location.reload()
  }

  dowonload(case_id:any){
    
    let DATA: any = document.getElementById('print-section');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 209;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(case_id+'.pdf');
    });
  }


 public navigateToBuyingpage(url:any){

  if(url && url !=''){
   
    window.open(url, '_blank');

    
    
  }

  }



}
