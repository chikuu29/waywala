import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  copiedIndex: number;
  allCopunCode: any[] = []
  textToCopy: any = '';
  constructor(
    private apiParameterScript: ApiParameterScript,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {

    var apiData = {
      "select": "*",
      'projection': "active='Yes'"

    }
    this.apiParameterScript.fetchdata('cuppon_code', apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.allCopunCode = res['data']
      } else {
        this.allCopunCode = []
      }

    })
  }


  onCopySuccess(event: any, index: any) {

    if (event) {
      this.copiedIndex = index

      this.alert.success('Cupon copied successfully')
    }
    console.log('Text copied successfully', event);
  }

  onCopyError() {
    console.error('Error copying text');
  }

}
