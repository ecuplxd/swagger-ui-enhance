import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequestDialogComponent } from './api-request-dialog.component';

describe('ApiRequestDialogComponent', () => {
  let component: ApiRequestDialogComponent;
  let fixture: ComponentFixture<ApiRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
