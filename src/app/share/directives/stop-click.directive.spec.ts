import { StopClickDirective } from './stop-click.directive';

describe('StopClickDirective', () => {
  let directive: StopClickDirective;

  it('should create an instance', () => {
    directive = new StopClickDirective();
    expect(directive).toBeTruthy();
  });

  it('should stopPropagation', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    directive.handleClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not stopPropagation', () => {
    directive.stopPropagation = false;
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    directive.handleClick(event);

    expect(event.stopPropagation).not.toHaveBeenCalled();
  });
});
