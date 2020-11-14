import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ProjectModule],
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
});
