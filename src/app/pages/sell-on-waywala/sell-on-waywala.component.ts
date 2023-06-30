import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sell-on-waywala',
  templateUrl: './sell-on-waywala.component.html',
  styleUrls: ['./sell-on-waywala.component.scss']
})
export class SellOnWaywalaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  sellOnWaywalaContactForm = new FormGroup({
    name: new FormControl(this.appServices.authStatus.name, [Validators.required]),
    email: new FormControl(this.appServices.authStatus.email, [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/), Validators.minLength(10),Validators.maxLength(10)]),
    additionalInfo: new FormControl('', []),
    businessName: new FormControl('', [Validators.required]),
    adharNo: new FormControl('', [Validators.required,Validators.pattern(/^\d{12}$/), Validators.minLength(12), Validators.maxLength(12)]),
    addressInfo: new FormControl('', [Validators.required]),
    sellingCategory: new FormControl<any | null>(null),
    ceatedTime: new FormControl(moment().format('LLL').toString()),
    igst_no: new FormControl('',[]),
    pan_no: new FormControl('',[Validators.required]),
    checkme:new FormControl('',[Validators.required])
  })

  sellingCategoryOption: any[] =
    [
      { name: 'Vegitable' },
      { name: 'Agriculture Medicine' },
      { name: 'Fashion' },
      { name: 'Other' }
    ]
  sellOnWaywalaContactFormDATA: any = []
  constructor(
    private Title: Title,
    private _formBuilder: FormBuilder,
    private ApiParameterScript: ApiParameterScript,
    private appServices: AppService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.Title.setTitle('Sell on Waywala : waywala.com')
    var apiData = {
      "select": "*",
      "projection": `email='${this.appServices.authStatus.email}'`,
      "order":"id"
    }
    this.blockUI.start('Please Wait..')
    this.ApiParameterScript.fetchdata("becomesellercontactform", apiData).subscribe((res: any) => {
      console.log(res);
      this.blockUI.stop()
      if(res.success && res['data'].length>0){
         this.sellOnWaywalaContactFormDATA=res['data']
      }else{
        this.sellOnWaywalaContactFormDATA=[]
      }

    })
  }

  getErrorMessage() {

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

  send() {


    this.sellOnWaywalaContactForm.value.sellingCategory = JSON.stringify(this.sellOnWaywalaContactForm.value.sellingCategory)
    var apiData = {
      "keyName": encodeURIComponent(JSON.stringify(Object.keys(this.sellOnWaywalaContactForm.value))),
      "multiDataSet": encodeURIComponent(JSON.stringify([this.sellOnWaywalaContactForm.value]))
    }

    if (this.sellOnWaywalaContactForm.valid) {
      this.blockUI.start('Please Wait...')
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
      Swal.fire('Please fill All ', '', 'warning')
    }

  }

  reset(){
    this.sellOnWaywalaContactForm.reset()
  }

}
