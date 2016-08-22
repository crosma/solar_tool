import {Directive, ElementRef, HostListener, Input} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[bootstrapTab]',
})
export class BootstrapTab {
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    $(this.el).tab('show');
  }
}
