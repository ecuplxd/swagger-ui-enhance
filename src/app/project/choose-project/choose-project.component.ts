import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Project } from '../project.model';

@Component({
  selector: 'app-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.less'],
})
export class ChooseProjectComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @Input() projects: Project[] = [];

  @Input() selected = 0;

  @Input() expand = true;

  @Output() projectChanged = new EventEmitter<number>();

  @Output() projectRemove = new EventEmitter<number>();

  get display(): string {
    const display = this.projects[this.selected]?.display || '';

    return this.expand ? display : display[0] || '';
  }

  get empty(): boolean {
    return this.projects.length === 0;
  }

  constructor() {}

  ngOnInit(): void {}

  changeProject(index: number): void {
    this.selected = index;
    this.projectChanged.emit(index);
  }

  removeProject(index: number): void {
    this.projectRemove.emit(index);
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuTrigger.closeMenu();
  }
}
