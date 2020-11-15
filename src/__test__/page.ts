import { DebugElement, OnInit, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { ButtonClickEvents } from './click';
import { StoreServiceStub } from './mock';

class Componnet implements OnInit {
  ngOnInit(): void {}
}

export class Page<T extends Componnet> {
  fixture!: ComponentFixture<T>;

  component: T;

  store!: StoreServiceStub;

  de!: DebugElement;

  des: DebugElement[] = [];

  constructor(component: Type<T>) {
    this.fixture = TestBed.createComponent(component);
    this.component = this.fixture.componentInstance;
    this.store = TestBed.inject(StoreService) as StoreServiceStub;
  }

  query<U>(selector: string): U {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll<U>(selector: string): U[] {
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

    if (reInit) {
      this.component.ngOnInit();
    }
    this.fixture.detectChanges();
  }

  clickDe(de: DebugElement, eventObj: Any = ButtonClickEvents.left): void {
    (de || this.de).triggerEventHandler('click', eventObj);
    this.fixture.detectChanges();
  }

  installEmptyData(): void {
    this.store.useEmptyData();
    this.component.ngOnInit();
    this.fixture.detectChanges();
  }

  installData(): void {
    this.store.useNotEmptyData();
    this.component.ngOnInit();
    this.fixture.detectChanges();
  }
}
