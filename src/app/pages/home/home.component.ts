import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  constructor(private apiParameter: ApiParameterScript, private title:Title,) { }
  ngOnInit(): void {
    this.title.setTitle('Welcome to Waywala')
    this.sliders = [
      {
        "main_heading":"Agriculture",
        "sub_heading_one":"Medicine",
        "sub_heading_two":"Provider",
        "main_message":"JUST CONNECT WITH US WITH CREATING A CASE FOR YOUR DAMAGE CROP",
        "image_url":"assets/img/1.png",
        "router_link":"/agriculture"

      }, 
      {
        "main_heading":"E-Commerce",
        "sub_heading_one":"SELL TO US",
        "sub_heading_two":"BUY FROM US",
        "main_message":"BUY & SELL AGRICULTURAL PRODUCT,MEDICINE,VEGITABLE  ....",
        "image_url":"assets/img/2.png",
        "router_link":"/e-commerce"

      }]
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
    this.apiParameter.savedata('contact_us', apiData,false).subscribe((res: any) => {
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
