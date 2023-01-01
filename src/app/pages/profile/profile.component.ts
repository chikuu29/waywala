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

  profile: any;
  email: string;
  edit: any = 'btn btn-info';
  update: any = 'btn btn-info d-noun';
  showtext: any = 'col-sm-9 text-secondary';
  showtextbox: any = 'col-sm-9 text-secondary d-noun';
  name: string;
  phone: number;
  address: string;
  constructor(private apiparameter: ApiParameterScript, private appservices: AppService) { }

  ngOnInit(): void {
    console.log(this.appservices.authStatus)
   this.fatchdata();
  }

  fatchdata(){
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

  updateuser() {
    this.edit = 'btn btn-info d-noun';
    this.update = 'btn btn-info';
    this.showtext = 'col-sm-9 text-secondary d-noun';
    this.showtextbox = 'col-sm-9 text-secondary';
  }

   onclickupdatebtn(){
    var apiData = {
     'data' : `name='${this.name}' ,mobile_no='${this.phone}',address='${this.address}'`,
      "projection": `email='${this.profile.email}'`
    }
         this.apiparameter.updatedata('user' , apiData ).subscribe((res : any)=>{
            //console.log(res);

            if(res.success){
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
            }

            this.update = 'btn btn-info d-noun';
            this.edit = 'btn btn-info';
            this.showtextbox= 'col-sm-9 text-secondary d-noun';
            this.showtext = 'col-sm-9 text-secondary';
            this.fatchdata();
         });
   }


}
