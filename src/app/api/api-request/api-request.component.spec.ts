import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { Any } from 'src/app/share/share.model';
import { STORE_DATA_MOCK } from 'src/__test__';
import { ApiItem } from '../api.model';
import { ApiModule } from '../api.module';
import { ApiRequestComponent } from './api-request.component';

class StoreServiceStub {
  getApiItem(): ApiItem {
    return STORE_DATA_MOCK.apiItems[0];
  }

  updateUrl(): void {}

  getIndexFromUrl(): void {}
}

describe('ApiRequestComponent', () => {
  let component: ApiRequestComponent;
  let fixture: ComponentFixture<ApiRequestComponent>;
  let dialogService: DialogService;
  let store: StoreService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [BrowserAnimationsModule, ApiModule],
        declarations: [ApiRequestComponent],
        providers: [
          DialogService,
          {
            provide: StoreService,
            useClass: StoreServiceStub,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
    store = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check init state', () => {
    expect(component.apiItem).toBeUndefined('init undefined');
    expect(component.apiId).toBeUndefined('init undefined');
  });

  it('should show api request history', () => {
    let history: HTMLElement = fixture.nativeElement.querySelector(
      'app-api-request-history'
    );

    expect(history).toBeTruthy();

    component.showHistory = false;
    fixture.detectChanges();

    history = fixture.nativeElement.querySelector('app-api-request-history');

    expect(history).toBeNull();
  });

  it('should open try it out modal', () => {
    spyOn(dialogService, 'openRequestDialog');

    component.apiItem = {} as ApiItem;

    const btnDe = fixture.debugElement.query(By.css('button'));
    btnDe.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    expect(dialogService.openRequestDialog).toHaveBeenCalledWith({} as ApiItem);
  });

  it('should get apiItem from store if no #apiItem input', () => {
    spyOn(dialogService, 'openRequestDialog');

    component.apiItem = undefined as Any;

    const btnDe = fixture.debugElement.query(By.css('button'));
    btnDe.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    expect(dialogService.openRequestDialog).toHaveBeenCalledWith(
      STORE_DATA_MOCK.apiItems[0]
    );
  });
});
