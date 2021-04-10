export class Theme {
  'body-bg': string;
  'nav-bg': string;
  'border-color': string;
  'title-color': string;
  'font-color': string;
  'input-color': string;
  'selected-color': string;
  'get': string;
  'post': string;
  'put': string;
  'delete': string;
  'patch': string;
  'deprecated': string;
}

export type ThemeKey = keyof Theme;

export const METHODS: ThemeKey[] = [
  'get',
  'post',
  'put',
  'delete',
  'patch',
  'deprecated',
];

export const KEYS: ThemeKey[] = [
  'body-bg',
  'nav-bg',
  'border-color',
  'title-color',
  'font-color',
  'input-color',
  'selected-color',
  ...METHODS,
];
