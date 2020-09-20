import { Component, OnInit, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';

import { ApiItem } from '../api.model';
import { StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.less'],
})
export class ApiListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  apiItems: ApiItem[] = [];

  expandeds: boolean[] = [];

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data: StoreData) => {
      this.apiItems = data.apiItems;
      this.expandeds = data.expandeds;
      this.expandeds[data.index.apiIndex] = true;
    });
  }
}
