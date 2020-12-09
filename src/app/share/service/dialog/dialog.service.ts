import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiRequestDialogComponent } from 'src/app/api/api-request/api-request-dialog/api-request-dialog.component';
import { ApiItem, Size } from 'src/app/api/api.model';
import { Any } from '../../share.model';
import { RequestHistory } from '../history/history.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  DIALOG_CONFIG = {
    hasBackdrop: true,
    disableClose: false,
    restoreFocus: false,
    panelClass: 'api-request-panel',
  };

  scale = 1.5;

  dialogRef!: MatDialogRef<ApiRequestDialogComponent, Any>;

  html: HTMLHtmlElement = document.getElementsByTagName('html')[0];

  constructor(public dialog: MatDialog) {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        if (this.dialogRef) {
          const { width, height } = this.getDialogSize();
          this.dialogRef.updateSize(width + 'px', height + 'px');
        }
      });
  }

  getDialogSize(): Size {
    const width = window.innerWidth / this.scale;
    const height = window.innerHeight / this.scale;
    return { width, height };
  }

  openRequestDialog(apiItem: ApiItem, history?: RequestHistory): void {
    this.html.classList.add('hidden-y');

    const { width, height } = this.getDialogSize();
    const data = {
      history,
      apiItem,
      editorSize: {
        width,
        height,
      },
    };

    const size = {
      width: width + 'px',
      height: height + 'px',
    };

    this.dialogRef = this.dialog.open(ApiRequestDialogComponent, {
      ...this.DIALOG_CONFIG,
      ...size,
      data,
    });

    this.listenCloseDialog();
  }

  listenCloseDialog(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      this.html.classList.remove('hidden-y');
    });
  }
}
