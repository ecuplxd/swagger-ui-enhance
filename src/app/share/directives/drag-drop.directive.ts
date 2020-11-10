import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
})
export class DragDropDirective {
  bgColor = '#f5fcff';

  activeBgColor = '#9ecbec';

  @HostBinding('style.background-color')
  private background = this.bgColor;

  @HostBinding('style.opacity')
  private opacity = 1;

  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    this.stopEvent(event).setBackgroudColor(this.activeBgColor, 0.8);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    this.stopEvent(event).setBackgroudColor();
  }

  @HostListener('drop', ['$event'])
  public ondrop(event: DragEvent): void {
    this.stopEvent(event).setBackgroudColor();

    if (!event.dataTransfer) {
      return;
    }

    const files: FileList = event.dataTransfer.files;

    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  constructor() {}

  stopEvent(event: DragEvent): this {
    event.preventDefault();
    event.stopPropagation();

    return this;
  }

  setBackgroudColor(color: string = this.bgColor, opacity: number = 1): this {
    this.background = color;
    this.opacity = opacity;

    return this;
  }
}
