import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { hasClass, Page } from 'src/__test__';
import { Project } from '../project.model';
import { ProjectInfoComponent } from './project-info.component';

describe('ProjectInfoComponent', () => {
  let page: Page<ProjectInfoComponent>;
  let component: ProjectInfoComponent;

  const installData = () => {
    component.project = {
      info: {
        description: 'description',
      },
      host: 'test',
      basePath: '/aaaa',
    } as Project;
    page.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(ProjectInfoComponent, true, false);
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.expanded).toBe(false, 'default hide project description');
  });

  it('should toggle project description', () => {
    installData();
    let div = page.query<HTMLDivElement>('.title');

    expect(component.expanded).toBe(false);
    expect(hasClass(div, 'text-ellipsis-2')).toBe(true, 'default ellipsis');

    const action = page.query<HTMLDivElement>('.description-action');
    page.click(action).detectChanges();
    div = page.query<HTMLDivElement>('.title');

    expect(component.expanded).toBe(true, 'show full description');
    expect(hasClass(div, 'text-ellipsis-2')).toBe(
      false,
      'show full description'
    );

    page.click(action).detectChanges();
    div = page.query<HTMLDivElement>('.title');

    expect(component.expanded).toBe(false, 'hide');
    expect(hasClass(div, 'text-ellipsis-2')).toBe(true, 'hide');
  });

  it('should display short url', () => {
    installData();

    expect(component.shortUrl).toEqual('test/aaaa');
    expect(page.getText('.text-caption').includes('test/aaaa'));
  });

  it('should get project description', () => {
    installData();

    expect(component.description).toEqual('description');
    expect(page.getText('.title').includes('description'));
  });
});
