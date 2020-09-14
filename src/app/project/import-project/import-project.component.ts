import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { StoreService } from 'src/app/share/service';

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.less'],
})
export class ImportProjectComponent implements OnInit {
  @HostBinding('class') get valid(): string {
    return this.byLocal ? 'by-local' : '';
  }

  @Input() byUrl = true;

  @Input() byLocal = false;

  urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  url = '';

  destroy = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: no-any
  parseFile(event: Event): void {
    console.log(111);
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    this.store.parseFile(files[0]);
    this.destroy = true;

    setTimeout(() => {
      this.destroy = false;
    }, 500);
  }

  fetchFile(): void {
    if (!this.urlReg.test(this.url)) {
      return;
    }

    this.store.fetchProject(this.url);
  }
}
