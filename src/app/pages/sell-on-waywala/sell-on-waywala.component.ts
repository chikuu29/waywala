import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-sell-on-waywala',
  templateUrl: './sell-on-waywala.component.html',
  styleUrls: ['./sell-on-waywala.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SellOnWaywalaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  sellOnWaywalaContactForm = new FormGroup({
    name: new FormControl(this.appServices.authStatus.name, [Validators.required]),
    email: new FormControl(this.appServices.authStatus.email, [Validators.required, Validators.email]),
    phone: new FormControl(this.appServices.authStatus.phone_no, [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10), Validators.maxLength(10)]),
    additionalInfo: new FormControl('', []),
    businessName: new FormControl('', [Validators.required]),
    adharNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.minLength(12), Validators.maxLength(12)]),
    addressInfo: new FormControl('', [Validators.required]),
    adhar_document: new FormControl('', [Validators.required]),
    pan_document: new FormControl('', [Validators.required]),
    sellingCategory: new FormControl('',[Validators.required]),
    ceatedTime: new FormControl(moment().format('LLL').toString()),
    igst_no: new FormControl('', []),
    pan_no: new FormControl('', [Validators.required]),
    checkme: new FormControl('', [Validators.required])
  })

  sellingCategoryOption: any[] =
    [
      { name: 'Vegitable' },
      { name: 'Agriculture Medicine' },
      { name: 'Fashion' },
      { name: 'Other' }
    ]
  sellOnWaywalaContactFormDATA: any = []
  otpgenerationRequired: boolean = true;
  uploadURL: string = ''
  uploadedFiles: any = {
    "adhar_document": [],
    'resume': [],
    'pan_document': [],
    'qualification_document': []

  }

  private confettiInterval: any;
  private containerEl: HTMLElement;
  private confettiFrequency = 3;
  private confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
  private confettiAnimations = ['slow', 'medium', 'fast'];
  constructor(
    private Title: Title,
    private _formBuilder: FormBuilder,
    private ApiParameterScript: ApiParameterScript,
    private appServices: AppService,
    private modalService: NgbModal,
    private http: HttpClient,
    private messageService: MessageService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.uploadURL = this.appServices.getAdminApiPath() + `generic/upload.php?token=${this.appServices.authStatus._refreshkey}`;

    this.Title.setTitle('Sell on Waywala : waywala.com')
    var apiData = {
      "select": "*",
      "projection": `email='${this.appServices.authStatus.email}'`,
      "order": "id"
    }
    this.blockUI.start('Please Wait..')
    this.ApiParameterScript.fetchdata("becomesellercontactform", apiData).subscribe((res: any) => {
      console.log(res);
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        if(res['data'][0].status=="Approved"){
          this.setupElements()
          this.renderConfetti()
        }
        this.sellOnWaywalaContactFormDATA = res['data']
      } else {
        this.sellOnWaywalaContactFormDATA = []
      }

    })
  }

  getErrorMessage() {

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

  send() {


    this.sellOnWaywalaContactForm.value.sellingCategory = JSON.stringify(this.sellOnWaywalaContactForm.value.sellingCategory)
    var apiData = {
      "keyName": encodeURIComponent(JSON.stringify(Object.keys(this.sellOnWaywalaContactForm.value))),
      "multiDataSet": encodeURIComponent(JSON.stringify([this.sellOnWaywalaContactForm.value]))
    }
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
                    this.ApiParameterScript.savedata('becomesellercontactform', apiData, true).subscribe((res: any) => {
                      console.log(res);
                      this.blockUI.stop()
                      if (res.success) {
                        Swal.fire('Success', "We Will Review Your Details & Get Back To You", 'success').then(() => {
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
        },(Error)=>{
          this.blockUI.stop()
        })
      } else {
        const modalRef = this.modalService.open(GenericOtpVerificationComponent);
        modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
        modalRef.result.then((modalInstance: any) => {

          console.log(modalInstance);
          if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {
            this.ApiParameterScript.dynamicApiExecute('auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

              // this.http.post(this.appServices.getApipath() + 'auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

              if (otpMatch.success) {
                this.blockUI.start("Please Wait")
                this.ApiParameterScript.savedata('becomesellercontactform', apiData, true).subscribe((res: any) => {
                  console.log(res);
                  this.blockUI.stop()
                  if (res.success) {
                    Swal.fire('Success', "We Will Review Your Details & Get Back To You", 'success').then(() => {
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
      const fieldLabelMapping: any = {
        "addressInfo": "Address Info",
        "businessName":"Business Name",
        "adharNo": "Aadhar Number",
        "adhar_document": "Upload Aadhar Document",
        "pan_document": "Upload Pan Document",
        "experienced_document": 'Experienced Document',
        "experienced_time_period": 'Experienced time period',
        "qualification": "Qualification",
        "qualification_document": "Qualification Document",
        "resume": "Resume",
        "tell_about_you": "Tell About You",
        "checkme": "agree all statements",
        "sellingCategory":"Select your selling category",
        "pan_no":"Pan No"
      };

      // Convert the array of field names to an array of objects
      // Swal.fire('Please fill All ', '', 'warning')
      var warningText = '<ol>'
      invalidControlKeys.forEach((e: any) => {
        warningText += `<li style='padding:4px;color:red;'>${fieldLabelMapping[e]}</li>`

      })
      warningText = warningText + '</0l>'
      Swal.fire({ title: 'Please Fill All Mandtory Details', html: warningText, icon: 'warning' })
    }
  }

  reset() {
    this.sellOnWaywalaContactForm.reset()
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

  private setupElements(): void {
    this.containerEl = document.createElement('div');
    const elPosition = this.el.nativeElement.style.position;

    if (elPosition !== 'relative' && elPosition !== 'absolute') {
      this.el.nativeElement.style.position = 'relative';
    }

    this.containerEl.classList.add('confetti-container');
    this.el.nativeElement.appendChild(this.containerEl);
  }

  private renderConfetti(): void {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = (Math.floor(Math.random() * this.el.nativeElement.offsetWidth)) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      setTimeout(() => {
        this.containerEl.removeChild(confettiEl);
      }, 1000);

      this.containerEl.appendChild(confettiEl);
    }, 25);
  }

  ngOnDestroy(): void {
    clearInterval(this.confettiInterval);
  }

}
