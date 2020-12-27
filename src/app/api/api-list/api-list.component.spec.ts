import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CopyService,
  ScrollInoViewService,
  StoreService,
} from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiListComponent } from './api-list.component';

describe('ApiListComponent', () => {
  let component: ApiListComponent;
  let fixture: ComponentFixture<ApiListComponent>;
  let store: StoreServiceStub;
  let nativeElement: Any;

  const reInit = () => {
    store.useNotEmptyData();
    component.ngOnInit();
    fixture.detectChanges();
  };

  const triggerSelect = (
    des: DebugElement[],
    index: number,
    start: number,
    end: number
  ) => {
    des[index].triggerEventHandler('mousedown', null);
    des[index].triggerEventHandler('click', null);
    fixture.detectChanges();

    tick(start);

    des[index].triggerEventHandler('mouseup', index);
    fixture.detectChanges();

    tick(end);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiListComponent],
      imports: [BrowserAnimationsModule, ApiModule],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        ScrollInoViewService,
        CopyService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiListComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    store = (TestBed.inject(StoreService) as unknown) as StoreServiceStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    store.useEmptyData();
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.activedIndex).toBe(1, 'set by store data');
  });

  it('should show no data tips', () => {
    const div: HTMLDivElement = nativeElement.querySelector('.no-data');
    const div2: HTMLDivElement = nativeElement.querySelector('.api-items');

    expect(div).toBeTruthy('show no data el');
    expect(div2).toBeNull('not show api items el');
  });

  it('should show api items if not empty', () => {
    reInit();

    const div: HTMLDivElement = nativeElement.querySelector('.no-data');
    const div2: HTMLDivElement = nativeElement.querySelector('.api-items');

    expect(div).toBeNull('not show no data el');
    expect(div2).toBeTruthy('show api items el');
  });

  it('should toggle all api items', () => {
    reInit();

    expect(component.expandeds[1]).toBe(true, '1 is expanded');
    expect(component.expandeds.filter(Boolean).length).toBe(
      1,
      'only 1 item expanded'
    );

    const btnDe = fixture.debugElement.query(By.css('.expand-all'));
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.expandeds.filter(Boolean).length).toBe(
      component.apiItems.length,
      'expanded items equal to expanded els'
    );
  });

  it('should close all api items', () => {
    reInit();

    const btnDe = fixture.debugElement.query(By.css('.close-all'));
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.expandeds.filter(Boolean).length).toBe(
      0,
      'no els expanded'
    );
  });

  it('should active api item by #activedIndex', () => {
    reInit();

    const els: HTMLElement[] = nativeElement.querySelectorAll(
      'mat-expansion-panel-header'
    );
    expect(els[0].className.includes('actived')).toBe(false, '0 not actived');
    expect(els[1].className.includes('actived')).toBe(true, '1 is actived');
    expect(els[2].className.includes('actived')).toBe(false, '2 not actived');
  });

  it('should mark deprecated api item', () => {
    reInit();

    const els: HTMLElement[] = nativeElement.querySelectorAll(
      'mat-expansion-panel'
    );

    expect(els[0].className.includes('deprecated')).toBe(
      false,
      '0 not deprecated'
    );
    expect(els[1].className.includes('deprecated')).toBe(
      false,
      '1 not deprecated'
    );
    expect(els[2].className.includes('deprecated')).toBe(
      false,
      '2 not deprecated'
    );
    expect(els[3].className.includes('deprecated')).toBe(true, '3 deprecated');
    expect(els[4].className.includes('deprecated')).toBe(
      false,
      '4 not deprecated'
    );
  });

  /* TODO: write in 1 it */
  it('should hold expanded state when select api item text, #expanded=false -> #expanded=false', fakeAsync(() => {
    reInit();

    const des = fixture.debugElement.queryAll(
      By.css('mat-expansion-panel-header')
    );

    const index = 0;

    expect(component.expandeds[index]).toBe(false, 'init not expanded');

    triggerSelect(des, index, 250, 250);
    fixture.whenStable().then(() => {
      expect(component.expandeds[index]).toBe(
        false,
        'select, before is not expanded, still not expanded'
      );
    });
  }));

  it('should hold expanded state when select api item text, #expanded=true -> #expanded=true', fakeAsync(() => {
    reInit();

    const des = fixture.debugElement.queryAll(
      By.css('mat-expansion-panel-header')
    );

    const index = 1;

    expect(component.expandeds[index]).toBe(true, 'init expanded');

    triggerSelect(des, index, 250, 250);
    fixture.whenStable().then(() => {
      expect(component.expandeds[index]).toBe(
        true,
        'select, before is expanded, still expanded'
      );
    });
  }));

  it('should expanded when not select api item text, #expanded=false -> #expanded=true', fakeAsync(() => {
    reInit();

    const des = fixture.debugElement.queryAll(
      By.css('mat-expansion-panel-header')
    );

    const index = 0;

    expect(component.expandeds[index]).toBe(false, 'init not expanded');

    triggerSelect(des, index, 100, 400);
    fixture.whenStable().then(() => {
      expect(component.expandeds[index]).toBe(
        true,
        'click, before is not expanded, now expanded'
      );
    });
  }));

  it('should toggle expanded when not select api item text, #expanded=true -> #expanded=false', fakeAsync(() => {
    reInit();

    const des = fixture.debugElement.queryAll(
      By.css('mat-expansion-panel-header')
    );

    const index = 1;

    expect(component.expandeds[index]).toBe(true, 'expanded');

    triggerSelect(des, index, 100, 400);
    fixture.whenStable().then(() => {
      expect(component.expandeds[index]).toBe(
        false,
        'click, before is expanded, now closed'
      );
    });
  }));

  it('should update api operationId in url', () => {
    spyOn(store, 'updateUrl').and.callThrough();
    component.updateUrl(1);

    expect(store.updateUrl).toHaveBeenCalledWith(1);
  });
});
