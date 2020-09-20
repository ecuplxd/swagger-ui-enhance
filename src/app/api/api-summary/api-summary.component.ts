// https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover

import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ApiItem, ApiMethod } from '../api.model';
import { MenuPositionService, StoreService } from 'src/app/share/service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { Any } from 'src/app/share/share.model';
// import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-api-summary',
  templateUrl: './api-summary.component.html',
  styleUrls: ['./api-summary.component.less'],
})
export class ApiSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('levelOneTrigger') menuTrigger!: MatMenuTrigger;

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
      apiItem.__index = index;

      if (this.groups.get(apiItem.__info.method)) {
        this.groups.get(apiItem.__info.method)?.push(apiItem);
      } else {
        this.methods.push(apiItem.__info.method);
        this.groups.set(apiItem.__info.method, [apiItem]);
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
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;

        trigger.closeMenu();

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-focused'
        );

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenuOpen = false;
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
        trigger1.closeMenu();

        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-focused'
        );

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger: MatMenuTrigger): void {
    setTimeout(() => {
      const menu = trigger.menu as Any;
      const firstEl =
        menu.items.first && menu.items.first._elementRef.nativeElement;

      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;

        trigger.openMenu();

        if (firstEl) {
          this.render.removeClass(firstEl, 'cdk-focused');

          this.render.removeClass(firstEl, 'cdk-program-focused');
        }
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;

        trigger.openMenu();

        if (firstEl) {
          this.render.removeClass(firstEl, 'cdk-focused');
          this.render.removeClass(firstEl, 'cdk-program-focused');
        }
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: MatMenuTrigger, button: MatButton): void {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-focused'
        );

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-focused'
        );

        this.render.removeClass(
          button._elementRef.nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }
}
