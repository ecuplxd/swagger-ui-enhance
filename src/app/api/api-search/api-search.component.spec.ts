import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { ApiModule } from '../api.module';
import { ApiSearchComponent } from './api-search.component';

class StoreServiceStub {
  updateData(): void {}

  getCurNamespaces(): Any[] {
    return [];
  }
}

class ScrollInoViewServiceStub {
  to(): void {}
}

describe('ApiSearchComponent', () => {
  let component: ApiSearchComponent;
  let fixture: ComponentFixture<ApiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiSearchComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        {
          provide: ScrollInoViewService,
          useClass: ScrollInoViewServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
