import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService, TypeService } from 'src/app/share/service';
import { ApiItem, ApiParameters, ApiUrl, Size } from '../../api.model';

@Component({
  selector: 'app-api-request-dialog',
  templateUrl: './api-request-dialog.component.html',
  styleUrls: ['./api-request-dialog.component.less'],
})
export class ApiRequestDialogComponent implements OnInit {
  apiItem!: ApiItem;

  editorSize: Size = {
    width: 0,
    height: 0,
  };

  urlParams: ApiUrl[] = [];

  bodyParams: ApiParameters[] = [];

  types = '';

  refTypes: string[] = [];

  // TODO：优化
  @HostListener('window:resize', ['$event'])
  handleResize(_: KeyboardEvent): void {
    this.getEditorSize();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { apiItem: ApiItem; editorSize: Size },
    private typeService: TypeService,
    private store: StoreService
  ) {
    this.apiItem = JSON.parse(JSON.stringify(data.apiItem));

    this.getEditorSize(data.editorSize);
    this.parseUrl(this.apiItem.__info.url);
    this.groupParams();
  }

  parseUrl(url: string): void {
    let index = 0;

    url.replace(/\{(.+?)\}/g, (match: string, p1, p2) => {
      this.urlParams.push({
        path: url.substring(index, p2),
      });

      this.urlParams.push({
        path: '',
        name: p1,
        value: '',
      });

      index = p2 + match.length;

      return '';
    });

    if (index !== url.length) {
      this.urlParams.push({
        path: url.substring(index),
      });
    }
  }

  // TODO：优化
  groupParams(): void {
    const parameters = this.apiItem.parameters;
    if (!parameters) {
      return;
    }

    // tslint:disable-next-line: no-any
    const queryMock: any = {};
    // tslint:disable-next-line: no-any
    const bodyMock: any = {};

    // parse header
    parameters
      .filter((param) => param.in !== 'path' && param.in !== 'header')
      .forEach((param) => {
        const name = param.name;
        const typeName = this.typeService.getType(param as ApiParameters);
        const inQuery = param.in === 'query';

        param.display = `  ${param.display}: ${typeName};`;

        if (this.typeService.refType) {
          const projectId = this.store.getCurProject().id;
          const mock = {};

          this.refTypes.push(
            this.typeService.getExports(projectId, typeName, mock)
          );

          if (inQuery) {
            queryMock[name] = mock;
          } else {
            bodyMock[name] = mock;
          }
        } else {
          const mockData = this.typeService.mock(typeName);

          if (inQuery) {
            queryMock[name] = mockData;
          } else {
            bodyMock[name] = mockData;
          }
        }
      });

    const queryTypes: string = parameters
      .filter((param) => param.in === 'query')
      .map((param) => param.display)
      .join('\n');

    const bodyTypes = parameters
      .filter((param) => param.in === 'body')
      .map((param) => param.display)
      .join('\n');

    if (queryTypes) {
      let stringify = JSON.stringify(queryMock, null, 2);

      stringify = stringify
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/\uFFFF/g, '\\"')
        .replace(/"/g, '\'')
        .replace(/'(__undefined__)'/g, 'undefined');

      this.types += `const query: Query = ${stringify}\n\n`;
    }

    if (bodyTypes) {
      let stringify = JSON.stringify(bodyMock, null, 2);

      stringify = stringify
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/\uFFFF/g, '\\"')
        .replace(/"/g, '\'')
        .replace(/'(__undefined__)'/g, 'undefined');

      this.types += `const body: Body = ${stringify}\n\n`;
    }

    if (queryTypes) {
      this.types += `export class Query {\n${queryTypes}\n}\n\n`;
    }

    if (bodyTypes) {
      this.types += `export class Body {\n${bodyTypes}\n}\n\n`;
    }

    this.types += this.refTypes.join('\n');
  }

  getEditorSize(size?: Size): void {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (size) {
      width = size.width;
      height = size.height;
    }

    size = {
      width: width / 2,
      height: height - 38,
    };

    this.editorSize = JSON.parse(JSON.stringify(size));
  }

  ngOnInit(): void {}
}
