export interface UrlInfo {
  source: string;
  host: string;
  path: string;
  protocol: string;
  port: number | string;
  query: string;
  params: UrlParams;
}

export interface UrlParams {
  [key: string]: string | string[];
}
