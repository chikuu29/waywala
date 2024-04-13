import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { random } from 'lodash';
import { timestamp } from 'rxjs';

@Directive({
  selector: '[appClickedoutside]'
})
export class ClickedoutsideDirective {

  constructor(
    private el:ElementRef
  ) { }
  @Output() public clickoutside =new EventEmitter()
  @HostListener('document:click',['$event.target'])
  public onclick(target:any){
    const clickedInside=this.el.nativeElement.contains(target);
    if(!clickedInside){      
      this.clickoutside.emit(target)
    }
  }

}
