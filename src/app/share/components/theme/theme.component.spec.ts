import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../../service/theme/theme.service';
import { ThemeComponent } from './theme.component';

class ThemeServiceStub {
  useTheme(): void {}

  saveToLocal(): void {}
}

class MatDialogRefStub {
  close(): void {}
}

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ThemeComponent],
      providers: [
        {
          provide: ThemeService,
          useClass: ThemeServiceStub,
        },
        {
          provide: MatDialogRef,
          useClass: MatDialogRefStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
