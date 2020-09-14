import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTocComponent } from './api-toc.component';

describe('ApiTocComponent', () => {
  let component: ApiTocComponent;
  let fixture: ComponentFixture<ApiTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiTocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
