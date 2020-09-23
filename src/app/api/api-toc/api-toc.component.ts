import { Component, OnInit } from '@angular/core';
import { TOC_ID_PREFIX } from 'src/app/share/const';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { ApiItem } from '../api.model';

@Component({
  selector: 'app-api-toc',
  templateUrl: './api-toc.component.html',
  styleUrls: ['./api-toc.component.less'],
})
export class ApiTocComponent implements OnInit {
  title = '';

  apiItems: ApiItem[] = [];

  activedIndex!: number;

  ID_PREFIX = TOC_ID_PREFIX;

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService
  ) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data) => {
      this.title = data.namespace.name;
      this.apiItems = data.apiItems;
      this.activedIndex = data.index.apiIndex;
      this.scroll.to(this.ID_PREFIX + this.activedIndex);
    });
  }

  changeActivedIndex(index: number): void {
    if (index === this.activedIndex) {
      return;
    }

    this.store.updateData({
      apiIndex: index,
    });
  }
}
