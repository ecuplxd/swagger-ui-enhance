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
import { ObjectObject } from 'src/app/share/share.model';
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
    // this.getResponseType();
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
        '/* 返回类型 */\n' + this.typeService.getExports(projectId, typeName);
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

    const mocks: ObjectObject = {
      query: {},
      body: {},
      header: {},
    };

    parameters
      .filter((param) => param.in !== 'path')
      .forEach((param) => {
        const name = param.name;
        const typeName = this.typeService.getType(param as ApiParameters);

        param.display = `  ${param.display}: ${typeName};`;

        if (this.typeService.refType) {
          const projectId = this.store.getCurProjectId();
          const mock = {};

          this.refTypes.push(
            this.typeService.getExports(projectId, typeName, mock)
          );

          mocks[param.in][name] = mock;
        } else {
          const mockData = this.typeService.mock(typeName);
          mocks[param.in][name] = mockData;
        }
      });

    console.log(mocks);

    ['Header', 'Query', 'Body']
      .map((kind) => {
        const kindLower = kind.toLowerCase();
        const type = parameters
          .filter((param) => param.in === kindLower)
          .map((param) => param.display)
          .join('\n');

        if (type) {
          let stringify = JSON.stringify(mocks[kindLower], null, 2);
          stringify = stringify
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/\uFFFF/g, '\\"')
            // tslint:disable-next-line: quotemark
            .replace(/"/g, "'")
            .replace(/'(__undefined__)'/g, 'undefined');

          this.types += `/* ${kind} start */\nconst ${kindLower}: ${kind} = ${stringify}\n`;
          this.types += `/* ${kind} end */\n\n\n`;
        }

        return {
          name: kind,
          type,
        };
      })
      .filter((item) => item.type)
      .forEach((item) => {
        this.types += `export class ${item.name} {\n${item.type}\n}\n\n`;
      });

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

    const end = text.indexOf(`/* ${type} end */`);
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

    url = 'https://' + project.host + url;

    const responseInfo: string[] = [
      '// Request URL',
      '// ' + url + '\n',
      '// Server response',
    ];

    const text = this.queryEditor.editor.getModel()?.getValue();
    const query = this.eval(this.getText(text, 'Query'));
    const body = this.eval(this.getText(text, 'Body'));
    const header = this.eval(this.getText(text, 'Header'));

    console.log(query, body, header);
    return;

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
