import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

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
    console.log("target",target);
    
    console.log("onCLicks",this.el.nativeElement);
    
    const clickedInside=this.el.nativeElement.contains(target);
    console.log(clickedInside);
    
    if(!clickedInside){
      console.log("oputsideClick");
      
      this.clickoutside.emit(target)
    }
  }

}
