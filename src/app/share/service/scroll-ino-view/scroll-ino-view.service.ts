import { Injectable } from '@angular/core';
import { Any } from '../../share.model';

@Injectable({
  providedIn: 'root',
})
export class ScrollInoViewService {
  constructor() {}

  tick_then(fn: () => Any): void {
    setTimeout(fn, 0);
  }

  to(id: string, block: Any = 'center', selector?: string): void {
    this.tick_then(() => {
      const el = selector
        ? document.querySelector(selector)
        : document.getElementById(id);

      if (!el) {
        return;
      }

      el.scrollIntoView({
        behavior: 'auto',
        block,
        inline: 'nearest',
      });
    });
  }
}
