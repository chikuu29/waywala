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
  caseAllDeatails: any = {};
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
  selectedImage: any[] = []
  imageURL: string = 'https://admin.waywala.com/api/medicine/upload/'
  constructor(

    private agricultureService: AgricultureService,
    private apiParameterScript: ApiParameterScript,
    private _rout: ActivatedRoute,
    private AppService: AppService,
    private title: Title,

  ) { }

  ngOnInit(): void {

    this.title.setTitle("Agriculture Case :- CHECK YOUR CASE STATUS")
    this.imageURL = this.AppService.getAdminApiPath() + "medicine/upload/";
    this.window = window
    this._rout.params.subscribe((res: any) => {
      if (res.caseID) {
        this.searchForm.setValue({ case_id: res.caseID })
        console.log(res.caseID);
        this.search(this.searchForm.value.case_id)
      }


    })




  }
  loading = false;

  search(case_id: any) {
    this.caseAllDeatails = {}
    this.loading = true;
    let apiData = {
      "select": "*",
      "projection": `case_id='${case_id}'`,
      "auth": true
    }
    this.apiParameterScript.fetchdata('agriculture_case', apiData).subscribe((res: any) => {

      console.log(res);

      if (res.success && res['data'].length > 0) {
        this.caseAllDeatails['caseInformation'] = res['data']
        this.caseAllDeatails['case_id'] = res['data'][0]['case_id']
        this.caseAllDeatails['satus'] = res['data'][0]['case_status']

        if (this.caseAllDeatails['satus'] == 'completed') {
          let apiData = {
            "select": "medicine,caseSuggestion",
            "projection": `case_id='${case_id}' AND status='completed'`,
            "auth": true
          }
          this.apiParameterScript.fetchdata('agriculture_case_status', apiData).subscribe((caseResolution: any) => {
            // console.log(caseResolution);
            this.loading = false;
            if (caseResolution.success && caseResolution['data'].length > 0) {
              var resolutionData = caseResolution['data'][0];
              if (resolutionData['medicine'] != '') {
                resolutionData['medicine'] = JSON.parse(window.atob(resolutionData['medicine']))
              }
              this.caseAllDeatails['caseResolution'] = resolutionData
              console.log(this.caseAllDeatails);
            } else {
              this.caseAllDeatails['caseResolution'] = []
              console.log("no data found");

            }

          })
        } else {
          this.loading = false;
          console.log('no Case Resolution Found');

        }
      } else {
        this.loading = false;
        this.caseAllDeatails = {}

      }
    })
  }
  getErrorMessage() {


    if (this.searchForm.controls.case_id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.searchForm.controls.case_id.hasError('pattern') ? 'Case No Most Be Start With "WAC"' : '';

  }

  viewimage(image: any) {

    this.selectedImage = []
    this.displayBasic = true
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

  dowonloads(case_id: any) {

    // let DATA: any = document.getElementById('print-section');
    // console.log("DownLoad PDF",DATA)
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 209;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save(case_id+'.pdf');
    // });

    // console.log("Case",this.caseAllDeatails)

    // const doc = new jsPDF();

    // // Add brand logo
    // const logoImg = new Image();
    // logoImg.src = 'assets/img/logo2.png'; // Path to your brand logo
    // doc.addImage(logoImg, 'PNG', 10, 10, 50, 50); // Adjust position and size as needed

    // // Add table data
    // const tableData = [
    //   ['Name', 'Age', 'Email'],
    //   ['John Doe', '30', 'john@example.com'],
    //   ['Jane Smith', '25', 'jane@example.com']
    //   // Add more rows as needed
    // ];
    // autoTable(doc,{
    //   head: tableData.splice(0, 1),
    //   body: tableData
    // });

    // doc.save('test.pdf');



    const doc = new jsPDF();

    // Add brand logo
    const logoImg = new Image();
    logoImg.src = 'assets/img/logo2.png'; // Path to your brand logo
    const logoWidth = 40; // Adjust logo width
    const logoHeight = 40; // Adjust logo height
    const centerX = (doc.internal.pageSize.width / 2) - (logoWidth / 2); // Calculate center X position
    const centerY = 10; // Adjust Y position
    doc.addImage(logoImg, 'PNG', centerX, centerY, logoWidth, logoHeight); // Adjust position and size as needed

    // Add case information
    const startY = 70; // Starting Y position for the first table
    const tableHeaders = ['Case ID', 'Created By', 'Status', 'Description', 'Received Date', 'Assigned To'];

    this.caseAllDeatails.caseInformation.forEach((caseInfo: any, index: number) => {
      const caseInfoTable = [
        [
          caseInfo.case_id,
          caseInfo.case_created_by,
          caseInfo.case_status,
          caseInfo.case_description,
          caseInfo.case_received_date,
          caseInfo.case_assign
        ]
      ];
      const tableY = startY + (index * 60); // Adjust spacing between tables
      autoTable(doc, {
        head: [tableHeaders],
        body: caseInfoTable,
        startY: tableY
      });
    });

    // Add case resolution
    const caseResolution = this.caseAllDeatails.caseResolution.caseSuggestion;
    const resolutionY = startY + this.caseAllDeatails.caseInformation.length * 60 + 10; // Adjust positioning
    doc.text('Case Resolution:', 10, resolutionY);
    doc.setFontSize(10);
    doc.text(caseResolution, 10, resolutionY + 5, { maxWidth: 190 });
    doc.save(case_id + '.pdf');




  }

  dowonload(case_id: any) {
    const doc = new jsPDF();

    // Add "Logo Test" text

    // Add brand logo below the text
    const logoImg = new Image();
    logoImg.src = 'assets/img/logo2.png'; // Path to your brand logo
    const logoWidth = 30; // Adjust logo width
    const logoHeight = 30; // Adjust logo height
    const centerX = (doc.internal.pageSize.width / 2) - (logoWidth / 2); // Calculate center X position
    const centerY = 0; // Adjust Y position
    doc.addImage(logoImg, 'PNG', centerX, centerY, logoWidth, logoHeight); // Adjust position and size as needed
    // doc.setFontSize(14);
    // doc.text('Logo Test', centerX, centerY+10);
    // Add "Report For WAC6581711620418" text
    // doc.setFontSize(16);
    // doc.text('Report For ' + case_id, 10, centerY+10);
    doc.html("<h1>Report For</h1>");

    // Add case information
    const startY = centerY + logoHeight + 10; // Starting Y position for the first table
    const tableHeaders = ['Case ID', 'Created By', 'Status', 'Description', 'Received Date', 'Assigned To'];

    this.caseAllDeatails.caseInformation.forEach((caseInfo: any, index: any) => {
      const caseInfoTable = [
        [
          caseInfo.case_id,
          caseInfo.case_created_by,
          caseInfo.case_status,
          caseInfo.case_description,
          caseInfo.case_received_date,
          caseInfo.case_assign
        ]
      ];
      const tableY = startY + (index * 60); // Adjust spacing between tables
      autoTable(doc, {
        head: [tableHeaders],
        body: caseInfoTable,
        startY: tableY
      });
    });
    // Add case resolution
    const caseResolution = this.caseAllDeatails.caseResolution.caseSuggestion;
    const resolutionY = startY + this.caseAllDeatails.caseInformation.length * 60 + 10; // Adjust positioning
    console.log("resolutionY",resolutionY)
    doc.text('Case Resolution:', 10, resolutionY);
    doc.setFontSize(10);
    doc.text(caseResolution, 10, resolutionY + 5, { maxWidth: 190 });

    doc.save(case_id + '.pdf');
  }


  public navigateToBuyingpage(url: any) {

    if (url && url != '') {

      window.open(url, '_blank');



    }

  }



}
