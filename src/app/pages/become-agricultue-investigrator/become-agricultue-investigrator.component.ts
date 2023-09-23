import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogarithmicScale } from 'chart.js';
import _ from 'lodash';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import { GenericOtpVerificationComponent } from 'src/app/shared/generic-otp-verification/generic-otp-verification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-become-agricultue-investigrator',
  templateUrl: './become-agricultue-investigrator.component.html',
  styleUrls: ['./become-agricultue-investigrator.component.scss']
})
export class BecomeAgricultueInvestigratorComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  sellOnWaywalaContactForm = new FormBuilder().group({
    name: new FormControl(this.appServices.authStatus.name, [Validators.required]),
    email: new FormControl(this.appServices.authStatus.email, [Validators.required, Validators.email]),
    phone: new FormControl(this.appServices.authStatus.phone_no, [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]),
    addressInfo: new FormControl('', [Validators.required]),
    additionalInfo: new FormControl('', []),
    adharNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.minLength(12), Validators.maxLength(12)]),
    adhar_document: new FormControl('', [Validators.required]),
    qualification: new FormControl('', [Validators.required]),
    qualification_document: new FormControl('', [Validators.required]),
    experienced_type: new FormControl('Fresher', [Validators.required]),
    experienced_time_period: new FormControl('', []),
    experienced_document: new FormControl('', []),
    resume: new FormControl('', [Validators.required]),
    tell_about_you: new FormControl('', [Validators.required]),
    ceatedTime: new FormControl(moment().format('LLL').toString()),
    checkme: new FormControl('', [Validators.required])
  });



  sellOnWaywalaContactFormDATA: any = []
  otpgenerationRequired: boolean = true;
  uploadURL: string = ''
  uploadedFiles: any = {
    "adhar_document": [],
    'resume': [],
    'experienced_document': [],
    'qualification_document': []

  }

  constructor(
    private Title: Title,
    private _formBuilder: FormBuilder,
    private ApiParameterScript: ApiParameterScript,
    private appServices: AppService,
    private modalService: NgbModal,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    // console.log(this.appServices.getApipath()+`storage/upload.php?token=${this.appServices.authStatus._refreshkey}`);
    this.uploadURL = this.appServices.getAdminApiPath() + `generic/upload.php?token=${this.appServices.authStatus._refreshkey}`;
    this.Title.setTitle('Become Our Agriculture Advisor : Solve Agriculture Farming Problem Through Our Website')

    var apiData = {
      "select": "*",
      "projection": `email='${this.appServices.authStatus.email}'`,
      "order": "id"
    }
    this.blockUI.start('Please Wait..')
    this.ApiParameterScript.fetchdata("become_agricultural_reviewer_request", apiData).subscribe((res: any) => {
      console.log(res);
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        this.sellOnWaywalaContactFormDATA = res['data']
      } else {
        this.sellOnWaywalaContactFormDATA = []
      }

    })
  }


  getAddress() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    // modalRef.componentInstance.modalTitle = res.name;
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email

    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {
        console.log(modalInstance.address.display_address_INFO);
        this.sellOnWaywalaContactForm.controls['addressInfo'].setValue(modalInstance.address.display_address_INFO)
      }
    }, (reason: any) => {
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })

  }

  getErrorMessage() {

  }

  send() {


    var apiData = {
      "keyName": encodeURIComponent(JSON.stringify(Object.keys(this.sellOnWaywalaContactForm.value))),
      "multiDataSet": encodeURIComponent(JSON.stringify([this.sellOnWaywalaContactForm.value]))
    }
    console.log("FormData", this.sellOnWaywalaContactForm);


    if (this.sellOnWaywalaContactForm.valid) {
      if (this.otpgenerationRequired) {
        this.blockUI.start('Please Wait...')
        this.ApiParameterScript.dynamicApiExecute('auth/otp/generate_otp.php', { "email": this.sellOnWaywalaContactForm.value.email, creatAT: moment().format('LLL') }).subscribe((otp_send_res: any) => {
          this.blockUI.stop()

          if (otp_send_res.success) {
            const modalRef = this.modalService.open(GenericOtpVerificationComponent);
            modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
            modalRef.result.then((modalInstance: any) => {

              console.log(modalInstance);
              if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {

                this.ApiParameterScript.dynamicApiExecute('auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

                  if (otpMatch.success) {
                    this.otpgenerationRequired = true;
                    this.blockUI.start("Please Wait")
                    this.ApiParameterScript.savedata('become_agricultural_reviewer_request', apiData, true).subscribe((res: any) => {
                      console.log(res);
                      this.blockUI.stop()
                      if (res.success) {
                        Swal.fire('Success', res.message, 'success').then(() => {
                          this.ngOnInit()
                          this.sellOnWaywalaContactForm.reset()
                        })
                      } else {
                        Swal.fire('Success', res.message, 'error')
                      }

                    })
                  } else {
                    this.otpgenerationRequired = false
                    Swal.fire(otpMatch.message, '', 'error').then(() => {
                      this.send()
                    })
                  }

                })

              } else {

              }




            })
          } else {
            Swal.fire(otp_send_res.message, '', 'error')
          }
        })
      } else {
        const modalRef = this.modalService.open(GenericOtpVerificationComponent);
        modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
        modalRef.result.then((modalInstance: any) => {

          console.log(modalInstance);
          if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {

            this.ApiParameterScript.dynamicApiExecute('auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

              if (otpMatch.success) {
                this.blockUI.start("Please Wait")
                // this.blockUI.start('Please Wait...')
                this.ApiParameterScript.savedata('become_agricultural_reviewer_request', apiData, true).subscribe((res: any) => {
                  console.log(res);
                  this.blockUI.stop()
                  if (res.success) {
                    Swal.fire('Success', res.message, 'success').then(() => {
                      this.ngOnInit()
                      this.sellOnWaywalaContactForm.reset()
                    })
                  } else {
                    Swal.fire('Success', res.message, 'error')
                  }

                })
              } else {
                Swal.fire(otpMatch.message, '', 'error').then(() => {
                  this.send()
                })
              }

            })

          } else {

          }




        })
      }

    } else {
      const formControls: any = this.sellOnWaywalaContactForm.controls; // Assuming this is your form controls object
      const invalidControlKeys = _.filter(_.keys(formControls), key => formControls[key].invalid);
      console.log(invalidControlKeys);
      const fieldLabelMapping :any= {
        "addressInfo": "Address Info",
        "adharNo": "Aadhar Number",
        "adhar_document": "Aadhar Document",
        "experienced_document":'Experienced Document',
        "experienced_time_period":'Experienced time period',
        "qualification": "Qualification",
        "qualification_document": "Qualification Document",
        "resume": "Resume",
        "tell_about_you": "Tell About You",
        "checkme": "agree all statements"
      };
      
      // Convert the array of field names to an array of objects
      // Swal.fire('Please fill All ', '', 'warning')
      var warningText='<ol>'
      invalidControlKeys.forEach((e:any)=>{
        warningText+=`<li style='padding:4px;color:red;'>${fieldLabelMapping[e]}</li>`

      })
      warningText=warningText+'</0l>'
      Swal.fire({title:'Please Fill All Mandtory Details', html:warningText,icon:'warning'})
    }

  }

  onUploadDocument(event: any, type: any) {
    console.log(event);

    var res = event.originalEvent['body'];
    if (res.success) {
      for (let file of event.files) {
        this.uploadedFiles[type].push(file);
      }
      const control = this.sellOnWaywalaContactForm.get(type) as FormControl;
      control.setValue(res.doc)
      this.messageService.add({ severity: 'success', summary: 'success', detail: res.message });
    } else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: res.message });
    }

  }

  onChangeTypeOfExperienced() {
    console.log("onChange onChangeTypeOfExperienced");
    if (this.sellOnWaywalaContactForm.value.experienced_type == 'Fresher') {
      this.sellOnWaywalaContactForm.controls.experienced_time_period.clearValidators()
      this.sellOnWaywalaContactForm.controls.experienced_document.clearValidators()
      this.sellOnWaywalaContactForm.value.experienced_time_period = ''
      this.sellOnWaywalaContactForm.controls.experienced_time_period.reset()

    } else {
      this.sellOnWaywalaContactForm.controls.experienced_time_period.setValidators(Validators.required)
      this.sellOnWaywalaContactForm.controls.experienced_document.setValidators(Validators.required)
    }
    this.sellOnWaywalaContactForm.controls.experienced_time_period.updateValueAndValidity();
    this.sellOnWaywalaContactForm.controls.experienced_document.updateValueAndValidity();

  }

}
