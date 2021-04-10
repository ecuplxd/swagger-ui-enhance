import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
})
export class DragDropDirective {
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    this.stopEvent(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    this.stopEvent(event);
  }

  @HostListener('drop', ['$event'])
  public ondrop(event: DragEvent): void {
    this.stopEvent(event);

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
}
