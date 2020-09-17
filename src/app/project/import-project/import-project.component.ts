import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';

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

  loading = false;

  demoUrl = 'https://petstore.swagger.io/v2/swagger.json';

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    if (this.byUrl) {
      this.store.getData$().subscribe((data: StoreData) => {
        if (Object.keys(data.project).length === 0) {
          this.url = this.demoUrl;
        } else {
          this.url = data.project.updateUrl;
        }
      });
    }
  }

  parseFile(event: Event): void {
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

    this.loading = true;
    this.store.fetchProject(this.url, () => {
      this.loading = false;
    });
  }
}
