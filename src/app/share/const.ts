import { ApiMethod } from 'src/app/api/api.model';
import { StringObject } from './share.model';

export const COLORS: {
  [key in ApiMethod]?: string;
} = {
  post: '#49cc90',
  get: '#61affe',
  put: '#fca130',
  delete: '#f93e3e',
  patch: '#50e3c2',
};

export const TYPE_MAP: StringObject = {
  string: 'string',
  integer: 'number',
  file: 'File',
  boolean: 'boolean',
  object: 'Object',
  array: '[]',
};

export const TOC_ID_PREFIX = 'api-toc-';

export const NAMESPACE_ID_PREFIX = 'namespace-';

export const API_ID_PREFIX = 'api-item-';
