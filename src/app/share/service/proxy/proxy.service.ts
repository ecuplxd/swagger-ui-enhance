import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMethod } from 'src/app/api/api.model';
import { UrlInfo, UrlParams } from './proxy.model';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpClient) {}

  parseUrl(url: string): UrlInfo {
    const a = document.createElement('a');
    a.href = url;

    const params: UrlParams = a.search
      .replace(/^\?/, '')
      .split('&')
      .filter(Boolean)
      .reduce(
        (param: UrlParams, query: string) => {
          const querySplit = query.split('=');
          param[querySplit[0]] = querySplit[1];
          return param;
        },
        {
          target: a.protocol + a.hostname,
        }
      );

    return {
      source: url,
      host: a.hostname,
      path: '/proxy' + a.pathname.replace(/^([^\/])/, '/$1'),
      protocol: a.protocol,
      port: a.port,
      query: a.search,
      params,
    };
  }

  proxy(
    url: string,
    method: ApiMethod,
    query: Object = {},
    body: Object = {},
    headers: Object = {}
  ): Observable<Object> {
    // const urlInfo = this.parseUrl(url);

    const params = {
      query,
      headers,
    };

    url = '/proxy?url=' + url;
    switch (method) {
      case 'get':
        return this.get(url, params);
      case 'post':
        return this.post(url, body, params);
      case 'put':
        return this.put(url, body, params);
      case 'delete':
        return this.delete(url, params);
      case 'patch':
        return this.patch(url, body, params);
      default:
        break;
    }

    return this.get(url);
  }

  get(url: string, params = {}): Observable<Object> {
    return this.http.get(url, {
      params,
    });
  }

  post(url: string, body: Object, params = {}): Observable<Object> {
    return this.http.post(url, body, {
      params,
    });
  }

  put(url: string, body: Object, params = {}): Observable<Object> {
    return this.http.put(url, body, {
      params,
    });
  }

  delete(url: string, params = {}): Observable<Object> {
    return this.http.delete(url, {
      params,
    });
  }

  patch(url: string, body: Object, params = {}): Observable<Object> {
    return this.http.patch(url, body, {
      params,
    });
  }

  head(url: string, params = {}): Observable<Object> {
    return this.http.head(url, {
      params,
    });
  }

  // TODO
  ws(): void {}
}
