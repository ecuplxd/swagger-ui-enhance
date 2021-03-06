import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less'],
})
export class ProjectInfoComponent implements OnInit {
  @Input() project!: Project;

  get shortUrl(): string {
    const { host = '', basePath = '' } = this.project;
    const shortUrl = host + basePath;

    return shortUrl || '--';
  }

  get description(): string {
    return this.project.info.description;
  }

  expanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
