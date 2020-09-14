import { TestBed } from '@angular/core/testing';

import { MenuPositionService } from './menu-position.service';

describe('MenuPositionService', () => {
  let service: MenuPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
