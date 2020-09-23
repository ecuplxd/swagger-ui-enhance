import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchResultComponent } from './api-search-result.component';

describe('ApiSearchResultComponent', () => {
  let component: ApiSearchResultComponent;
  let fixture: ComponentFixture<ApiSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
