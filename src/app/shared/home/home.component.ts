import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  sliders:any[]=[]
  
  constructor(private apiParameter:ApiParameterScript) { }
  ngOnInit(): void {
    this.sliders=[{},{},{}]
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


  send(){
    var apiData={
      "data":"name='surynarayan',email='demo@gmail.com',phone_no='123',message='Demo text'",
      "auth":true
    }
    this.apiParameter.savedata('contact_us',apiData).subscribe((res:any)=>{
      console.log(res);
      
    })
  }

}
