import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { click, StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiTocComponent } from './api-toc.component';

describe('ApiTocComponent', () => {
  let component: ApiTocComponent;
  let store: StoreServiceStub;
  let fixture: ComponentFixture<ApiTocComponent>;

  const installData = (): HTMLLIElement[] => {
    store.useNotEmptyData();
    component.ngOnInit();
    fixture.detectChanges();

    const lis: HTMLLIElement[] = fixture.nativeElement.querySelectorAll('li');

    return lis;
  };

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
    fixture = TestBed.createComponent(ApiTocComponent);
    store = TestBed.inject(StoreService) as StoreServiceStub;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('', 'init #title');
    expect(component.apiItems).toEqual([], 'init #apiItems');
    expect(component.activedIndex).toBeUndefined('init #activedIndex');

    installData();

    const titleEl: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.toc-title'
    );

    expect(titleEl.innerText).toEqual('pet');
  });

  it('should mark deprecated api', () => {
    const lis: HTMLLIElement[] = installData();

    expect(lis[0].className.includes('deprecated')).toBe(
      false,
      '0 not a deprecated api'
    );
    expect(lis[1].className.includes('deprecated')).toBe(
      false,
      '1 not a deprecated api'
    );
    expect(lis[3].className.includes('deprecated')).toBe(
      true,
      '3 is a deprecated api'
    );
  });

  it('should mark actived toc item', () => {
    const lis: HTMLLIElement[] = installData();

    expect(lis[0].className.includes('actived')).toBe(
      false,
      '0 not cur actived toc'
    );
    expect(lis[1].className.includes('actived')).toBe(
      true,
      '1 is cur actived toc'
    );
    expect(lis[3].className.includes('actived')).toBe(
      false,
      '3 not cur actived toc'
    );
  });

  it('should not change #activedIndex by click cur active toc', () => {
    let lis: HTMLLIElement[] = installData();

    expect(component.activedIndex).toEqual(1, 'before click');
    expect(lis[1].className.includes('actived')).toBe(
      true,
      'before click, 1 actived'
    );

    click(lis[1]);
    component.ngOnInit();
    fixture.detectChanges();

    lis = fixture.nativeElement.querySelectorAll('li');

    expect(component.activedIndex).toEqual(1, 'after click still 1');
    expect(lis[1].className.includes('actived')).toBe(
      true,
      'after click, still 1 actived'
    );
  });

  it('should change actived toc item by click', () => {
    let lis: HTMLLIElement[] = installData();

    expect(component.activedIndex).toEqual(1, 'before click');
    expect(lis[0].className.includes('actived')).toBe(
      false,
      'before click, 0 not actived'
    );
    expect(lis[1].className.includes('actived')).toBe(
      true,
      'before click, 1 actived'
    );

    click(lis[0]);
    component.ngOnInit();
    fixture.detectChanges();

    lis = fixture.nativeElement.querySelectorAll('li');

    expect(component.activedIndex).toEqual(0, 'after click');
    expect(lis[0].className.includes('actived')).toBe(
      true,
      'after click, 1 actived'
    );
    expect(lis[1].className.includes('actived')).toBe(
      false,
      'after click, 1 not actived'
    );
  });

  it('should sort tocs', () => {
    installData();
    spyOn(store, 'sortApiItems');

    const sortBtn = fixture.nativeElement.querySelector('button');
    click(sortBtn);

    expect(store.sortApiItems).toHaveBeenCalled();
  });

  // TODO：更好的 expect
  it('should sort re render toc list', () => {
    let lis: HTMLLIElement[] = installData();

    expect(lis[3].className.includes('get')).toBe(true, 'before sort');

    const sortBtn = fixture.nativeElement.querySelector('button');
    click(sortBtn);
    component.ngOnInit();
    fixture.detectChanges();

    lis = fixture.nativeElement.querySelectorAll('li');

    expect(lis[3].className.includes('get')).toBe(false, 'after sort');
    expect(lis[3].className.includes('put')).toBe(true, 'after sort');
  });
});
