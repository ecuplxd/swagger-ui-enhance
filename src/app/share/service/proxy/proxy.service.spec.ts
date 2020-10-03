import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
