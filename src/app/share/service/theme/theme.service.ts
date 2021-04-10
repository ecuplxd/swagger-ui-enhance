import { Injectable } from '@angular/core';
import { THEME_DARK } from './theme-dark';
import { KEYS, METHODS, Theme, ThemeKey } from './theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  methods: ThemeKey[] = METHODS;

  vars: ThemeKey[] = KEYS;

  id = 'custom-theme';

  styleEl!: HTMLStyleElement;

  constructor() {
    this.createRoot();
    this.useLocalTheme();
  }

  useLocalTheme(): void {
    const theme = localStorage.getItem('THEME');

    if (theme) {
      if (theme === 'dark') {
        this.change('dark');
      } else {
        try {
          this.useTheme(JSON.parse(theme));
        } catch (error) {
          this.change('light');
        }
      }
    } else {
      this.change('light');
    }
  }

  change(type: string = 'light'): void {
    if (type === 'light') {
      this.reset();
    } else if (type === 'dark') {
      this.useTheme(THEME_DARK);
    }

    this.saveToLocal(type);
  }

  saveToLocal(theme: Theme | string): void {
    localStorage.setItem(
      'THEME',
      theme instanceof Theme ? JSON.stringify(theme) : theme
    );
  }

  reset(): void {
    document.body.classList.remove('custom-theme');
  }

  useTheme(theme: Theme): void {
    const vars = this.vars
      .map((key) => `--theme-${key}: ${theme[key]};`)
      .join('\n');

    const methods = this.methods
      .map((key) => `--theme-${key}-hover: ${theme[key]?.substr(0, 7)}1a;`)
      .join('\n');

    document.body.classList.add('custom-theme');
    this.styleEl.innerHTML = `:root{${vars}\n${methods}}`;
  }

  createRoot(): void {
    this.styleEl = document.getElementById('custom-theme') as HTMLStyleElement;

    if (this.styleEl) {
      return;
    }

    this.styleEl = document.createElement('style');
    this.styleEl.id = 'custom-theme';

    document.head.appendChild(this.styleEl);
  }
}
