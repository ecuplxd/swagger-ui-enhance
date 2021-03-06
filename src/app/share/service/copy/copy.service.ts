import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '../tr/translate.service';

@Injectable({
  providedIn: 'root',
})
export class CopyService {
  COPY_ICON_TEXT = 'content_copy';

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private tr: TranslateService
  ) {}

  getTexts(selector: string = ''): string {
    if (!selector) {
      return '';
    }

    const els = document.querySelectorAll('.' + selector);
    // content_copy copy icon
    const value = Array.from(els)
      .map((el) =>
        (el as HTMLElement).innerText
          .trim()
          .replace('\n', '')
          .replace(this.COPY_ICON_TEXT, '')
      )
      .join(', ');

    return value;
  }

  copy(value: string, valueUseForSelector: boolean = false): void {
    if (valueUseForSelector) {
      value = this.getTexts(value);
    }

    if (!value) {
      return;
    }

    this.clipboard.copy(value);

    this.toastMessage();
  }

  toastMessage(): void {
    const msg = this.tr.tr('copy-success', '复制成功');

    this.snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy-snack-bar',
    });
  }
}
