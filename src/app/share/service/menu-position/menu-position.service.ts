// https://gist.github.com/jpzwarte/5b6f848a8cbc1488779181894382f306

import {
  OverlayRef,
  FlexibleConnectedPositionStrategy,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Any } from '../../share.model';
import {
  MenuPositionValue,
  ConvertedPosition,
  MenuPosition,
} from './menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuPositionService {
  constructor() {}

  recalculateMenu(menuTrigger: MatMenuTrigger): void {
    const overlayRef: OverlayRef = (menuTrigger as Any)._overlayRef;
    const overlayConfig = overlayRef.getConfig();

    (overlayConfig.positionStrategy as Any)._isInitialRender = true;

    this.setPosition(
      menuTrigger,
      overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy
    );
  }

  setPosition(
    menuTrigger: MatMenuTrigger,
    positionStrategy: FlexibleConnectedPositionStrategy
  ): void {
    let positions: ConnectedPosition[];

    if (menuTrigger.triggersSubmenu()) {
      positions = this.convertMenuPositionToConnectedPositions(
        ['right', 'top'],
        -8
      );
    } else {
      positions = this.convertMenuPositionToConnectedPositions([
        'right',
        'top',
      ]);
    }

    positionStrategy.withPositions(positions);
  }

  convertSideMenuPosition(side: MenuPositionValue): ConvertedPosition {
    if (side === 'top' || side === 'bottom') {
      return {
        originX: 'start',
        originY: side,
        overlayX: 'start',
        overlayY: side === 'top' ? 'bottom' : 'top',
        originFallbackX: 'end',
        originFallbackY: side === 'top' ? 'bottom' : 'top',
        overlayFallbackX: 'end',
        overlayFallbackY: side,
      };
    } else {
      return {
        originX: side === 'left' ? 'start' : 'end',
        originY: 'top',
        overlayX: side === 'left' ? 'end' : 'start',
        overlayY: 'top',
        originFallbackX: side === 'left' ? 'end' : 'start',
        originFallbackY: 'bottom',
        overlayFallbackX: side === 'left' ? 'start' : 'end',
        overlayFallbackY: 'bottom',
      };
    }
  }

  convertMenuPositionToConnectedPositions(
    [side, align]: MenuPosition,
    offsetY = 0
  ): ConnectedPosition[] {
    let {
      originX,
      originY,
      overlayX,
      overlayY,
      originFallbackX,
      originFallbackY,
      overlayFallbackX,
      overlayFallbackY,
    } = this.convertSideMenuPosition(side);

    if (align === 'top' || align === 'bottom') {
      originY = align;
      overlayY = originY;
    } else {
      originX = align === 'left' ? 'start' : 'end';
      overlayX = originX;
    }

    return [
      { originX, originY, overlayX, overlayY, offsetY },
      {
        originX: originFallbackX,
        originY,
        overlayX: overlayFallbackX,
        overlayY,
        offsetY,
      },
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY,
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY,
      },
    ];
  }
}
