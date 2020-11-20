import { EmptyExpr, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page } from 'src/__test__';
import { ShareModule } from '../../share.module';
import { HoverMenuComponent } from './hover-menu.component';

@Component({
  template: `
    <span class="outer">outer</span>
    <app-hover-menu
      menuClass="test-test-test"
      [fixed]="fixed"
      [closeOnContentClick]="closeOnContentClick"
      [position]="position"
      (opened)="handleOpened($event)"
      #menu
    >
      <span trigger class="trigger-target">Test</span>

      <div class="trigger-outlet" menuContent>
        <span>Show Me</span>

        <button class="close-btn" (click)="closeMenu()">关闭</button>
      </div>
    </app-hover-menu>
  `,
})
class TestHostComponent implements OnInit {
  @ViewChild('menu') menu!: HoverMenuComponent;

  fixed = false;

  closeOnContentClick = false;

  position = 'bottom';

  ngOnInit(): void {}

  handleOpened(): void {}

  closeMenu(): void {
    this.menu.close();
  }
}

describe('HoverMenuComponent', () => {
  let page: Page<TestHostComponent>;
  let component: TestHostComponent;

  const openMenu = () => {
    const el = page.query<HTMLSpanElement>('.trigger-target');
    const parent = el.parentNode as HTMLDivElement;
    parent.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();
  };

  const closeMenu = () => {
    const el = page.query<HTMLSpanElement>('.outer');
    el.dispatchEvent(
      new Event('mouseenter', {
        bubbles: true,
        composed: true,
      })
    );
    page.detectChanges();
  };

  const closeMenu2 = () => {
    component.menu.closeMenu(component.menu.menuTrigger);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ShareModule],
      declarations: [TestHostComponent, HoverMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestHostComponent);
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open menu by hover trigger el', () => {
    openMenu();

    expect(component.menu.open).toBe(true);
  });

  it('should set open menu overlay class', () => {
    openMenu();

    expect(document.querySelector('.test-test-test')).toBeTruthy();
  });

  it('should do nothing if menu already opened', () => {
    spyOn(component, 'handleOpened');

    openMenu();
    openMenu();

    expect(component.handleOpened).toHaveBeenCalledTimes(1);
  });

  it('should close menu', () => {
    openMenu();

    const de = page.queryDe('.close-btn');
    page.clickDe(de);
    page.detectChanges();

    expect(component.menu.open).toBe(false);
  });

  it('should not close menu if set fixed', fakeAsync(() => {
    component.fixed = true;
    openMenu();
    closeMenu2();

    expect(component.menu.open).toBe(true, 'still opend');

    component.fixed = false;
    openMenu();
    closeMenu2();
    page.detectChanges();

    tick(100);

    expect(component.menu.open).toBe(false, 'closed afer 0.05s');

    flush();
  }));

  it('should not close menu in short time mouseleave', fakeAsync(() => {
    openMenu();
    closeMenu2();
    tick(40);
    openMenu();

    expect(component.menu.open).toBe(true);

    flush();
  }));

  xit('should close menu by mouseleave', () => {
    openMenu();
    closeMenu();

    const el = document.querySelector('.trigger-outlet') as HTMLDivElement;

    expect(el).toBeFalsy();
  });

  xit('should not close menu by click content', () => {
    openMenu();

    const de = page.queryDe('.trigger-outlet');
    page.clickDe(de);

    const el = document.querySelector('.trigger-outlet') as HTMLDivElement;

    expect(el).toBeTruthy();
  });

  xit('should close menu by click content', () => {
    component.closeOnContentClick = true;

    openMenu();

    const de = page.queryDe('.trigger-outlet');
    page.clickDe(de);

    const el = document.querySelector('.trigger-outlet') as HTMLDivElement;

    expect(el).toBeFalsy();
  });
});
