import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { API_METHODS } from 'src/app/api/api.model';
import { ProxyService } from './proxy.service';

class HttpClientStub {
  get(): void {}

  post(): void {}

  put(): void {}

  delete(): void {}

  patch(): void {}

  head(): void {}
}

describe('ProxyService', () => {
  let service: ProxyService;
  let http: HttpClient;
  const params = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: HttpClientStub,
        },
      ],
    });

    service = TestBed.inject(ProxyService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send proxy', () => {
    spyOn(http, 'get');
    spyOn(http, 'post');
    spyOn(http, 'put');
    spyOn(http, 'delete');
    spyOn(http, 'patch');

    API_METHODS.forEach((method) => {
      service.proxy('/api/v1/users?a=a&b=b', method);
    });

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.put).toHaveBeenCalledTimes(1);
    expect(http.delete).toHaveBeenCalledTimes(1);
    expect(http.patch).toHaveBeenCalledTimes(1);
    expect(http.get).toHaveBeenCalledTimes(8);
  });

  it('should #parseUrl()', () => {
    expect(service.parseUrl('/api/v1/users?a=a&b=b')).toEqual({
      source: '/api/v1/users?a=a&b=b',
      host: 'localhost',
      path: '/proxy/api/v1/users',
      protocol: 'http:',
      port: '9876',
      query: '?a=a&b=b',
      params: {
        a: 'a',
        b: 'b',
        target: 'http:localhost',
      },
    });

    expect(service.parseUrl('/api/v1/users')).toEqual({
      source: '/api/v1/users',
      host: 'localhost',
      path: '/proxy/api/v1/users',
      protocol: 'http:',
      port: '9876',
      query: '',
      params: {
        target: 'http:localhost',
      },
    });
  });

  it('should send get', () => {
    spyOn(http, 'get');

    service.get('');

    expect(http.get).toHaveBeenCalledWith('', { params });
  });

  it('should send post', () => {
    spyOn(http, 'post');

    service.post('', {});

    expect(http.post).toHaveBeenCalledWith('', {}, { params });
  });

  it('should send put', () => {
    spyOn(http, 'put');

    service.put('', {});

    expect(http.put).toHaveBeenCalledWith('', {}, { params });
  });

  it('should send delete', () => {
    spyOn(http, 'delete');

    service.delete('');

    expect(http.delete).toHaveBeenCalledWith('', { params });
  });

  it('should send patch', () => {
    spyOn(http, 'patch');

    service.patch('', {});

    expect(http.patch).toHaveBeenCalledWith('', {}, { params });
  });

  it('should send head', () => {
    spyOn(http, 'head');

    service.head('');

    expect(http.head).toHaveBeenCalledWith('', { params });
  });

  it('should send ws', () => {
    expect(service.ws()).toBeUndefined();
  });
});
