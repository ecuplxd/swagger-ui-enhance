import { Directive, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '../service';

@Directive({
  // eslint-disable-next-line
  selector: '[tr]',
})
export class TrDirective implements OnInit {
  constructor(private el: ElementRef, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.trEl(this.el.nativeElement as HTMLElement);
  }
}
