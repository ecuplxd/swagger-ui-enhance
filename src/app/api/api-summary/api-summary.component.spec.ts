import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSummaryComponent } from './api-summary.component';

describe('ApiSummaryComponent', () => {
  let component: ApiSummaryComponent;
  let fixture: ComponentFixture<ApiSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
