import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTypeComponent } from './api-type.component';

describe('ApiTypeComponent', () => {
  let component: ApiTypeComponent;
  let fixture: ComponentFixture<ApiTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
