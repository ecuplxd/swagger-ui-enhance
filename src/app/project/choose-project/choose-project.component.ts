import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.less'],
})
export class ChooseProjectComponent implements OnInit {
  @Input() projects: Project[] = [];

  @Input() selected = 0;

  @Output() projectChanged = new EventEmitter<number>();

  @Output() projectRemove = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  changeProject(index: number): void {
    this.selected = index;
    this.projectChanged.emit(index);
  }

  removeProject(index: number): void {
    this.projectRemove.emit(index);
  }
}
