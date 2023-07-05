import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
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
  sellOnWaywalaContactForm = new FormGroup({
    name: new FormControl(this.appServices.authStatus.name, [Validators.required]),
    email: new FormControl(this.appServices.authStatus.email, [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]),
    additionalInfo: new FormControl('', []),
    adharNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.minLength(12), Validators.maxLength(12)]),
    addressInfo: new FormControl('', [Validators.required]),
    ceatedTime: new FormControl(moment().format('LLL').toString()),
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
  constructor(
    private Title: Title,
    private _formBuilder: FormBuilder,
    private ApiParameterScript: ApiParameterScript,
    private appServices: AppService,
    private modalService: NgbModal,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
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


  getAddress(){

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

    if (this.sellOnWaywalaContactForm.valid) {
      if (this.otpgenerationRequired) {
        this.blockUI.start('Please Wait...')
        this.http.post(this.appServices.getApipath() + 'auth/otp/generate_otp.php', { "email": this.sellOnWaywalaContactForm.value.email, creatAT: moment().format('LLL') }).subscribe((otp_send_res: any) => {
          this.blockUI.stop()

          if (otp_send_res.success) {
            const modalRef = this.modalService.open(GenericOtpVerificationComponent);
            modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
            modalRef.result.then((modalInstance: any) => {

              console.log(modalInstance);
              if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {

                this.http.post(this.appServices.getApipath() + 'auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

                  if (otpMatch.success) {
                    this.otpgenerationRequired=true;
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
                    this.otpgenerationRequired=false
                    Swal.fire(otpMatch.message, '', 'error').then(()=>{
                      this.send()
                    })
                  }

                })

              } else {

              }




            })
          } else {
            Swal.fire(otp_send_res.message,'','error')
          }
        })
      }else{
        const modalRef = this.modalService.open(GenericOtpVerificationComponent);
        modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
        modalRef.result.then((modalInstance: any) => {

          console.log(modalInstance);
          if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {

            this.http.post(this.appServices.getApipath() + 'auth/otp/otpmatch.php', { "email": this.sellOnWaywalaContactForm.value.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

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
                Swal.fire(otpMatch.message, '', 'error').then(()=>{
                  this.send()
                })
              }

            })

          } else {

          }




        })
      }

    } else {
      Swal.fire('Please fill All ', '', 'warning')
    }

  }

}
