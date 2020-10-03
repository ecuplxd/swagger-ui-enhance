import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { StoreService } from '../share/service';
import { Any, StoreData } from '../share/share.model';
import { ProjectComponent } from './project.component';

class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of({
      projects: [],
      project: {
        namespaces: [],
      },
      index: {},
    } as Any);
  }

  updateData(): void {}
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
