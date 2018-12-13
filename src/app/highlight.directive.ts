import { Directive, HostListener, HostBinding, Input, OnInit,Output } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }
  @Input() defaultColor = 'white';
  @Input('appHighlight') highlightcolor = 'pink';
  @Input() LeaveColor = 'cyan';
  //private backgroundcolor = this.defaultColor;
  private backgroundcolor = 'blue';

  ngOnInit()
  {
    this.backgroundcolor = this.defaultColor;
  }

  @HostListener('mouseenter') Mouseover()
  {
    this.backgroundcolor = this.highlightcolor ; 

  }

  @HostListener('mouseleave') mouseleave()
  {
    this.backgroundcolor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') get setcolor()
  {
    return this.backgroundcolor;
  }

}
