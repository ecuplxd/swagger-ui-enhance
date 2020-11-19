import { DebugElement } from '@angular/core';
import { Any } from 'src/app/share/share.model';

export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

export function click(
  el: DebugElement | HTMLElement,
  eventObj: Any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export function hasClass(el: HTMLElement, className: string): boolean {
  return el.className.includes(className);
}
