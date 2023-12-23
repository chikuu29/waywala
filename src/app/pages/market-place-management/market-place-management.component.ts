import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { GenericOtpVerificationComponent } from 'src/app/shared/generic-otp-verification/generic-otp-verification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-market-place-management',
  templateUrl: './market-place-management.component.html',
  styleUrls: ['./market-place-management.component.scss']
})
export class MarketPlaceManagementComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  isEditable: true;
  constructor(
    private apiParameterScript: ApiParameterScript,
    private _formBuilder: FormBuilder,
    private appServices: AppService,
    private modalService:NgbModal
  ) { }
  loginDeatails: FormGroup = this._formBuilder.group({
    name: new FormControl(this.appServices.authStatus.name, Validators.required),
    email: new FormControl(this.appServices.authStatus.email, [Validators.required, Validators.email]),
    phone: new FormControl(this.appServices.authStatus.phone_no, [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]),
  });
  locationDeatails: FormGroup = this._formBuilder.group({
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),


  });

  marketDeatails: FormGroup = this._formBuilder.group({
    market_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
    date: new FormControl({ value: moment().toISOString(), disabled: true }, [Validators.required]),
  });
  productDeatails: FormGroup = this._formBuilder.group({
    category: new FormControl({ value: '', disabled: false }, [Validators.required]),
    product_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
  });

  productPrice: FormGroup = this._formBuilder.group({
    quanty: [{ value: '', disabled: false }, [Validators.required]],
    price: [{ value: '', disabled: false }, [Validators.required]],
  });
  stateOption: any[] = [
    {
      name: 'Odisha',
      value: 'odisha'
    }
  ]
  districtOption: any[] = [
    {
      name: 'Puri',
      value: 'puri'
    }
  ]
  categoryOption: any[] = [
    {
      name: 'Vegitable',
      value: 'vegitable'
    }
  ]

  ngOnInit(): void {
  }

  submit(data?: any) {
    console.log("data", data);
    console.log(this.loginDeatails);

    if (this.loginDeatails.valid && this.locationDeatails.valid && this.productDeatails.valid && this.productPrice.valid && this.marketDeatails.valid) {

      let mergedAllStepObject = { ...this.loginDeatails.value, ...this.locationDeatails.value, ...this.productDeatails.value, ...this.productPrice.value, ...this.marketDeatails.value };
      this.blockUI.start("Please Wait")
      console.log("mergedAllStepObject", mergedAllStepObject);
      this.apiParameterScript.dynamicApiExecute('auth/otp/generate_otp.php', { "email": mergedAllStepObject.email, creatAT: moment().format('LLL') }).subscribe((otp_send_res: any) => {
        this.blockUI.stop()
        if (otp_send_res.success) {
          const modalRef = this.modalService.open(GenericOtpVerificationComponent);
          modalRef.componentInstance.modalTitle = "OTP VERIFICATION PROCESS FOR YOUR SECURITY";
          modalRef.result.then((modalInstance: any) => {

            console.log(modalInstance);
            if (modalInstance.TYPE = "RETURN_USER_ENTER_OTP") {

              this.apiParameterScript.dynamicApiExecute('auth/otp/otpmatch.php', { "email": mergedAllStepObject.email, otp: modalInstance.OTP }).subscribe((otpMatch: any) => {

                if (otpMatch.success) {
                  // this.otpgenerationRequired = true;
                  this.blockUI.start("Please Wait")
                  var apiData = {
                    "keyName": encodeURIComponent(JSON.stringify(Object.keys(mergedAllStepObject))),
                    "multiDataSet": encodeURIComponent(JSON.stringify([mergedAllStepObject]))
                  }
                  this.apiParameterScript.savedata('market_place_information', mergedAllStepObject, true).subscribe((res: any) => {
                    console.log(res);
                    this.blockUI.stop()
                    if (res.success) {
                      Swal.fire('Success', "We Will Review Your Details & Get Back To You", 'success').then(() => {
                        this.ngOnInit()
                        // this.sellOnWaywalaContactForm.reset()
                      })
                    } else {
                      Swal.fire('Success', res.message, 'error')
                    }

                  })
                } else {
                  // this.otpgenerationRequired = false
                  Swal.fire(otpMatch.message, '', 'error').then(() => {
                    this.submit()
                  })
                }

              })

            } else {

            }




          })
        } else {
          Swal.fire(otp_send_res.message, '', 'error')
        }
      }, (Error) => {
        this.blockUI.stop()
      })
    } else {

      Swal.fire({
        title: "warning",
        text: "Please Completed All Steps",
        icon: "warning"
      });
    }


  }

}
