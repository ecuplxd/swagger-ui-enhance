import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CopyService, IdService } from 'src/app/share/service';
import { ApiTypeHoverComponent } from './api-type-hover.component';

describe('ApiTypeHoverComponent', () => {
  let component: ApiTypeHoverComponent;
  let fixture: ComponentFixture<ApiTypeHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatSnackBarModule],
      declarations: [ApiTypeHoverComponent],
      providers: [IdService, CopyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTypeHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
