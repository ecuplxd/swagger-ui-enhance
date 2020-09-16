import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from 'src/app/share/components';
import { ProxyService, StoreService, TypeService } from 'src/app/share/service';
import { ApiItem, ApiParameters, ApiUrl, Size } from '../../api.model';

@Component({
  selector: 'app-api-request-dialog',
  templateUrl: './api-request-dialog.component.html',
  styleUrls: ['./api-request-dialog.component.less'],
})
export class ApiRequestDialogComponent implements OnInit {
  @ViewChild('queryEditor') queryEditor!: EditorComponent;

  apiItem!: ApiItem;

  editorSize: Size = {
    width: 0,
    height: 0,
  };

  urlParams: ApiUrl[] = [];

  bodyParams: ApiParameters[] = [];

  types = '';

  response = '';

  refTypes: string[] = [];

  // TODO：优化
  @HostListener('window:resize', ['$event'])
  handleResize(_: KeyboardEvent): void {
    this.getEditorSize();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { apiItem: ApiItem; editorSize: Size },
    private typeService: TypeService,
    private store: StoreService,
    private proxy: ProxyService
  ) {
    this.apiItem = data.apiItem;
    this.getEditorSize(data.editorSize);
    this.parseUrl(this.apiItem.__info.url);
    this.groupParams();
    this.getResponseType();
  }

  ngOnInit(): void {}

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

  getResponseType(): void {
    const param = (this.apiItem.responses[200] as unknown) as ApiParameters;
    if (!param) {
      return;
    }

    const typeName = this.typeService.getType(param);
    if (this.typeService.refType) {
      const projectId = this.store.getCurProjectId();
      this.response =
        '// 返回类型\n' + this.typeService.getExports(projectId, typeName);
    }
  }

  // TODO：优化
  groupParams(): void {
    const parameters: ApiParameters[] = JSON.parse(
      JSON.stringify(this.apiItem.parameters)
    );
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
          const projectId = this.store.getCurProjectId();
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
        // tslint:disable-next-line: quotemark
        .replace(/"/g, "'")
        .replace(/'(__undefined__)'/g, 'undefined');

      this.types += `// Query start\nconst query: Query = ${stringify}\n`;
      this.types += '// Query end\n\n';
    }

    if (bodyTypes) {
      let stringify = JSON.stringify(bodyMock, null, 2);

      stringify = stringify
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/\uFFFF/g, '\\"')
        // tslint:disable-next-line: quotemark
        .replace(/"/g, "'")
        .replace(/'(__undefined__)'/g, 'undefined');

      this.types += `// Body start\nconst body: Body = ${stringify}\n`;
      this.types += '// Body end\n\n';
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

  getText(text: string | undefined, type: string): string {
    if (text === undefined) {
      return '{}';
    }

    const start = text.indexOf(` ${type} = `);

    if (start === -1) {
      return '{}';
    }

    const end = text.indexOf(`// ${type} end`);
    const offset = ` ${type} = `.length;
    const result = text.substring(start + offset, end);

    return result;
  }

  createResponse(): string {
    return '';
  }

  eval(tex: string): Object {
    return new Function('return ' + tex)();
  }

  doRequest(): void {
    let url = this.urlParams.map((item) => item.value || item.path).join('');

    const method = this.apiItem.__info.method;
    const project = this.store.getCurPorject();

    url = 'https://' + project.host + '/tdc/hamurapi' + url;

    const responseInfo: string[] = [
      '// Request URL',
      '// ' + url + '\n',
      '// Server response',
    ];

    const text = this.queryEditor.editor.getModel()?.getValue();
    const query = this.eval(this.getText(text, 'Query'));
    const body = this.eval(this.getText(text, 'Body'));
    const header = this.eval(this.getText(text, 'Header'));

    this.proxy.proxy(url, method, query, body, header).subscribe(
      (res) => {
        responseInfo.push('// code: 200\n');
        responseInfo.push('// Response body：');
        responseInfo.push('const res = ' + JSON.stringify(res, null, 2));
        this.response = responseInfo.join('\n');
      },
      (error) => {}
    );
  }
}
