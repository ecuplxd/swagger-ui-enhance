import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { click, StoreServiceStub } from 'src/__test__';
import { ProjectModule } from '../project.module';
import { ProjectNamespacesComponent } from './project-namespaces.component';

class ScrollInoViewServiceStub {
  to(): void {}
}

describe('ProjectNamespacesComponent', () => {
  let component: ProjectNamespacesComponent;
  let store: StoreServiceStub;
  let fixture: ComponentFixture<ProjectNamespacesComponent>;

  const installData = () => {
    store.useNotEmptyData();
    component.namespaces = store.getCurNamespaces();
    fixture.detectChanges();
  };

  const openMenu = (index: number) => {
    const btns = document.querySelectorAll('.triggle-button');
    btns[index].dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick();

    const menu = document.querySelector('.menu1-trigger');
    menu?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ProjectModule],
      declarations: [ProjectNamespacesComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        {
          provide: ScrollInoViewService,
          useClass: ScrollInoViewServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNamespacesComponent);
    store = TestBed.inject(StoreService) as StoreServiceStub;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.namespaces).toEqual([], 'init #namespaces');
    expect(component.keyword).toBe('', 'init #keyword');
    expect(component.activedIndex).toBeUndefined('init #activedIndex');
  });

  it('should no namespace-item if #namespaces empty', () => {
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.namespace-item');

    expect(el).toBeFalsy('empty #namespaces');
  });

  it('should render namespace list', () => {
    installData();

    const items: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.namespace-item'
    );

    expect(items.length).toEqual(component.namespaces.length);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const nameEl = item.querySelector('.namespace-name') as HTMLDivElement;
      const descriptionEl = item.querySelector(
        '.namespace-description'
      ) as HTMLDivElement;

      expect(nameEl.innerText.trim()).toEqual(component.namespaces[i].name);
      expect(descriptionEl.innerText.trim()).toEqual(
        component.namespaces[i].description
      );
    }
  });

  it('should change namespace by click', () => {
    installData();

    const items: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.namespace-item'
    );

    expect(component.activedIndex).toBe(0, 'before select');
    expect(items[0].className.includes('selected')).toBe(true, '0 selected');
    expect(items[1].className.includes('selected')).toBe(
      false,
      '1 not selected'
    );

    click(items[1]);
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.activedIndex).toBe(1);
    expect(items[0].className.includes('selected')).toBe(
      false,
      '0 not selected'
    );
    expect(items[1].className.includes('selected')).toBe(true, '1 selected');
  });

  it('should mark selected namespace', () => {
    installData();

    const items: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.namespace-item'
    );

    click(items[0]);
    component.ngOnInit();
    fixture.detectChanges();

    expect(items[0].className.includes('selected')).toBe(true, '0 selected');
    expect(items[1].className.includes('selected')).toBe(
      false,
      '1 not selected'
    );
    expect(items[2].className.includes('selected')).toBe(
      false,
      '2 not selected'
    );
  });

  it('should show api summary by hover right dot', fakeAsync(() => {
    installData();
    openMenu(0);

    const menu = document.querySelector('.api-summary-panel');

    expect(menu).toBeTruthy();

    flush();
  }));

  it('should filter namespace', fakeAsync(() => {
    installData();

    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector(
      'input'
    );
    inputEl.value = 'pet';
    component.keyword = 'pet';
    inputEl.dispatchEvent(new Event('input'));

    tick(600);

    component.namespaces = store.getCurNamespaces();

    fixture.detectChanges();

    const items: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.namespace-item'
    );

    expect(items[0].className.includes('hidden')).toBe(false, '0 matched');
    expect(items[1].className.includes('hidden')).toBe(true, '1 not matched');
    expect(items[2].className.includes('hidden')).toBe(true, '2 not matched');

    flush();
  }));

  it('should not show api summary if no apiItems', () => {
    installData();

    store.removeApiItems(0);

    fixture.detectChanges();

    const items: HTMLElement[] = fixture.nativeElement.querySelectorAll('.namespace-item');
    const firstItem = items[0];
    const secondItem = items[1];
    const apiSummaryEl1 = firstItem.querySelector('app-api-summary');
    const apiSummaryEl2 = secondItem.querySelector('app-api-summary');

    expect(apiSummaryEl1).toBeFalsy();
    expect(apiSummaryEl2).toBeTruthy();
  });
});
