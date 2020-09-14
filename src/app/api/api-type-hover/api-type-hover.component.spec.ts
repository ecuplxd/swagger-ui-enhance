import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTypeHoverComponent } from './api-type-hover.component';

describe('ApiTypeHoverComponent', () => {
  let component: ApiTypeHoverComponent;
  let fixture: ComponentFixture<ApiTypeHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiTypeHoverComponent ]
    })
    .compileComponents();
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
