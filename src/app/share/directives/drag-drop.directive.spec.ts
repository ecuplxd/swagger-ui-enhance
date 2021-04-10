import { Any } from '../share.model';
import { DragDropDirective } from './drag-drop.directive';

describe('DragDropDirective', () => {
  let directive: DragDropDirective;

  it('should create an instance', () => {
    directive = new DragDropDirective();
    expect(directive).toBeTruthy();
  });

  it('should drop not emit fileDropped if no file', () => {
    const event = {
      dataTransfer: {
        files: [],
      },
      preventDefault: () => {},
      stopPropagation: () => {},
    } as Any;

    spyOn(directive.fileDropped, 'emit');

    directive.ondrop(event);

    expect(directive.fileDropped.emit).not.toHaveBeenCalled();
  });

  it('should emit #fileDropped if dataTransfer files not empty', () => {
    const event = {
      dataTransfer: {
        files: [1],
      },
      preventDefault: () => {},
      stopPropagation: () => {},
    } as Any;
    spyOn(directive.fileDropped, 'emit');

    directive.ondrop(event);

    expect(directive.fileDropped.emit).toHaveBeenCalledWith([1] as Any);
  });
});
