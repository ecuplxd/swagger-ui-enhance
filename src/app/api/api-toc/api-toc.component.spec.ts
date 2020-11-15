import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { click, hasClass, Page, StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiTocComponent } from './api-toc.component';

describe('ApiTocComponent', () => {
  let component: ApiTocComponent;
  let page: Page<ApiTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiTocComponent],
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
    page = new Page(ApiTocComponent, false);
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('', 'init #title');
    expect(component.apiItems).toEqual([], 'init #apiItems');
    expect(component.activedIndex).toBeUndefined('init #activedIndex');

    page.installData();

    const titleText = page.getText<HTMLSpanElement>('.toc-title');

    expect(titleText).toEqual('pet');
  });

  it('should mark deprecated api', () => {
    page.installData();
    const lis = page.queryAll<HTMLLIElement>('li');

    expect(hasClass(lis[0], 'deprecated')).toBe(false, '0 not a deprecated api');
    expect(hasClass(lis[1], 'deprecated')).toBe(false, '1 not a deprecated api');
    expect(hasClass(lis[3], 'deprecated')).toBe(true, '3 is a deprecated api');
  });

  it('should mark actived toc item', () => {
    page.installData();
    const lis = page.queryAll<HTMLLIElement>('li');

    expect(hasClass(lis[0], 'actived')).toBe(false, '0 not cur actived toc');
    expect(hasClass(lis[1], 'actived')).toBe(true, '1 is cur actived toc');
    expect(hasClass(lis[3], 'actived')).toBe(false, '3 not cur actived toc');
  });

  it('should not change #activedIndex by click cur active toc', () => {
    page.installData();
    let lis = page.queryAll<HTMLLIElement>('li');

    expect(component.activedIndex).toEqual(1, 'before click');
    expect(hasClass(lis[1], 'actived')).toBe(true, 'before click, 1 actived');

    page.click(lis[1]).doNgOnInit().detectChanges();
    lis = page.queryAll<HTMLLIElement>('li');

    expect(component.activedIndex).toEqual(1, 'after click still 1');
    expect(hasClass(lis[1], 'actived')).toBe(true, 'after click, still 1 actived');
  });

  it('should change actived toc item by click', () => {
    page.installData();
    let lis = page.queryAll<HTMLLIElement>('li');

    expect(component.activedIndex).toEqual(1, 'before click');
    expect(hasClass(lis[0], 'actived')).toBe(false, 'before click, 0 not actived');
    expect(hasClass(lis[1], 'actived')).toBe(true, 'before click, 1 actived');

    page.click(lis[0]).doNgOnInit().detectChanges();
    lis = page.queryAll<HTMLLIElement>('li');

    expect(component.activedIndex).toEqual(0, 'after click');
    expect(hasClass(lis[0], 'actived')).toBe(true, 'after click, 1 actived');
    expect(hasClass(lis[1], 'actived')).toBe(false, 'after click, 1 not actived');
  });

  it('should sort tocs', () => {
    page.installData();
    spyOn(page.store, 'sortApiItems');

    const sortBtn = page.query<HTMLButtonElement>('button');
    click(sortBtn);

    expect(page.store.sortApiItems).toHaveBeenCalled();
  });

  // TODO：更好的 expect
  it('should sort re render toc list', () => {
    page.installData();
    let lis = page.queryAll<HTMLLIElement>('li');

    expect(hasClass(lis[3], 'get')).toBe(true, 'before sort');

    const sortBtn = page.query<HTMLButtonElement>('button');
    page.click(sortBtn).doNgOnInit().detectChanges();

    lis = page.queryAll<HTMLLIElement>('li');

    expect(hasClass(lis[3], 'get')).toBe(false, 'after sort');
    expect(hasClass(lis[3], 'put')).toBe(true, 'after sort');
  });
});
