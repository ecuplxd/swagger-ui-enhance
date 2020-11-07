import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectModule } from '../project.module';
import { ChooseProjectComponent } from './choose-project.component';

describe('ChooseProjectComponent', () => {
  let component: ChooseProjectComponent;
  let fixture: ComponentFixture<ChooseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ProjectModule],
      declarations: [ChooseProjectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
