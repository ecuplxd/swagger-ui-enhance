import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreServiceStub } from 'src/__test__';
import { StoreService } from '../share/service';
import { ProjectComponent } from './project.component';
import { Project } from './project.model';
import { ProjectModule } from './project.module';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let store: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ProjectModule],
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
    store = TestBed.inject(StoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.projects).toEqual([], 'init #projects');
    expect(component.project).toEqual({} as Project, 'init #project');
    expect(component.selected).toBeUndefined('init #selected');

    fixture.detectChanges();
  });

  it('should hvae choose project child', () => {
    const el = fixture.nativeElement.querySelector('app-choose-project');

    expect(el).toBeTruthy('app-choose-project');
  });

  it('should hvae app-project-info child', () => {
    const el = fixture.nativeElement.querySelector('app-project-info');

    expect(el).toBeTruthy('app-project-info');
  });

  it('should hvae app-import-project child', () => {
    const el = fixture.nativeElement.querySelector('app-import-project');

    expect(el).toBeTruthy('app-import-project');
  });

  it('should hvae app-project-namespaces child', () => {
    const el = fixture.nativeElement.querySelector('app-project-namespaces');

    expect(el).toBeTruthy('app-project-namespaces');
  });

  it('should #handleProjectChange() call correctly', () => {
    spyOn(store, 'updateData');
    component.handleProjectChange(0);

    expect(store.updateData).toHaveBeenCalledWith({
      projectIndex: 0,
      namespaceIndex: 0,
      apiIndex: 0,
    });
  });

  it('should #handleProjectRemove() call correctly', () => {
    spyOn(store, 'removeProject');
    component.handleProjectRemove(0);

    expect(store.removeProject).toHaveBeenCalledWith(0);
  });
});
