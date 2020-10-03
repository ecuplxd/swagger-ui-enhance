import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { Any, StoreData } from 'src/app/share/share.model';
import { ApiTocComponent } from './api-toc.component';

class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of({
      namespace: {},
      index: {
        apiIndex: 0,
      },
      project: {
        namespaceIndex: 0,
      },
    } as Any);
  }

  sortApiItems(): void {}

  updateData(): void {}
}

class ScrollInoViewServiceStub {
  to(): void {}
}

describe('ApiTocComponent', () => {
  let component: ApiTocComponent;
  let fixture: ComponentFixture<ApiTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiTocComponent],
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
    fixture = TestBed.createComponent(ApiTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
