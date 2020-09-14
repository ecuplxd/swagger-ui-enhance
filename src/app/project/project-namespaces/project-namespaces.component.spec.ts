import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNamespacesComponent } from './project-namespaces.component';

describe('ProjectNamespacesComponent', () => {
  let component: ProjectNamespacesComponent;
  let fixture: ComponentFixture<ProjectNamespacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNamespacesComponent ]
    })
    .compileComponents();
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
