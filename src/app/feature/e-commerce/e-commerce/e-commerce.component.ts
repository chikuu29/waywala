import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {

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
