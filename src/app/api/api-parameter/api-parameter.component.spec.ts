import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdService } from 'src/app/share/service';
import { ApiParameterComponent } from './api-parameter.component';

class IdServiceStub {
  genID(): void {}
}

describe('ApiParameterComponent', () => {
  let component: ApiParameterComponent;
  let fixture: ComponentFixture<ApiParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiParameterComponent],
      providers: [
        {
          provide: IdService,
          useClass: IdServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
