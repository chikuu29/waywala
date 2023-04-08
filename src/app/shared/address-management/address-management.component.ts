import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.scss']
})
export class AddressManagementComponent implements OnInit {

  userInfo: any
  selectedAddress: any;
  allAddress: any[] = []
  active_edit_update_mode: boolean = false;
  addAddressForm = new FormGroup({
    address_Type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    landmark: new FormControl('', []),
    original_phone: new FormControl('', [Validators.required]),
    alternative_phone: new FormControl('', []),
    pin_code: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl({ name: 'Odisha' }, [Validators.required]),
    country: new FormControl("INDIA", [Validators.required]),
    locality: new FormControl('', [Validators.required])

  })

  addressType: string[] = ["HOME", "OFFICE", "OTHER"]
  state: any[] = []

  constructor(
    public activeModal: NgbActiveModal,
    private appservices: AppService,
    private ApiParameterScript: ApiParameterScript
  ) { }

  ngOnInit(): void {

    console.log("country_state_district.json", this.appservices.country_state_district);

    this.state = _.map(this.appservices.country_state_district, state => ({ name: state.state }))
    console.log(this.state);

    this.userInfo = this.appservices.authStatus

    var apiData = `SELECT *  FROM user_address WHERE user_ID='${this.appservices.authStatus.email}'`
    this.ApiParameterScript.fetchDataFormQuery(apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        res['data'].map((address: any) => {
          var data = JSON.parse(address['address_INFO'])
          var temp = []
          // temp.push('Name: ' + data['name']);
          // temp.push('Address: ' + data['address']);
          // temp.push('Phone: ' + data['original_phone'] + ',' + data['alternative_phone']);
          // temp.push('Locality: ' + data['locality']);
          // temp.push('City: ' + data['city']);
          // temp.push('Pincode: ' + data['pin_code']);
          // temp.push('Country: ' + data['country']);
          // temp.push('State: ' + data['state'].name);


          temp.push(data['name']);
          temp.push(data['address']);
          temp.push(data['landmark']);
          temp.push(data['original_phone'] + ',' + data['alternative_phone']);
          temp.push(data['locality']);
          temp.push(data['city']);
          temp.push(data['pin_code']);
          temp.push(data['state'].name);
          temp.push(data['country']);
          address['display_address_INFO'] = temp.join(",\n")
        })
        this.allAddress = res['data']
        console.log(this.allAddress);
      }


    })
  }
  public getErrorMessage() {
    if (this.addAddressForm.controls.name.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.addAddressForm.controls.address_Type.hasError('required')) {
      return 'You must enter a value'
    }

    return '';

  }


  public save_Address() {

    console.log(this.addAddressForm.value);
    var apiData = {
      "data": `user_ID='${this.appservices.authStatus.email}',address_INFO='${JSON.stringify(this.addAddressForm.value)}'`
    }
    this.ApiParameterScript.savedata('user_address', apiData, false).subscribe((res: any) => {

      console.log(res);
      if(res.success){
        
        this.addAddressForm.reset();
        this.active_edit_update_mode=false
        this.ngOnInit()

      }else{

      }


    })


  }
}
