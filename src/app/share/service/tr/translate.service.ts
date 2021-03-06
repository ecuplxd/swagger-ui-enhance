import { Injectable } from '@angular/core';
import { i18ns } from 'src/locale';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  locale = 'zh-CN';

  FALLBACK_LOCALE = 'zh-CN';

  STORAGE_KEY = 'locale';

  I18N_MARK = 'tr';

  I18N_ATTR_SPLIT = '|';

  constructor() {
    this.getLocale();
  }

  getLocale(): string {
    this.locale = localStorage.getItem(this.STORAGE_KEY) || this.locale;
    return this.locale;
  }

  setLocale(local: string): this {
    this.locale = local;
    localStorage.setItem(this.STORAGE_KEY, local);
    return this;
  }

  reload(): this {
    Array.from(document.querySelectorAll(`[${this.I18N_MARK}]`)).forEach((el) =>
      this.trEl(el as HTMLElement)
    );
    return this;
  }

  tr(key: string, fallBack: string = ''): string {
    const i18n = i18ns[this.locale] || {};

    let value: string = i18n[key];
    if (!value) {
      value = fallBack || i18ns[this.FALLBACK_LOCALE][key];
      console.warn(`${this.locale}: ${key} loss i18n`);
    }

    return value;
  }

  trEl(el: HTMLElement): void {
    const i18nAttr = el.getAttribute(this.I18N_MARK);

    if (!i18nAttr) {
      return;
    }

    const [key, attr] = i18nAttr.split(this.I18N_ATTR_SPLIT);
    const trText = this.tr(key);

    if (attr) {
      el.setAttribute(attr, trText);
    } else {
      el.innerText = trText;
    }
  }
}
