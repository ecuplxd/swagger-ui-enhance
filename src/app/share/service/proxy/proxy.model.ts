import { GObject } from '../../share.model';

export interface UrlInfo {
  source: string;
  host: string;
  path: string;
  protocol: string;
  port: number | string;
  query: string;
  params: UrlParams;
}

export type UrlParams = GObject<string | string[]>;
