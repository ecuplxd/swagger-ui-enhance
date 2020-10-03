import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { ApiItem } from '../api.model';

import { ApiRequestComponent } from './api-request.component';

class DialogServiceStub {
  openRequestDialog(): void {}
}

class StoreServiceStub {
  getApiItem(): ApiItem {
    return {} as ApiItem;
  }
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
        declarations: [ApiRequestComponent],
        providers: [
          {
            provide: DialogService,
            useClass: DialogServiceStub,
          },
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
});
