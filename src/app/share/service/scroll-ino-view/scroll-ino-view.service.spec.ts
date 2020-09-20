import { TestBed } from '@angular/core/testing';

import { ScrollInoViewService } from './scroll-ino-view.service';

describe('ScrollInoViewService', () => {
  let service: ScrollInoViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollInoViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
