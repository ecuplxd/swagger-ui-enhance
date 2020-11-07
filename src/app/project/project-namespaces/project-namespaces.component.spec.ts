import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { Any, StoreData } from 'src/app/share/share.model';
import { ProjectModule } from '../project.module';
import { ProjectNamespacesComponent } from './project-namespaces.component';

class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of({
      index: {
        namespaceIndex: 0,
      },
    } as Any);
  }

  updateData(): void {}
}

class ScrollInoViewServiceStub {
  to(): void {}
}

describe('ProjectNamespacesComponent', () => {
  let component: ProjectNamespacesComponent;
  let fixture: ComponentFixture<ProjectNamespacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ProjectModule],
      declarations: [ProjectNamespacesComponent],
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
    fixture = TestBed.createComponent(ProjectNamespacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
