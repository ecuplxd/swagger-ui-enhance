import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPositionService, StoreService } from 'src/app/share/service';
import { ApiModule } from '../api.module';
import { ApiSummaryComponent } from './api-summary.component';

class StoreServiceStub {
  updateData(): void {}
}

describe('ApiSummaryComponent', () => {
  let component: ApiSummaryComponent;
  let fixture: ComponentFixture<ApiSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiSummaryComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        Renderer2,
        MenuPositionService,
      ],
    }).compileComponents();
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
