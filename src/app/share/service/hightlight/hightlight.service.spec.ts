import { TestBed } from '@angular/core/testing';

import { HightlightService } from './hightlight.service';

describe('HightlightService', () => {
  let service: HightlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HightlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
