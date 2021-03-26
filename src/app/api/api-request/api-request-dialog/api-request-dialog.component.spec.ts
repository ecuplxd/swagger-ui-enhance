import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { CopyComponent } from 'src/app/share/components';
import { CopyDirective } from 'src/app/share/directives';
import {
  HistoryService,
  ProxyService,
  StoreService,
  TypeService,
} from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { hasClass, Page, StoreServiceStub } from 'src/__test__';
import { ApiInfoComponent } from '../../api-info/api-info.component';
import { ApiMethodComponent } from '../../api-method/api-method.component';
import { ApiItem, ApiRequestModalData } from '../../api.model';
import { ApiRequestHistoryComponent } from '../api-request-history/api-request-history.component';
import { ApiRequestDialogComponent } from './api-request-dialog.component';

class ProxyServiceStub {
  proxy(): Observable<{}> {
    return of({});
  }
}

@Component({
  selector: 'app-editor',
  template: `<pre
    [ngStyle]="{
      width: size.width + 'px',
      heigth: size.height + 'px'
    }"
    [innerText]="value"
  ></pre>`,
})
class EditorStubComponent {
  @Input() size = {
    width: 0,
    height: 0,
  };

  @Input() value = '';

  editor = {
    getModel: () => {
      return {
        getValue: () => {
          return this.value;
        },
      };
    },
  };

  constructor() {}
}

describe('ApiRequestDialogComponent', () => {
  let page: Page<ApiRequestDialogComponent>;
  let component: ApiRequestDialogComponent;
  let data: ApiRequestModalData;
  let proxy: ProxyService;

  const reConstructor = (modalData: ApiRequestModalData) => {
    data = TestBed.inject(MAT_DIALOG_DATA);
    data.history = modalData.history;
    data.apiItem = modalData.apiItem;
    data.editorSize = modalData.editorSize;

    page = new Page(ApiRequestDialogComponent);
    page.installData();
    component = page.component;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        FormsModule,
      ],
      declarations: [
        ApiRequestDialogComponent,
        EditorStubComponent,
        ApiInfoComponent,
        ApiRequestHistoryComponent,
        ApiMethodComponent,
        CopyComponent,
        CopyDirective,
      ],
      providers: [
        TypeService,
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        {
          provide: ProxyService,
          useClass: ProxyServiceStub,
        },
        HistoryService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            apiItem: {
              parameters: null,
              responses: {},
              __info: {
                url: '/api/v1/user',
              },
            },
            editorSize: {
              height: 600,
              width: 600,
            },
            history: undefined,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    data = TestBed.inject(MAT_DIALOG_DATA);
    proxy = TestBed.inject(ProxyService);
    page = new Page(ApiRequestDialogComponent);
    page.installData();
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show api info', () => {
    const infoDe = page.queryDe('app-api-info');
    const infoC = infoDe.injector.get(ApiInfoComponent) as ApiInfoComponent;

    expect(infoDe.nativeElement).toBeTruthy();
    expect(infoC.showMethod).toBe(false, 'not show method in request dialog');
    expect(infoC.showUrl).toBe(false, 'not show url in request dialog');
    expect(infoC.copyable).toBe(false, 'can not copy url in request dialog');
  });

  it('should show api request history', () => {
    const hitoryDe = page.queryDe('app-api-request-history');
    const historyC = hitoryDe.injector.get(
      ApiRequestHistoryComponent
    ) as ApiRequestHistoryComponent;

    expect(hitoryDe.nativeElement).toBeTruthy();
    expect(historyC.fromRequest).toBe(true, 'from request dialog true');
    expect(historyC.outlined).toBe(
      false,
      'not show outlined in request dialog'
    );
  });

  it('should show api method', () => {
    expect(page.query('app-api-method')).toBeTruthy();
  });

  it('should one url params no input', () => {
    const urls = page.query('.url-segments');

    expect(hasClass(urls, 'only-one-url')).toBeTrue();
  });

  it('should get request info in history record if exits', () => {
    reConstructor(({
      apiItem: {
        parameters: [],
        responses: {},
        __info: {
          method: 'get',
        },
      },
      editorSize: {
        height: 600,
        width: 600,
      },
      history: {
        editorValue: 'editorValue',
        name: '2020-11-19 10:54:04',
        url: '/store/inventory',
        urlParams: [
          {
            path: '/store/inventory',
          },
        ],
      },
    } as Any) as ApiRequestModalData);

    expect(component.urlParams).toEqual([
      {
        path: '/store/inventory',
      },
    ]);
    expect(component.editorValue).toEqual('editorValue');
  });

  it('should gen input for url has path params', () => {
    reConstructor(({
      apiItem: {
        parameters: [
          {
            description: 'ID of the order that needs to be deleted',
            display: 'orderId',
            format: 'int64',
            in: 'path',
            minimum: 1,
            name: 'orderId',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            code: 200,
            description: 'Success',
          },
          400: {
            code: 400,
            description: 'Invalid ID supplied',
          },
          404: {
            code: 404,
            description: 'Order not found',
          },
        },
        __info: {
          description: 'Delete purchase order by ID',
          method: 'delete',
          operationId: 'deleteOrder',
          url: '/store/order/{orderId}',
          urlForCopy: '`/store/order/${orderId}`',
        },
      },
      editorSize: {
        height: 600,
        width: 600,
      },
      history: undefined,
    } as Any) as ApiRequestModalData);

    expect(component.urlParams).toEqual([
      {
        path: '/store/order/',
      },
      {
        name: 'orderId',
        path: '',
        value: '',
      },
    ]);

    const urlDes = page.queryAllDe('.url-segment-item');

    urlDes.forEach((urlDe, index) => {
      const urlItemEl: HTMLDivElement = urlDe.nativeElement;
      const url = component.urlParams[index];

      if (!url.name) {
        const path = urlItemEl.querySelector('.url-path') as HTMLSpanElement;
        const urlInput = urlItemEl.querySelector(
          '.url-value'
        ) as HTMLInputElement;

        expect(path.innerText).toEqual(url.path);
        expect(urlInput).toBeFalsy('not param in path, no input');
      } else {
        const path = urlItemEl.querySelector('.url-path') as HTMLSpanElement;
        const paramName = urlItemEl.querySelector(
          '.url-name'
        ) as HTMLSpanElement;
        const paramInput = urlItemEl.querySelector(
          '.url-value'
        ) as HTMLInputElement;

        expect(path).toBeFalsy('param in path, no url-path');
        expect(paramName.innerText).toEqual(url.name);
        expect(paramInput.value).toEqual('');
      }
    });
  });

  it('should give editor a default size', () => {
    component.editorSize = {
      width: 0,
      height: 0,
    };

    expect(component.editorSize.width).toEqual(0, 'default width');
    expect(component.editorSize.height).toEqual(0, 'default height');

    reConstructor(({
      apiItem: {
        parameters: [],
        responses: {},
        __info: {
          method: 'get',
        },
      },
      editorSize: null,
      history: {
        editorValue: 'editorValue',
        name: '2020-11-19 10:54:04',
        url: '/store/inventory',
        urlParams: [
          {
            path: '/store/inventory',
          },
        ],
      },
    } as Any) as ApiRequestModalData);

    expect(component.editorSize.width).not.toEqual(0);
    expect(component.editorSize.height).not.toEqual(0);
  });

  // TODO: Fix it
  xit('should resize editor when window size change', fakeAsync(() => {
    const size = component.editorSize;
    window.dispatchEvent(new Event('resize'));
    page.detectChanges();

    tick(300);

    expect(component.editorSize).not.toEqual(size);
    expect(component.subscription).toBeTruthy();

    flush();
  }));

  it('should group request params', () => {
    component.apiItem = ({
      __info: {
        method: 'post',
      },
      responses: {
        200: {
          code: 200,
          description: 'successful operation',
          schema: {
            $ref: '#/definitions/Order',
          },
        },
        405: {
          code: 405,
          description: 'Invalid input',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'petId',
          required: true,
          type: 'integer',
          display: 'petId',
        },
        {
          in: 'header',
          name: 'api_key',
          required: false,
          type: 'string',
          display: '  api_key?',
        },
        {
          in: 'body',
          name: 'body',
          required: true,
          display: '  body',
          schema: {
            $ref: '#/definitions/Pet',
          },
        },
        {
          in: 'query',
          name: 'username',
          required: true,
          type: 'string',
          display: '  username',
        },
        {
          in: 'formData',
          name: 'status',
          required: false,
          type: 'string',
          display: '  status?',
        },
      ],
    } as Any) as ApiItem;

    page.store.transformProject(page.store.getCurPorject());
    component.groupParams();
    component.getResponseType();

    expect(component.editorValue.includes('/* Body start */')).toBeTrue();
    expect(component.editorValue.includes('/* Header start */')).toBeTrue();
    expect(component.editorValue.includes('/* FormData start */')).toBeTrue();
    expect(component.editorValue.includes('/* Query start */')).toBeTrue();
    expect(component.response.includes('/* 返回类型 */')).toBeTrue();
  });

  it('should #createResponse()', () => {
    expect(component.createResponse()).toEqual('');
  });

  it('should send a request', () => {
    expect(component.response).toBe('', 'before send');

    component.doRequest();

    expect(component.response).not.toEqual('');
  });

  it('should #doRequest() handle error', () => {
    spyOn(console, 'log');
    spyOn(proxy, 'proxy').and.returnValue(throwError({}));

    component.doRequest();

    expect(console.log).toHaveBeenCalledWith({});
  });

  it('should #getResponseType()', () => {
    component.getResponseType();

    expect(component.response).toEqual('');
  });

  it('should #eval() fail return {}', () => {
    expect(component.eval('le a')).toEqual({});
    expect(component.eval('1')).toEqual(1);
    expect(component.eval('{a: 1}')).toEqual({ a: 1 });
  });

  it('should #getText() get request params value', () => {
    expect(component.getText(undefined, 'Body')).toEqual(
      '{}',
      'kind no value set to {}'
    );

    expect(component.getText(`ssss`, 'Body')).toEqual(
      '{}',
      'can not find Body locate, set to {}'
    );

    expect(
      component.getText(
        `
    /* Body start */
    const body: Body = {
      body: { id: 1 }
    }
    /* Body end */`,
        'Body'
      )
    ).toEqual(`{
      body: { id: 1 }
    }`);
  });

  it('should #getStringLen() return string len', () => {
    expect(component.getStringLen('')).toEqual(0);
    expect(component.getStringLen('1111')).toEqual(4);
    expect(component.getStringLen(undefined)).toEqual(0);
  });

  it('should handle get editor value fail', () => {
    spyOn(component.queryEditor.editor, 'getModel').and.returnValue(null);

    expect(component.getEditorValue()).toEqual('');
  });
});
