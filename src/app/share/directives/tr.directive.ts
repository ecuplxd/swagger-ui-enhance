import { Directive, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '../service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[tr]',
})
export class TrDirective implements OnInit {
  constructor(private el: ElementRef, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.tr(this.el.nativeElement as HTMLElement);
  }
}
