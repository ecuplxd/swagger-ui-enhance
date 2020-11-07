import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '../../layout.module';
import { HeadRightComponent } from './head-right.component';

describe('HeadRightComponent', () => {
  let component: HeadRightComponent;
  let fixture: ComponentFixture<HeadRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [LayoutModule],
      declarations: [HeadRightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
