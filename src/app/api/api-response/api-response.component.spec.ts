import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResponseComponent } from './api-response.component';

describe('ApiResponseComponent', () => {
  let component: ApiResponseComponent;
  let fixture: ComponentFixture<ApiResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiResponseComponent ]
    })
    .compileComponents();
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
