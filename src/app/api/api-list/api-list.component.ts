import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { API_ID_PREFIX } from 'src/app/share/const';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';
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

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService
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
    this.store.updateUrl(apiIndex);
  }
}
