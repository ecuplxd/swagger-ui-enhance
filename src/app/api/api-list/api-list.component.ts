import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { API_ID_PREFIX } from 'src/app/share/const';
import {
  CopyService,
  ScrollInoViewService,
  StoreService,
} from 'src/app/share/service';
import { Any, StoreData } from 'src/app/share/share.model';
import { ApiItem } from '../api.model';

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

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService,
    private copyService: CopyService
  ) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data: StoreData) => {
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
}
