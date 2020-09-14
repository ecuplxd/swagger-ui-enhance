import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadRightComponent } from './head-right.component';

describe('HeadRightComponent', () => {
  let component: HeadRightComponent;
  let fixture: ComponentFixture<HeadRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadRightComponent ]
    })
    .compileComponents();
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
