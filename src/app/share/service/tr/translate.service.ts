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
    localStorage.setItem(this.STORAGE_KEY, local);
    return this;
  }

  reload(): this {
    location.reload();
    return this;
  }

  getTranslateText(key: string): string {
    const i18n = i18ns[this.locale] || {};

    let value: string = i18n[key];
    if (!value) {
      value = i18ns[this.FALLBACK_LOCALE][key];
      console.warn(`${this.locale}: ${key} loss i18n`);
    }

    return value;
  }

  tr(el: HTMLElement): void {
    const i18nAttr = el.getAttribute(this.I18N_MARK);

    if (!i18nAttr) {
      return;
    }

    const [key, attr] = i18nAttr.split(this.I18N_ATTR_SPLIT);
    const trText = this.getTranslateText(key);

    if (attr) {
      el.setAttribute(attr, trText);
    } else {
      el.innerText = trText;
    }
  }
}
