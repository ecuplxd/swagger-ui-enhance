import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { click, StoreServiceStub } from 'src/__test__';
import { StoreService } from '../share/service';
import { ProjectComponent } from './project.component';
import { Project } from './project.model';
import { ProjectModule } from './project.module';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let store: StoreServiceStub;

  const installData = () => {
    store.useNotEmptyData();
    component.ngOnInit();
    fixture.detectChanges();

    openProjetMenu();
  };

  const openProjetMenu = () => {
    const projectDe: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-choose-project > button'
    );
    click(projectDe);
    fixture.detectChanges();

    // 等待下拉菜单位置就绪
    tick(500);
  };

  const selectPorject = (index: number) => {
    const items: NodeListOf<Element> = document.body.querySelectorAll(
      '.project-item'
    );

    const item = items[index] as HTMLDivElement;
    click(item);
    component.ngOnInit();
    fixture.detectChanges();
  };

  const removeProject = (index: number) => {
    const removeBtns = document.body.querySelectorAll('button.remove-project');
    const btn1 = removeBtns[index] as HTMLButtonElement;
    click(btn1);
    component.ngOnInit();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ProjectModule],
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
    store = TestBed.inject(StoreService) as StoreServiceStub;
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
    component.expand = true;
    fixture.detectChanges();

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
      namespaceIndex: 1,
      apiIndex: 0,
    });
  });

  it('should #handleProjectRemove() call correctly', () => {
    spyOn(store, 'removeProject');
    component.handleProjectRemove(0);

    expect(store.removeProject).toHaveBeenCalledWith(0);
  });

  it('should raise projectChanged event when click', fakeAsync(() => {
    installData();

    expect(component.project).toEqual(component.projects[0]);
    expect(component.selected).toBe(0, 'before select project');

    selectPorject(1);

    expect(component.selected).toBe(1, 'after select project');
    expect(component.project).toEqual(component.projects[1]);

    flush();
  }));

  it('should raise projectRemove event when click remove', fakeAsync(() => {
    installData();
    selectPorject(0);

    expect(component.projects.length).toBe(4, 'before remove');

    removeProject(1);

    expect(component.projects.length).toBe(3, 'remove 1 project');

    flush();
  }));

  it('should keep #project if remove none selected project', fakeAsync(() => {
    installData();
    selectPorject(0);

    expect(component.project).toEqual(component.projects[0]);
    expect(component.selected).toBe(0, 'before remove');

    openProjetMenu();
    removeProject(1);
    expect(component.project).toEqual(component.projects[0]);
    expect(component.selected).toBe(0, 'before remove');

    flush();
  }));

  it('should select first project if remove the selected project', fakeAsync(() => {
    installData();
    selectPorject(1);
    openProjetMenu();

    expect(component.selected).toBe(1);

    removeProject(1);

    expect(component.selected).toBe(0);

    flush();
  }));

  it('should no projects if remove all projects', fakeAsync(() => {
    installData();

    removeProject(0);

    expect(component.selected).toBe(0);
    expect(component.projects.length).toBe(0);

    flush();
  }));
});
