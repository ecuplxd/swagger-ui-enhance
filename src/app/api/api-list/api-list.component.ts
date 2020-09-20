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
}
