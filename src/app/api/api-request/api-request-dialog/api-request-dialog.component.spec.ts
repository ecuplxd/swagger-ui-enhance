import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  HistoryService,
  ProxyService,
  StoreService,
  TypeService,
} from 'src/app/share/service';
import { ApiMethodComponent } from '../../api-method/api-method.component';
import { ApiRequestDialogComponent } from './api-request-dialog.component';

class TypeServiceStub {
  getType(): void {}

  getExports(): void {}

  mock(): void {}
}

class StoreServiceStub {
  getCurProjectId(): void {}

  getCurPorject(): {} {
    return {};
  }
}

class ProxyServiceStub {}

class HistoryServiceStub {
  add(): void {}
}

describe('ApiRequestDialogComponent', () => {
  let component: ApiRequestDialogComponent;
  let fixture: ComponentFixture<ApiRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiRequestDialogComponent, ApiMethodComponent],
      providers: [
        {
          provide: TypeService,
          useClass: TypeServiceStub,
        },
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        {
          provide: ProxyService,
          useClass: ProxyServiceStub,
        },
        {
          provide: HistoryService,
          useClass: HistoryServiceStub,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            apiItem: {
              parameters: [],
              responses: {},
              __info: {
                url: '11111',
              },
            },
            editorSize: {},
            history: {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
