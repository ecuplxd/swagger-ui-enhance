import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiItem, Size } from '../api.model';
import { ApiRequestDialogComponent } from './api-request-dialog/api-request-dialog.component';

@Component({
  selector: 'app-api-request',
  templateUrl: './api-request.component.html',
  styleUrls: ['./api-request.component.less'],
})
export class ApiRequestComponent implements OnInit {
  @Input() apiItem!: ApiItem;

  // tslint:disable-next-line: no-any
  dialogRef!: MatDialogRef<ApiRequestDialogComponent, any>;

  html: HTMLHtmlElement = document.getElementsByTagName('html')[0];

  // TODO：优化
  @HostListener('window:resize', ['$event'])
  handleResize(_: KeyboardEvent): void {
    if (this.dialogRef) {
      const { width, height } = this.getDialogSize();
      this.dialogRef.updateSize(width + 'px', height + 'px');
    }
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  getDialogSize(): Size {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { width, height };
  }

  request(history: boolean = false): void {
    this.html.classList.add('hidden-y');

    const { width, height } = this.getDialogSize();
    this.dialogRef = this.dialog.open(ApiRequestDialogComponent, {
      hasBackdrop: false,
      disableClose: false,
      width: width + 'px',
      height: height + 'px',
      maxWidth: width,
      maxHeight: height,
      restoreFocus: false,
      panelClass: 'api-request-panel',
      data: {
        apiItem: this.apiItem,
        editorSize: {
          width,
          height,
        },
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.html.classList.remove('hidden-y');
    });
  }
}
