// https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover

import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { MenuPositionService, StoreService } from 'src/app/share/service';
import { ApiItem, ApiMethod } from '../api.model';

// import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-api-summary',
  templateUrl: './api-summary.component.html',
  styleUrls: ['./api-summary.component.less'],
})
export class ApiSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('levelOneTrigger') menuTrigger!: MatMenuTrigger;

  @ViewChild('levelTwoTrigger') menuTrigger2!: MatMenuTrigger;

  @ViewChild('btn') btn!: MatButton;

  @Input() apiItems: ApiItem[] = [];

  @Input() namespaceIndex!: number;

  groups: Map<ApiMethod, ApiItem[]> = new Map();

  methods: ApiMethod[] = [];

  showSubMenu = true;

  opened = false;

  prevButtonTrigger!: MatMenuTrigger;

  enteredButton = false;

  isMatMenuOpen = false;

  isMatMenu2Open = false;

  constructor(
    private store: StoreService,
    private render: Renderer2,
    private menuPositionService: MenuPositionService
  ) {}

  ngOnInit(): void {
    this.showSubMenu = this.apiItems.length > 9;
  }

  ngAfterViewInit(): void {
    this.menuTrigger.menuOpened.pipe(/* delay(1000) */).subscribe(() => {
      this.menuPositionService.recalculateMenu(this.menuTrigger);
    });
  }

  groupByMethod(): void {
    this.apiItems.forEach((apiItem: ApiItem, index: number) => {
      const method = apiItem.__info.method;
      apiItem.__index = index;

      if (this.groups.get(method)) {
        this.groups.get(method)!.push(apiItem);
      } else {
        this.methods.push(method);
        this.groups.set(method, [apiItem]);
      }
    });
  }

  selectApi(apiIndex: number): void {
    this.store.updateData({
      namespaceIndex: this.namespaceIndex,
      apiIndex,
    });
  }

  handleMenuOpen(): void {
    if (!this.opened && this.showSubMenu) {
      this.groupByMethod();
    }

    this.opened = true;
  }

  menuenter(): void {
    this.isMatMenuOpen = true;

    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger: MatMenuTrigger, button: MatButton): void {
    setTimeout(() => {
      this.isMatMenuOpen = false;

      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.removeFocusElCdkClass(trigger, button);
      }
    }, 80);
  }

  menu2enter(): void {
    this.isMatMenu2Open = true;
  }

  menu2Leave(
    trigger1: MatMenuTrigger,
    trigger2: MatMenuTrigger,
    button: MatButton
  ): void {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        this.removeFocusElCdkClass(trigger1, button);

        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
      } else {
        this.isMatMenu2Open = false;

        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger: MatMenuTrigger): void {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;

        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;

        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: MatMenuTrigger, button: MatButton): void {
    setTimeout(() => {
      // isMatMenuOpen = false 移到另一个 namespace
      if (this.enteredButton && !this.isMatMenuOpen) {
        this.removeFocusElCdkClass(trigger, button);
      }

      if (!this.isMatMenuOpen) {
        this.removeFocusElCdkClass(trigger, button);
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  removeFocusElCdkClass(trigger: MatMenuTrigger, el: MatButton): void {
    trigger.closeMenu();

    const nativeElement = el._elementRef.nativeElement;

    this.render.removeClass(nativeElement, 'cdk-focused');
    this.render.removeClass(nativeElement, 'cdk-program-focused');
  }
}
