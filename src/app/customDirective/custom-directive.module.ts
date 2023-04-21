import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickedoutsideDirective } from './clickedoutside.directive';



@NgModule({
  declarations: [
    ClickedoutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ClickedoutsideDirective
  ]
})
export class CustomDirectiveModule { }
