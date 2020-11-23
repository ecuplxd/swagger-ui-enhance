import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Renderer2 } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPositionService, StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { Page, StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiSummaryComponent } from './api-summary.component';

describe('ApiSummaryComponent', () => {
  let page: Page<ApiSummaryComponent>;
  let component: ApiSummaryComponent;

  const installData = () => {
    component.showSubMenu = true;
    component.namespaceIndex = 2;
    component.apiItems = page.store.getCurNamespaces()[2].apiItems;
    component.groupByMethod();
    page.detectChanges();
  };

  const openFirstMenu = (hoverMenu = true) => {
    const btn = page.query('.triggle-button');
    btn.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();
    tick();

    if (hoverMenu) {
      const menu1 = document.querySelector('.menu1-trigger');
      menu1?.dispatchEvent(new Event('mouseenter'));
      page.detectChanges();
      tick();
    }
  };

  const openSecondMenu = (hoverMenu = true) => {
    const methods = document.querySelectorAll('.method-group');
    methods[0].dispatchEvent(new Event('mouseenter'));
    page.detectChanges();
    tick();

    if (hoverMenu) {
      const apis = document.querySelectorAll('mat-nav-list');
      apis[0].dispatchEvent(new Event('mouseenter'));
      page.detectChanges();
      tick();
    }

    return methods;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ApiModule],
      declarations: [ApiSummaryComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        Renderer2,
        MenuPositionService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(ApiSummaryComponent, false);
    page.installData();
    component = page.component;
    component.namespaceIndex = 0;
    component.apiItems = page.store.getCurNamespaces()[0].apiItems;
    page.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hover icon show api summary', fakeAsync(() => {
    openFirstMenu();

    const menu = document.querySelector('.api-summary-panel');

    expect(menu).toBeTruthy();

    flush();
  }));

  it('should group api by method', () => {
    component.groupByMethod();

    expect(component.groups.size).not.toEqual(0);
  });

  it('should select api', () => {
    spyOn(page.store, 'updateData');
    component.selectApi(1);

    expect(page.store.updateData).toHaveBeenCalledWith({
      namespaceIndex: 0,
      apiIndex: 1,
    });
  });

  it('should set #opened=true when menu open', () => {
    component.opened = false;
    component.showSubMenu = true;
    component.handleMenuOpen();

    expect(component.opened).toBe(true);
  });

  it('should hanlde menuenter', () => {
    component.isMatMenu2Open = false;
    component.menuenter();

    expect(component.isMatMenuOpen).toBe(true, '1 menu open');
    expect(component.isMatMenu2Open).toBe(false);

    component.isMatMenu2Open = true;
    component.menuenter();

    expect(component.isMatMenuOpen).toBe(true);
    expect(component.isMatMenu2Open).toBe(false);
  });

  it('should handle menu2enter', () => {
    component.menu2enter();

    expect(component.isMatMenu2Open).toBe(true);
  });

  it('should show method popover -> api popover', fakeAsync(() => {
    installData();
    openFirstMenu();

    const methods = openSecondMenu();
    const panel = document.querySelector('.api-summary-panel');

    expect(methods).toBeTruthy('method popover show');
    expect(panel).toBeTruthy('api popover show');

    flush();
  }));

  it('should handle menu2 leave when menu2 is open', fakeAsync(() => {
    installData();
    openFirstMenu();
    openSecondMenu();

    expect(component.enteredButton).toBe(true, 'before leave menu');
    expect(component.isMatMenuOpen).toBe(true, 'before leave menu2');
    expect(component.isMatMenu2Open).toBe(true, 'before leave menu2');

    component.menu2Leave(
      component.menuTrigger,
      component.menuTrigger2,
      component.btn
    );

    page.detectChanges();

    tick(100);

    expect(component.enteredButton).toBe(false, 'after leave menu2');
    expect(component.isMatMenuOpen).toBe(false, 'after leave menu2');
    expect(component.isMatMenu2Open).toBe(false, 'after leave menu2');

    flush();
  }));

  it('should handle menu2 leave when menu2 is closed', fakeAsync(() => {
    installData();
    openFirstMenu();

    expect(component.enteredButton).toBe(true, 'before leave menu');
    expect(component.isMatMenuOpen).toBe(true, 'before leave menu2');
    expect(component.isMatMenu2Open).toBe(false, 'before leave menu2');

    component.menu2Leave(
      component.menuTrigger,
      component.menuTrigger2,
      component.btn
    );
    page.detectChanges();

    tick(100);

    expect(component.enteredButton).toBe(
      true,
      'menu2 is closed, so still open'
    );
    expect(component.isMatMenuOpen).toBe(
      true,
      'menu2 is closed, so still open'
    );
    expect(component.isMatMenu2Open).toBe(false, 'menu2 is closed');

    flush();
  }));

  it('should handle menu1 leave, #enteredButton=true', fakeAsync(() => {
    installData();
    openFirstMenu();

    expect(component.isMatMenuOpen).toBe(true, 'menu1 opend');
    expect(component.isMatMenu2Open).toBe(false, 'menu2 not opend');

    component.menuLeave(component.menuTrigger, component.btn);
    page.detectChanges();

    tick(80);

    expect(component.isMatMenuOpen).toBe(false, 'after levae menu1');

    flush();
  }));

  it('should handle menu1 leave, #enteredButton=false', fakeAsync(() => {
    installData();
    openFirstMenu();

    expect(component.isMatMenuOpen).toBe(true, 'menu1 opend');

    component.enteredButton = false;
    component.menuLeave(component.menuTrigger, component.btn);
    page.detectChanges();

    tick(80);

    expect(component.isMatMenuOpen).toBe(false, 'after levae menu1');

    flush();
  }));

  it('should handle btn leave', fakeAsync(() => {
    installData();
    openFirstMenu();

    expect(component.enteredButton).toBe(true, '#enteredButton');

    component.buttonLeave(component.menuTrigger, component.btn);
    page.detectChanges();

    tick(100);

    expect(component.enteredButton).toBe(
      false,
      'after btn leave, #enteredButton'
    );

    flush();
  }));

  it('should handle btn leave, #isMatMenuOpen=false', fakeAsync(() => {
    installData();
    openFirstMenu(false);

    spyOn(component, 'removeFocusElCdkClass');
    component.isMatMenuOpen = false;
    component.buttonLeave(component.menuTrigger, component.btn);
    page.detectChanges();

    tick(100);

    expect(component.removeFocusElCdkClass).toHaveBeenCalled();

    flush();
  }));

  it('should handle enter button', fakeAsync(() => {
    expect(component.isMatMenuOpen).toBe(false, 'before enter, #isMatMenuOpen');
    expect(component.prevButtonTrigger).toBeUndefined(
      'before enter, #prevButtonTrigger'
    );

    component.buttonEnter(component.menuTrigger);
    page.detectChanges();

    tick();

    expect(component.isMatMenuOpen).toBe(false, 'not enter menu');
    expect(component.enteredButton).toBe(true);
    expect(component.prevButtonTrigger).toEqual(component.menuTrigger);

    flush();
  }));

  it('should handle enter another button', fakeAsync(() => {
    component.prevButtonTrigger = {
      closeMenu: () => {},
    } as Any;
    component.buttonEnter(component.menuTrigger);
    page.detectChanges();

    tick();

    expect(component.isMatMenuOpen).toBe(false);
    expect(component.isMatMenu2Open).toBe(false);
    expect(component.prevButtonTrigger).toEqual(component.menuTrigger);

    flush();
  }));

  it('should handle enter button, #isMatMenuOpen=true', fakeAsync(() => {
    expect(component.isMatMenuOpen).toBe(false, 'before enter, #isMatMenuOpen');
    expect(component.prevButtonTrigger).toBeUndefined(
      'before enter, #prevButtonTrigger'
    );

    installData();
    openFirstMenu();

    expect(component.isMatMenuOpen).toBe(true, 'enter menu');

    component.buttonEnter(component.menuTrigger);
    page.detectChanges();

    tick();

    expect(component.enteredButton).toBe(true, 'reenter button');
    expect(component.prevButtonTrigger).toEqual(component.menuTrigger);

    flush();
  }));
});
