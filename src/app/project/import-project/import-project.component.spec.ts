import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';
import { ProjectModule } from '../project.module';
import { ImportProjectComponent } from './import-project.component';

class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of({
      project: {},
    } as StoreData);
  }
}

describe('ImportProjectComponent', () => {
  let component: ImportProjectComponent;
  let fixture: ComponentFixture<ImportProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ProjectModule],
      declarations: [ImportProjectComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
