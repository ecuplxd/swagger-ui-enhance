export interface ApiItem {
  consumes: string[];
  description: string;
  operationId: string;
  parameters: ApiParameters[];
  produces: string[];
  responses: ApiResponses;
  security: ApiSecurity[];
  summary: string;
  tags: string[];

  __produce: string;
  __info: ApiInfo;
  __index: number; // index in apiItems

  __id: string;
  __matched?: boolean;
  __matchedIndex?: number; // matched index
}

export interface ApiRequestHistory {
  name: string; // 别名，默认日期
  url: string; // 不带参数的请求地址
  parameters: string; // JSON 请求体
  query: boolean; // 作为 query 发送
  body: boolean; // 作为 body 发送
}

export interface ApiInfo {
  method: ApiMethod;
  description: string;
  url: string;
  urlForCopy: string;
}

export type ApiMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'options'
  | 'lock'
  | 'mkcol'
  | 'move'
  | 'copy'
  | 'trace';

export interface ApiSecurity {
  [key: string]: string[];
}

export interface ApiParameters {
  collectionFormat?: string;
  description?: string;
  in: ApiParameterPosition;
  items?: Item;
  name: string;
  required: boolean;
  schema?: Schema;
  $ref?: string;
  type: string;
  display: string;
  enum: string[];
}

export type ApiParameterPosition =
  | 'path'
  | 'query'
  | 'body'
  | 'formData'
  | 'header';

export interface ApiResponses {
  [key: number]: ApiResponsesValue;
}

export interface ApiResponsesValue {
  code: number;
  description: string;
  headers?: ApiResponseHeader;
  schema?: Schema;
  display: string;
}

export interface ApiResponseHeader {
  [key: string]: ApiResponseHeaderValue;
}

export interface ApiResponseHeaderValue {
  header: string;
  type: string;
  format: string;
  description: string;
}

export interface Schema {
  $ref: string;
  items?: Item;
  type: string;
}

export interface Item {
  default: string;
  enum: string[];
  type: string;
  $ref: string;
}

export interface ApiType {
  [key: string]: ApiTypeValue;
}

export interface ApiTypeValue {
  // tslint:disable-next-line: no-any
  [key: string]: any;
  // tslint:disable-next-line: no-any
  __example: any; // ApiType
  __refTypes: string[];
  __refMap2Key: Map<string, string>;
  __required: ApiTypeRequired;
  // tslint:disable-next-line: no-any
  __mock: { [key: string]: any };
}

export interface ApiTypeRequired {
  [key: string]: boolean;
}

export interface Size {
  width: number;
  height: number;
}

export interface ApiUrl {
  path: string;
  name?: string;
  value?: string;
}
