import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-become-agricultue-investigrator',
  templateUrl: './become-agricultue-investigrator.component.html',
  styleUrls: ['./become-agricultue-investigrator.component.scss']
})
export class BecomeAgricultueInvestigratorComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  sellOnWaywalaContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    additionalInfo: new FormControl('', [Validators.required]),
    businessName: new FormControl('', [Validators.required]),
    adharNo: new FormControl('', [Validators.required]),
    addressInfo: new FormControl('', [Validators.required]),
    sellingCategory: new FormControl<any | null>(null),
    ceatedTime:new FormControl(moment().format('LLL').toString())
  })

  sellingCategoryOption: any[] =
    [
      { name: 'Vegitable' },
      { name: 'Agriculture Medicine' },
      { name: 'Fashion' },
      { name: 'Other' }
    ]

  constructor(
    private Title: Title,
    private _formBuilder: FormBuilder,
    private ApiParameterScript: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.Title.setTitle('Become Our Agriculture Advisor : Solve Agriculture Farming Problem Through Our Website')
  }

  getErrorMessage() {

  }

  send() {


    this.sellOnWaywalaContactForm.value.sellingCategory=JSON.stringify(this.sellOnWaywalaContactForm.value.sellingCategory)    
    var apiData = {
      "keyName":encodeURIComponent(JSON.stringify(Object.keys(this.sellOnWaywalaContactForm.value))),
      "multiDataSet":encodeURIComponent(JSON.stringify([this.sellOnWaywalaContactForm.value]))
    }
  
    if(this.sellOnWaywalaContactForm.valid){
      this.blockUI.start('Please Wait...')
      this.ApiParameterScript.savedata('becomesellercontactform', apiData, true).subscribe((res:any)=>{
        console.log(res);
        this.blockUI.stop()
        if(res.success){
          Swal.fire('Success',res.message,'success').then(()=>{
            this.sellOnWaywalaContactForm.reset()
          })
        }else{
          Swal.fire('Success',res.message,'error')
        }
        
      })

    }else{
      Swal.fire('Please fill All ','','warning')
    }
    
  }

}
