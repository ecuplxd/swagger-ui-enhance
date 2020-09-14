import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appStopClick]',
})
export class StopClickDirective {
  @Input() stopPropagation = true;

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.stopPropagation) {
      event.stopPropagation();
    }
  }

  constructor() {}
}
