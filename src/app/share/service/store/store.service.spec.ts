import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProxyService } from '../proxy/proxy.service';
import { TypeService } from '../type/type.service';
import { StoreService } from './store.service';

class MatSnackBarStub {
  open(): void {}
}

class ProxyServiceStub {
  proxy(): void {}
}

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TypeService,
        },
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        },
        {
          provide: ProxyService,
          useClass: ProxyServiceStub,
        },
      ],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
