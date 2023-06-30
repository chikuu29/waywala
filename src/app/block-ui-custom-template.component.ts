import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-ui-custom-template',
  styles: [`
    :host {
      text-align: center;
      color: white;
    }
  `],
  template: `
    <div class="block-ui-template">
    <!-- <img src="../resources/logo.png" style="width:70px"> -->
      <img [attr.src]="loaderLogo" style="width:90px"
      onerror="this.src='./assets/media/logos/loader-logo-icon.png'"  alt="..." />
      <div><strong>{{message}}</strong></div>
    </div>
  `


})
export class BlockUiCustomTemplateComponent {

  public message:any='Please Wait...'
  public loaderLogo='assets/img/loader/loader.svg'

}
