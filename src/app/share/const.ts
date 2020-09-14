import { ApiMethod } from 'src/app/api/api.model';

export const COLORS: {
  [key in ApiMethod]?: string;
} = {
  post: '#49cc90',
  get: '#61affe',
  put: '#fca130',
  delete: '#f93e3e',
  patch: '#50e3c2',
};

export const TYPE_MAP: { [key: string]: string } = {
  string: 'string',
  integer: 'number',
  file: 'File',
  boolean: 'boolean',
  object: 'Object',
  array: '[]',
};
