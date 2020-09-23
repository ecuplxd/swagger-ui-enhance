// https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-hover-menu',
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.less'],
})
export class HoverMenuComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  @Input() menuClass!: string;

  @Input() closeOnContentClick = false;

  @Input() position = 'bottom';

  @Input() fixed = false;

  @Output() opened = new EventEmitter<boolean>();

  open = false;

  timedOutCloser!: number;

  constructor() {}

  ngOnInit(): void {}

  openMenu(trigger: MatMenuTrigger): void {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }

    if (!trigger.menuOpen) {
      this.opened.emit(true);
      this.open = true;
      trigger.openMenu();
    }
  }

  closeMenu(trigger: MatMenuTrigger): void {
    if (this.fixed) {
      return;
    }

    this.timedOutCloser = (setTimeout(() => {
      trigger.closeMenu();
      this.open = false;
    }, 50) as unknown) as number;
  }

  close(): void {
    this.menuTrigger.closeMenu();
  }
}
