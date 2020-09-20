import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequestHistoryComponent } from './api-request-history.component';

describe('ApiRequestHistoryComponent', () => {
  let component: ApiRequestHistoryComponent;
  let fixture: ComponentFixture<ApiRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRequestHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
