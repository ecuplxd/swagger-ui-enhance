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

  get project(): Project {
    return this.store.getCurProject();
  }

  get selected(): number {
    return this.store.projectIndex;
  }

  constructor(private store: StoreService) {
    this.projects = this.store.projects;
  }

  ngOnInit(): void {}

  handleProjectChange(projectIndex: number): void {
    this.store.dispatch('CHANGE_INDEX', {
      projectIndex,
      namespaceIndex: 0,
      apiIndex: 0,
    });
  }
}
