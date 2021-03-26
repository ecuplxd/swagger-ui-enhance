import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleElComponent } from './toggle-el.component';

describe('ToggleElComponent', () => {
  let component: ToggleElComponent;
  let fixture: ComponentFixture<ToggleElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleElComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
