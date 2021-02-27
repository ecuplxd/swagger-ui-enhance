import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { API_ID_PREFIX } from 'src/app/share/const';
import {
  CopyService,
  ScrollInoViewService,
  StoreService,
  TypeService,
} from 'src/app/share/service';
import { Any, StoreData } from 'src/app/share/share.model';
import { ApiItem, ApiParameters } from '../api.model';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.less'],
})
export class ApiListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  apiItems: ApiItem[] = [];

  expandeds: boolean[] = [];

  ID_PREFIX = API_ID_PREFIX;

  activedIndex!: number;

  start!: number;

  allowKeys = new Set(['KeyU', 'KeyD', 'KeyP']);

  selectedApis: boolean[] = [];

  selectAll = false;

  get disabled(): boolean {
    return this.selectedApis.some(Boolean);
  }

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService,
    private copyService: CopyService,
    private typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data: StoreData) => {
      this.selectedApis = data.apiItems.map(() => false);
      this.apiItems = data.apiItems;
      this.expandeds = data.expandeds;
      this.expandeds[data.index.apiIndex] = true;
      this.activedIndex = data.index.apiIndex;
      this.scroll.tick_then(() => {
        this.scroll.to(this.ID_PREFIX + this.activedIndex);
      });
    });

    fromEvent(window, 'keyup')
      .pipe(
        debounceTime(500),
        filter(() => document.activeElement?.tagName !== 'INPUT'),
        filter((evt) => this.allowKeys.has((evt as KeyboardEvent).code)),
        map((evt) => (evt as KeyboardEvent).code)
      )
      .subscribe((code: string) => {
        const api = this.store.getCurApiItem();

        if (api !== undefined) {
          (this as Any)[code](api);
        }
      });
  }

  KeyU(apiItem: ApiItem): void {
    this.copyService.copy(apiItem.__info.urlForCopy);
  }

  KeyD(apiItem: ApiItem): void {
    this.copyService.copy(apiItem.__info.description);
  }

  KeyP(): void {
    const selector = '.api-item-actived .parameter-fields';
    const pEl = document.querySelector(selector) as HTMLDivElement;

    if (!pEl) {
      return;
    }

    this.copyService.copy(pEl.dataset.copyselector || '', true);
  }

  selectAllApi(checked: boolean): void {
    this.selectAll = checked;
    this.selectedApis = this.apiItems.map(() => checked);
  }

  someSelected(): boolean {
    return this.selectedApis.filter(Boolean).length > 0 && !this.selectAll;
  }

  updateAllComplete(): void {
    this.selectAll = this.selectedApis.every(Boolean);
  }

  recordStart(): void {
    this.start = +new Date();
  }

  shouldAvoidSelect(index: number): void {
    const end = +new Date();

    // Note：避免选择的时候展开/收起手风琴组件
    if (end - this.start > 200) {
      // TODO: 优化
      // Hack
      // mousedown 一定会触发 click 所以 false -> true -> clikc 后 false
      // true -> false -> click 后 true
      this.expandeds[index] = !this.expandeds[index];
    }
  }

  updateUrl(apiIndex: number): void {
    this.activedIndex = apiIndex;
    this.store.updateUrl(apiIndex);
  }

  genServiceCall(): string {
    const codes = this.apiItems
      .filter((_, index) => this.selectedApis[index])
      .map((api) => {
        const {
          responses,
          __info: { operationId, method, urlForCopy, description },
        } = api;

        let resType = 'any';
        const res200 = (responses[200] as unknown) as ApiParameters;

        if (res200) {
          resType = this.typeService.getType(res200);
        }

        const fnName = operationId.replace(/Using.*/, '');
        let params = this.copyService.getTexts(api.argSelector);

        if (params) {
          params = `/* ${params} */`;
        }

        return method === 'get'
          ? `${fnName}() {
  this.loading = true;
  this.apiService.${fnName}(${params}).subscribe((res) => {
    // this.xxx = res.data;
    this.loading = false;
  });
}`
          : `
        ${fnName}() {
    this.loading = true;
    this.apiService.${fnName}(${params}).subscribe(
      (res: any) => {
        // this.xxx = res.data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.modal.error({ message: error.message });
      }
    );
  }
        `;
      });

    const code = codes.join('\n\n');

    this.copyService.copy(code);

    return code;
  }

  genService(): string {
    const codes = this.apiItems
      .filter((_, index) => this.selectedApis[index])
      .map((api) => {
        const {
          responses,
          __info: { operationId, method, urlForCopy, description },
        } = api;

        let resType = 'any';
        const res200 = (responses[200] as unknown) as ApiParameters;

        if (res200) {
          resType = this.typeService.getType(res200);
        }

        const fnName = operationId.replace(/Using.*/, '');
        const params = this.copyService.getTexts(api.argSelector);
        const code = `// ${description}
${fnName}(${params}): Observable<${resType}> {
  return this.api.${method}(${urlForCopy});
}`;

        return code;
      });

    const service = codes.join('\n\n');

    this.copyService.copy(service);

    return service;
  }

  setCopyClass(argSelector: string, apiItem: ApiItem): void {
    apiItem.argSelector = argSelector;
  }
}
