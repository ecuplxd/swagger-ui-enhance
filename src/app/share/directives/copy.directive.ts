import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CopyComponent } from '../components/copy/copy.component';
import { TranslateService } from '../service';
import { Any } from '../share.model';

@Directive({
  selector: '[appCopy]',
})
export class CopyDirective implements OnInit, OnDestroy {
  @Input() appCopy = false;

  @Input() appCopyTitle = 'copy';

  @Input() appCopyValue!: string;

  @Input() appCopySelector!: string;

  constructor(
    private templateRef: TemplateRef<Any>,
    private viewContainer: ViewContainerRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.appCopy) {
      const componentRef = this.viewContainer.createComponent(CopyComponent);
      const instance = componentRef.instance as CopyComponent;

      instance.value = this.appCopyValue;
      instance.title = this.translate.tr(this.appCopyTitle);
      instance.selector = this.appCopySelector;
    }
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
