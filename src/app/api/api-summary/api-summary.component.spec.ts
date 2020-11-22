import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Renderer2 } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPositionService, StoreService } from 'src/app/share/service';
import { Page, StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiSummaryComponent } from './api-summary.component';

describe('ApiSummaryComponent', () => {
  let page: Page<ApiSummaryComponent>;
  let component: ApiSummaryComponent;

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
    const btn = page.query('.triggle-button');
    btn.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();

    tick(0);

    const menu = document.querySelector('.api-summary-panel');

    expect(menu).toBeTruthy();

    flush();
  }));

  it('should group api by method', () => {
    component.groupByMethod();
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
});
