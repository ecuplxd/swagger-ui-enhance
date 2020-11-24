import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { Page, StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiSearchComponent } from './api-search.component';

describe('ApiSearchComponent', () => {
  let page: Page<ApiSearchComponent>;
  let component: ApiSearchComponent;

  const search = (value: string = '/pet/') => {
    const input = page.query<HTMLInputElement>('.search-input');
    input.value = value;
    input.dispatchEvent(new Event('input'));
    page.detectChanges();

    tick(300);

    page.detectChanges();
  };

  const press = (key: string, eventName = 'keyup') => {
    window.dispatchEvent(
      new KeyboardEvent(eventName, {
        key,
      })
    );
    page.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ApiModule],
      declarations: [ApiSearchComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        ScrollInoViewService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(ApiSearchComponent, false);
    component = page.component;
    component.namespaces = page.store.getCurPorject().namespaces;
    page.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should active input by press /', () => {
    press('/');

    const input = page.query('.search-input');

    expect(input === document.activeElement).toBe(true);
  });

  it('should do nothing if not matched keycode', () => {
    press('P');
  });

  it('should cancel search by press esc', fakeAsync(() => {
    press('Escape');

    tick(500);

    const input = page.query('.search-input');

    expect(input === document.activeElement).toBe(false);

    flush();
  }));

  it('should focus input do nothing if no #keywords and no matched', () => {
    spyOn(component, 'showSearchResult').and.callThrough();

    const input = page.query('.search-input');
    input.dispatchEvent(new Event('focus'));
    page.detectChanges();

    expect(component.showSearchResult).not.toHaveBeenCalled();
  });

  it('should handle input blur', fakeAsync(() => {
    spyOn(component, 'handleBlur').and.callThrough();

    const input = page.query('.search-input');
    input.dispatchEvent(new Event('blur'));
    page.detectChanges();

    tick(500);

    expect(component.handleBlur).toHaveBeenCalled();

    flush();
  }));

  it('should not search api if input no value', fakeAsync(() => {
    spyOn(component, 'hideSearchResult').and.callThrough();

    search('');

    expect(component.hideSearchResult).toHaveBeenCalled();

    flush();
  }));

  it('should search api', fakeAsync(() => {
    search();

    const result = document.querySelector('.api-search-panel');

    expect(result).toBeTruthy();

    flush();
  }));

  it('should focus show reshow result if have matched', fakeAsync(() => {
    search();
    component.hideSearchResult();

    const input = page.query<HTMLInputElement>('.search-input');
    input.dispatchEvent(new Event('focus'));
    page.detectChanges();

    const result = document.querySelector('.api-search-panel');
    expect(result).toBeTruthy();

    flush();
  }));

  it('should active search result by ↑/↓', fakeAsync(() => {
    search();

    expect(component.activedSearchIndex).toEqual(0, 'before select');

    press('ArrowUp', 'keydown');

    expect(component.activedSearchIndex).toEqual(
      component.matchedCount - 1,
      'after press ↑'
    );

    press('ArrowDown', 'keydown');

    expect(component.activedSearchIndex).toEqual(0, 'after press ↓');

    press('ArrowDown', 'keydown');

    expect(component.activedSearchIndex).toEqual(1, 'after press ↓');

    press('ArrowDown', 'keydown');

    expect(component.activedSearchIndex).toEqual(2, 'after press ↓');

    press('ArrowUp', 'keydown');

    expect(component.activedSearchIndex).toEqual(1, 'after press ↑');

    press('P', 'keydown');

    expect(component.activedSearchIndex).toEqual(1, 'stil 1, after press P');

    flush();
  }));

  it('should select result item by press Enter', fakeAsync(() => {
    spyOn(component, 'selectActivedItem').and.callThrough();
    search();
    press('Enter');

    expect(component.selectActivedItem).toHaveBeenCalled();

    flush();
  }));

  it('should select result item by press ArrowRight', fakeAsync(() => {
    spyOn(component, 'selectActivedItem').and.callThrough();
    search();
    press('ArrowRight');

    expect(component.selectActivedItem).toHaveBeenCalled();

    flush();
  }));

  it('should hide search result if no matched', fakeAsync(() => {
    spyOn(component, 'hideSearchResult');

    search();
    search('sdfasdfasdfa');

    expect(component.hideSearchResult).toHaveBeenCalled();

    flush();
  }));

  it('should #getMatched() get empty string if no #str', () => {
    expect(component.getMatched()).toEqual('');
  });

  it('should #selectActivedItem() not select api item if can not find matched', fakeAsync(() => {
    spyOn(component, 'handleSelect');
    search();
    component.MATCHED_EL_CLASS = 'test';
    component.selectActivedItem();

    expect(component.handleSelect).not.toHaveBeenCalled();
  }));

  it('should #selectActivedItem() not select api item if no matched', () => {
    spyOn(component, 'handleSelect');
    component.matchedCount = 0;
    component.selectActivedItem();

    expect(component.handleSelect).not.toHaveBeenCalled();
  });
});
