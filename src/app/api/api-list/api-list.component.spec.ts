import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable, of } from 'rxjs';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { Any, StoreData } from 'src/app/share/share.model';
import { ApiListComponent } from './api-list.component';

class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of({
      apiItems: [],
      expandeds: [],
      project: {
        namespaceIndex: 0,
      },
      index: {
        apiIndex: 0,
      },
    } as Any);
  }
}

class ScrollInoViewServiceStub {
  to(): void {}

  tick_then(): void {}
}

describe('ApiListComponent', () => {
  let component: ApiListComponent;
  let fixture: ComponentFixture<ApiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiListComponent],
      imports: [MatExpansionModule],
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
    fixture = TestBed.createComponent(ApiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
