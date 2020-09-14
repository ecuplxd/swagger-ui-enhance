import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiParameterComponent } from './api-parameter.component';

describe('ApiParameterComponent', () => {
  let component: ApiParameterComponent;
  let fixture: ComponentFixture<ApiParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiParameterComponent ]
    })
    .compileComponents();
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
