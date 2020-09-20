import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollInoViewService {
  constructor() {}

  to(id: string): void {
    const el = document.getElementById(id);
    console.log(el);

    if (!el) {
      return;
    }

    el.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }
}
