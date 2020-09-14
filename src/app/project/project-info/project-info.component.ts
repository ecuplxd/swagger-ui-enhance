import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less'],
})
export class ProjectInfoComponent implements OnInit {
  @Input() project!: Project;

  get shortUrl(): string {
    return this.project.host + this.project.basePath;
  }

  constructor() {}

  ngOnInit(): void {}
}
