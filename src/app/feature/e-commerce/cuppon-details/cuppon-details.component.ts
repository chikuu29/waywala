import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuppon-details',
  templateUrl: './cuppon-details.component.html',
  styleUrls: ['./cuppon-details.component.scss']
})
export class CupponDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  copyCoponCode(copyText: any) {
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    // navigator.clipboard.writeText(copyText);
    alert("Copied the text: " + copyText);
  }

}
