import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.less'],
})
export class ChooseProjectComponent implements OnInit {
  @Input() projects: Project[] = [];

  @Input() selected = 0;

  @Output() projectChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  handleSelectChange(sel: MatSelectChange): void {
    this.projectChanged.emit(sel.value);
  }
}
