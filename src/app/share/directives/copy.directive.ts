import {
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Directive, TemplateRef } from '@angular/core';
import { CopyComponent } from '../components/copy/copy.component';

@Directive({
  selector: '[appCopy]',
})
export class CopyDirective implements OnInit, OnDestroy {
  @Input() appCopy = false;

  @Input() appCopyTitle = '复制';

  @Input() appCopyValue!: string;

  @Input() appCopySelector!: string;

  constructor(
    // tslint:disable-next-line: no-any
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.appCopy) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        CopyComponent
      );

      const componentRef = this.viewContainer.createComponent(componentFactory);
      const instance = componentRef.instance as CopyComponent;

      instance.value = this.appCopyValue;
      instance.title = this.appCopyTitle;
      instance.selector = this.appCopySelector;
    }
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
