import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiModule } from '../api.module';
import { ApiResponseComponent } from './api-response.component';

describe('ApiResponseComponent', () => {
  let component: ApiResponseComponent;
  let fixture: ComponentFixture<ApiResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiResponseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
