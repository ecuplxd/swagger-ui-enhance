import { Component, OnInit } from '@angular/core';
import { StoreService } from '../share/service';

import { Project } from './project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];

  project: Project = {} as Project;

  selected!: number;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data) => {
      this.projects = data.projects;
      this.project = data.project;
      this.selected = data.index.projectIndex;
    });
  }

  handleProjectChange(projectIndex: number): void {
    this.store.updateData({
      projectIndex,
      namespaceIndex: 0,
      apiIndex: 0,
    });
  }

  handleProjectRemove(projectIndex: number): void {
    this.store.removeProject(projectIndex);
  }
}
