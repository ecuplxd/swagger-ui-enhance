import {
  ConnectedPosition,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';

export type MenuPositionValue = 'top' | 'right' | 'bottom' | 'left';
export type MenuPosition = [MenuPositionValue, MenuPositionValue];

export interface ConvertedPosition extends ConnectedPosition {
  originFallbackX: HorizontalConnectionPos;
  originFallbackY: VerticalConnectionPos;
  overlayFallbackX: HorizontalConnectionPos;
  overlayFallbackY: VerticalConnectionPos;
}
