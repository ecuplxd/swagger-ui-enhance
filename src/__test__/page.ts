import { HttpClientModule } from '@angular/common/http';
import { DebugElement, OnInit, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ApiItem } from 'src/app/api/api.model';
import { StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { ButtonClickEvents } from './click';
import { StoreServiceStub } from './mock';
import { STORE_DATA_MOCK } from './storeData';

class Componnet implements OnInit {
  static usePage = 0;

  ngOnInit(): void {
    Componnet.usePage++;
    // console.log('use Page: ' + Componnet.usePage);
  }
}

export class Page<T extends Componnet> {
  static imports = [MatSnackBarModule, HttpClientModule];

  static providers = [
    {
      provide: StoreService,
      useClass: StoreServiceStub,
    },
  ];

  fixture!: ComponentFixture<T>;

  component: T;

  store!: StoreServiceStub;

  de!: DebugElement;

  des: DebugElement[] = [];

  constructor(component: Type<T>, detectChanges = true, injectStore = true) {
    new Componnet().ngOnInit();
    this.fixture = TestBed.createComponent(component);
    this.component = this.fixture.componentInstance;

    if (injectStore) {
      this.store = TestBed.inject(StoreService) as StoreServiceStub;
    }

    if (detectChanges) {
      this.detectChanges();
    }
  }

  doNgOnInit(): this {
    this.component.ngOnInit();
    return this;
  }

  detectChanges(): this {
    this.fixture.detectChanges();
    return this;
  }

  query<U = HTMLElement>(selector: string): U {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll<U = HTMLElement>(selector: string): U[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }

  getText<U extends HTMLElement>(selector: string): string {
    const el = this.query<U>(selector);
    return el.innerText.trim();
  }

  getAttr<U extends HTMLElement>(
    selector: string,
    attr: string
  ): string | null {
    const el = this.query<U>(selector);
    return el.getAttribute(attr);
  }

  queryDe(selector: string): DebugElement {
    this.de = this.fixture.debugElement.query(By.css(selector));
    return this.de;
  }

  queryAllDe(selector: string): DebugElement[] {
    this.des = this.fixture.debugElement.queryAll(By.css(selector));
    return this.des;
  }

  click(el: HTMLElement): this {
    el.click();
    return this;
  }

  clickDe(de?: DebugElement, eventObj: Any = ButtonClickEvents.left): this {
    (de || this.de).triggerEventHandler('click', eventObj);

    return this;
  }

  installEmptyData(): this {
    this.store.useEmptyData();
    return this.doNgOnInit().detectChanges();
  }

  installData(): this {
    this.store.useNotEmptyData();
    return this.doNgOnInit().detectChanges();
  }

  getApiItem(
    apiIndex: number,
    namespaceIndex: number = 0,
    projectIndex: number = 0
  ): ApiItem {
    return STORE_DATA_MOCK.projects[projectIndex].namespaces[namespaceIndex]
      .apiItems[apiIndex];
  }
}
