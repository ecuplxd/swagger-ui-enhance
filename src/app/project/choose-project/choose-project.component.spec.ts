import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProjectComponent } from './choose-project.component';

describe('ChooseProjectComponent', () => {
  let component: ChooseProjectComponent;
  let fixture: ComponentFixture<ChooseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseProjectComponent ]
    })
    .compileComponents();
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
