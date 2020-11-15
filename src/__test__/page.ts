import { DebugElement, OnInit, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApiItem } from 'src/app/api/api.model';
import { StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { ButtonClickEvents } from './click';
import { StoreServiceStub } from './mock';
import { STORE_DATA_MOCK } from './storeData';

class Componnet implements OnInit {
  ngOnInit(): void {}
}

export class Page<T extends Componnet> {
  fixture!: ComponentFixture<T>;

  component: T;

  store!: StoreServiceStub;

  de!: DebugElement;

  des: DebugElement[] = [];

  constructor(component: Type<T>, detectChanges = true) {
    this.fixture = TestBed.createComponent(component);
    this.component = this.fixture.componentInstance;
    this.store = TestBed.inject(StoreService) as StoreServiceStub;

    if (detectChanges) {
      this.detectChanges();
    }
  }

  detectChanges(reInit = false): void {
    if (reInit) {
      this.component.ngOnInit();
    }

    this.fixture.detectChanges();
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

  queryDe(selector: string): DebugElement {
    this.de = this.fixture.debugElement.query(By.css(selector));
    return this.de;
  }

  queryAllDe(selector: string): DebugElement[] {
    this.des = this.fixture.debugElement.queryAll(By.css(selector));
    return this.des;
  }

  click(el: HTMLElement, reInit = true): void {
    el.click();

    this.detectChanges(reInit);
  }

  clickDe(
    de: DebugElement,
    eventObj: Any = ButtonClickEvents.left,
    reInit = true
  ): void {
    (de || this.de).triggerEventHandler('click', eventObj);

    this.detectChanges(reInit);
  }

  installEmptyData(): void {
    this.store.useEmptyData();
    this.detectChanges(true);
  }

  installData(): void {
    this.store.useNotEmptyData();
    this.detectChanges(true);
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
