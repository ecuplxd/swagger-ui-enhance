import { formatDate } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { RequestHistory } from 'src/app/share/service/history/history.model';
import { STORE_DATA_MOCK } from 'src/__test__';
import { ApiModule } from '../../api.module';
import { ApiRequestHistoryComponent } from './api-request-history.component';

const historyMock = (): RequestHistory => {
  return {
    url: '/pet',
    name: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US'),
    urlParams: [
      {
        path: '/pet',
      },
    ],
    editorValue: '// editorValue',
  };
};

class HistoryServiceStub {
  get(): RequestHistory[] {
    return [historyMock(), historyMock()];
  }
}

class DialogServiceStub {
  openRequestDialog(): void {}
}

describe('ApiRequestHistoryComponent', () => {
  let component: ApiRequestHistoryComponent;
  let fixture: ComponentFixture<ApiRequestHistoryComponent>;
  let dialogService: DialogService;
  let historyService: HistoryService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [BrowserAnimationsModule, ApiModule],
        declarations: [ApiRequestHistoryComponent],
        providers: [
          {
            provide: HistoryService,
            useClass: HistoryServiceStub,
          },
          {
            provide: DialogService,
            useClass: DialogServiceStub,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestHistoryComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
    historyService = TestBed.inject(HistoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.apiItem).toBeUndefined('init');
    expect(component.empty).toBe(true, 'init');
    expect(component.historys).toEqual([], 'init');
    expect(component).toBeTruthy();
  });

  it('should test button no-outlined class, #outlined', () => {
    let btn: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button.history'
    );

    expect(btn.className.includes('no-outlined')).toBe(
      false,
      'no no-outlined class'
    );

    component.outlined = false;
    fixture.detectChanges();

    btn = fixture.nativeElement.querySelector('button.history');

    expect(btn.className.includes('no-outlined')).toBe(
      true,
      'have no-outlined class'
    );
  });

  it('should show no request history tip, #empty=true', () => {
    const btnDe = fixture.debugElement.query(By.css('button.history'));
    btnDe.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    fixture.detectChanges();

    const div: HTMLDivElement | null = document.querySelector('.no-historys');

    expect(div).toBeTruthy();
    expect(component.historys).toEqual([]);
    expect(component.empty).toBe(true);
  });

  it('should show request history if not empty, #empty=false', () => {
    spyOn(historyService, 'get').and.callThrough();

    component.apiItem = STORE_DATA_MOCK.apiItems[0];

    const btnDe = fixture.debugElement.query(By.css('button.history'));
    btnDe.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    fixture.detectChanges();

    const div: HTMLDivElement | null = document.querySelector('.no-historys');
    const items = document.querySelectorAll('.history-item');

    expect(div).toBeNull();
    expect(component.historys.length).toBe(2);
    expect(component.empty).toBe(false);
    expect(items.length).toEqual(component.historys.length);
    expect(historyService.get).toHaveBeenCalledWith('/pet|post');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const el: HTMLSpanElement | null = item.querySelector('.title');

      expect(el?.innerText).toContain(component.historys[i].name);

      const el2: HTMLSpanElement | null = item.querySelector('.url');
      expect(el2?.innerText).toContain(component.historys[i].url);
    }
  });

  it('should request a history item', () => {
    component.apiItem = STORE_DATA_MOCK.apiItems[0];

    const btnDe = fixture.debugElement.query(By.css('button.history'));
    btnDe.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    fixture.detectChanges();

    // #fromRequest=false
    spyOn(dialogService, 'openRequestDialog');

    const items = document.querySelectorAll('.history-item');
    const div1 = items[0] as HTMLDivElement;
    div1.click();

    expect(dialogService.openRequestDialog).toHaveBeenCalledWith(
      component.apiItem,
      component.historys[0]
    );

    // #fromRequest=true

    spyOn(component.selectHistory, 'emit');

    component.fromRequest = true;
    const div2 = items[1] as HTMLDivElement;
    div2.click();

    expect(component.selectHistory.emit).toHaveBeenCalledWith(
      component.historys[1]
    );
  });
});
