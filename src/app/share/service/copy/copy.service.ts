import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CopyService {
  COPY_ICON_TEXT = 'content_copy';

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  copy(value: string, valueUseForSelector: boolean = false): void {
    if (valueUseForSelector) {
      const els = document.querySelectorAll('.' + value);

      // content_copy copy icon
      value = Array.from(els)
        .map((el) =>
          (el as HTMLElement).innerText
            .trim()
            .replace('\n', '')
            .replace(this.COPY_ICON_TEXT, '')
        )
        .join(', ');
    }

    if (!value) {
      return;
    }

    this.clipboard.copy(value);

    this.toastMessage();
  }

  toastMessage(): void {
    this.snackBar.open('复制成功', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy-snack-bar',
    });
  }
}
