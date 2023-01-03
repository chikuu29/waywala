import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/appModules/userModules';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  allowprofileUpdate:boolean=false
  profile: any;
  email: string;
  name: string;
  phone: number;
  address: string;
  constructor(private apiparameter: ApiParameterScript, private appservices: AppService) { }

  ngOnInit(): void {
    console.log(this.appservices.authStatus)
    this.getprofile();
  }

  getprofile() {
    var apiData = {
      "select": "*",
      "projection": `email='${this.appservices.authStatus.email}'`
    }
    this.apiparameter.fetchdata('user', apiData).subscribe((res: any) => {

      //console.log(res)
      if (res.success) {
        this.profile = res['data'][0]
        this.name = this.profile.name;
        this.phone = this.profile.mobile_no;
        this.address = this.profile.address;
      } else {
        Swal.fire("error", res.message, "error")
      }
    })
  }

  edit() {

    this.allowprofileUpdate=true

  }

  updateprofile() {
    var apiData = {
      'data': `name='${this.name}',mobile_no='${this.phone}',address='${this.address}'`,
      "projection": `email='${this.profile.email}'`
    }
    console.log("apiData",apiData);
    this.apiparameter.updatedata('user', apiData).subscribe((res: any) => {
      //console.log(res);

      if (res.success) {
        this.allowprofileUpdate=false
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Updated  successfully'
        })
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: res.message
        })
      }
      this.getprofile();
    });
  }

  cancle(){
    this.allowprofileUpdate=false
  }

}
