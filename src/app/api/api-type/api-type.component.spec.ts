import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IdService, StoreService, TypeService } from 'src/app/share/service';
import { ApiParameters } from '../api.model';
import { ApiTypeComponent } from './api-type.component';

class TypeServiceStub {
  refType = false;

  getType(): string {
    return 'type';
  }

  getExports(): void {}
}

class IdServiceStub {
  genID(): void {}
}

class StoreServiceStub {
  getCurProjectId(): void {}
}

describe('ApiTypeComponent', () => {
  let component: ApiTypeComponent;
  let fixture: ComponentFixture<ApiTypeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [ApiTypeComponent],
        providers: [
          {
            provide: TypeService,
            useClass: TypeServiceStub,
          },
          {
            provide: IdService,
            useClass: IdServiceStub,
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
    fixture = TestBed.createComponent(ApiTypeComponent);
    component = fixture.componentInstance;
    component.parameter = {} as ApiParameters;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
