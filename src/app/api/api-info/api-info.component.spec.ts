import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiInfo } from '../api.model';
import { ApiModule } from '../api.module';
import { ApiInfoComponent } from './api-info.component';

describe('ApiInfoComponent', () => {
  let component: ApiInfoComponent;
  let fixture: ComponentFixture<ApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiInfoComponent);
    component = fixture.componentInstance;
    component.api = {} as ApiInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
