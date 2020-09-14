import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequestComponent } from './api-request.component';

describe('ApiRequestComponent', () => {
  let component: ApiRequestComponent;
  let fixture: ComponentFixture<ApiRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
