import { ConnectedPosition } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { Any } from '../../share.model';

import { MenuPositionService } from './menu-position.service';
import { MenuPositionValue } from './menu.model';

interface TestPosition {
  side: MenuPositionValue;
  align: MenuPositionValue;
  positions: ConnectedPosition[];
}

const POSITIONS: TestPosition[] = [
  {
    side: 'top',
    align: 'left',
    positions: [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: 0,
      },
    ],
  },
  {
    side: 'right',
    align: 'top',
    positions: [
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 0,
      },
    ],
  },
  {
    side: 'left',
    align: 'bottom',
    positions: [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: 0,
      },
    ],
  },
  {
    side: 'bottom',
    align: 'left',
    positions: [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 0,
      },
    ],
  },
  {
    side: 'bottom',
    align: 'right',
    positions: [
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 0,
      },
    ],
  },
];

describe('MenuPositionService', () => {
  let service: MenuPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert menu position', () => {
    for (const pos of POSITIONS) {
      const positions = service.convertMenuPositionToConnectedPositions([
        pos.side as MenuPositionValue,
        pos.align as MenuPositionValue,
      ]);

      expect(positions[0]).toEqual(
        pos.positions[0],
        `[${pos.side}, ${pos.align}] to connected positions`
      );
    }
  });

  it('should #setPosition(), #triggersSubmenu() true', () => {
    const triggerStub = { triggersSubmenu: () => true } as Any;
    const strategyStub = { withPositions: () => {} } as Any;

    spyOn(service, 'convertMenuPositionToConnectedPositions');

    service.setPosition(triggerStub, strategyStub);

    expect(
      service.convertMenuPositionToConnectedPositions
    ).toHaveBeenCalledWith(['right', 'top'], -8);
  });

  it('should #setPosition(), #triggersSubmenu() false', () => {
    const triggerStub = { triggersSubmenu: () => false } as Any;
    const strategyStub = { withPositions: () => {} } as Any;

    spyOn(service, 'convertMenuPositionToConnectedPositions');

    service.setPosition(triggerStub, strategyStub);

    expect(
      service.convertMenuPositionToConnectedPositions
    ).toHaveBeenCalledWith(['right', 'top']);
  });
});
