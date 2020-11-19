import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from 'src/app/share';
import { IdService, StoreService, TypeService } from 'src/app/share/service';
import { hasClass, Page, StoreServiceStub } from 'src/__test__';
import { ApiParameters } from '../api.model';
import { ApiTypeComponent } from './api-type.component';

@Component({selector: 'app-api-type-hover', template: ''})
class ApiTypeHoverStubComponent {
  @Output() closeMenu = new EventEmitter<void>();
}

describe('ApiTypeComponent', () => {
  let component: ApiTypeComponent;
  let page: Page<ApiTypeComponent>;
  let typeService: TypeService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [ApiTypeComponent, ApiTypeHoverStubComponent],
        imports: [BrowserAnimationsModule, ShareModule],
        providers: [
          TypeService,
          IdService,
          {
            provide: StoreService,
            useClass: StoreServiceStub,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    page = new Page(ApiTypeComponent, false);
    component = page.component;
    typeService = TestBed.inject(TypeService);
    component.parameter = {} as ApiParameters;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.type).toEqual('', 'init #type');
    expect(component.refType).toBe(false, 'init #refType');
    expect(component.enumType).toBe(false, 'init #enumType');
    expect(component.openOnHover).toBe(true, 'init #openOnHover');
    expect(component.code).toEqual('', 'init #code');
    expect(component.displayText).toEqual('', 'init #displayText');
  });

  it('should gen a id for type copy', () => {
    page.detectChanges();

    const typeSpan = page.query('.type-container');

    expect(hasClass(typeSpan, component.parameterID)).toBe(true);
    expect(component.parameterID).not.toBeUndefined('gen a random id for type copy');
  });

  it('should can copy type if have #displayText ', () => {
    component.parameter = page.getApiItem(0).parameters[0];
    page.detectChanges();

    const copyEl = page.query('app-copy');

    expect(copyEl).toBeTruthy();
  });

  it('should can copy type if have #refType ', () => {
    component.parameter = {} as ApiParameters;
    page.doNgOnInit().detectChanges();

    expect(component.refType).toBe(false, '{} not refType');
    expect(page.query('app-copy')).toBeFalsy('{} not refType, can not copy');

    page = new Page(ApiTypeComponent, false);
    component = page.component;
    component.parameter = page.getApiItem(0).parameters[0];
    page.doNgOnInit().detectChanges();

    expect(component.refType).toBe(true, 'Pet is a refType');
    expect(page.query('app-copy')).toBeTruthy('refType can copy');
  });

  it('should render refType by a', () => {
    component.parameter = page.getApiItem(0).parameters[0];
    page.doNgOnInit().detectChanges();

    expect(hasClass(page.query('a'), 'ref-type-name')).toBeTruthy();
  });

  it('should #refType can hover show detail popup', () => {
    component.parameter = page.getApiItem(0).parameters[0];
    page.doNgOnInit().detectChanges();

    const hoverEl = page.query('app-hover-menu > div');
    hoverEl.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();

    const apiHoverEl = document.querySelector('app-api-type-hover');

    expect(hoverEl).toBeTruthy();
    expect(apiHoverEl).toBeTruthy();

    component.parameter = {} as ApiParameters;
    page.doNgOnInit().detectChanges();

    expect(page.query('app-hover-menu')).toBeFalsy();
  });

  it('should #refType only get type by hover and no #code', () => {
    component.parameter = page.getApiItem(0).parameters[0];
    page.doNgOnInit().detectChanges();

    expect(component.code).toEqual('', 'no code string');

    const hoverEl = page.query('app-hover-menu > div');
    hoverEl.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();

    expect(component.code.length).not.toEqual(0, 'code string not empty');
  });

  it('should #lazyGetType() do nothing if #refType already have #code', () => {
    /* component.parameter = page.getApiItem(0).parameters[0];
    page.detectChanges(true);

    const hoverEl = page.query('app-hover-menu > div');
    hoverEl.dispatchEvent(new Event('mouseenter'));
    page.detectChanges();

    const hoverDe = page.queryDe('app-hover-menu');

    const hoverMenu: HoverMenuComponent = hoverDe.injector.get(HoverMenuComponent);
    hoverMenu.close();
    hoverMenu.open = false;
    hoverMenu.timedOutCloser = 0;
    page.detectChanges(); */

    spyOn(typeService, 'getExports');

    component.refType = true;
    component.code = 'code';
    component.lazyGetType();

    expect(typeService.getExports).not.toHaveBeenCalled();
  });

  it('should handle parse type #code error', () => {
    component.refType = true;
    component.code = '';
    component.lazyGetType();

    expect(component.code).toEqual('// 解析失败\n');
  });

  it('should #enumType use pre el', () => {
    component.parameter = page.getApiItem(4).parameters[0];
    page.doNgOnInit().detectChanges();

    expect(component.enumType).toBe(true);
    expect(component.refType).toBe(false);
    expect(page.getText('.enum-type')).toEqual(component.displayText);
    expect(page.query('.type-display')).toBeFalsy();
  });

  it('should render not enumType by span', () => {
    component.parameter = page.getApiItem(0).parameters[0];
    page.doNgOnInit().detectChanges();

    expect(page.query('.enum-type')).toBeFalsy();
    expect(page.getText('.type-display')).toEqual('body:');
  });

  it('should handle no #type', () => {
    component.parameter = {
      display: 'display',
    } as ApiParameters;
    component.type = '';

    expect(component.displayText).toEqual('display');
  });
});
