import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { HistoryService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { RequestHistory } from 'src/app/share/service/history/history.model';
import { ApiRequestHistoryComponent } from './api-request-history.component';

class HistoryServiceStub {
  get(): RequestHistory[] {
    return [];
  }
}

class DialogServiceStub {
  openRequestDialog(): void {}
}

describe('ApiRequestHistoryComponent', () => {
  let component: ApiRequestHistoryComponent;
  let fixture: ComponentFixture<ApiRequestHistoryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [MatMenuModule],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
