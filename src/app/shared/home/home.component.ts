import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  sliders: any[] = []

  contactForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone_no:new FormControl('',[Validators.required]),
    message:new FormControl('',[Validators.required])
  })
  constructor(private apiParameter: ApiParameterScript) { }
  ngOnInit(): void {
    this.sliders = [{}, {}, {}]
  }

  getToPrev() {
    console.log("getToPrev");

    this.ngCarousel.prev();
  }
  // Move to next slide
  goToNext() {
    console.log("goToNext");
    this.ngCarousel.next();
  }


  send() {
    
   if(this.contactForm.valid){
    var apiData = {
      "data": `name='${this.contactForm.value.name}',phone_no='${this.contactForm.value.phone_no}',email='${this.contactForm.value.email}',message='${this.contactForm.value.message}'`,
      "auth": true
    }
    console.log(apiData);
    this.blockUI.start('Sending...')
    this.apiParameter.savedata('contact_us', apiData).subscribe((res: any) => {
      console.log("res", res);
      this.blockUI.stop()
      if (res.success) {
        this.contactForm.reset()
        Swal.fire('Thank You We Will Get Back Soon You', res.message, 'success')
      } else {
        Swal.fire('Error!', res.message, 'error')
      }
    })
   }else{
    Swal.fire('Opps!','Please Fill All Input','info')
   }
  }

}
