import { Component, OnInit, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';

import { ApiItem } from '../api.model';
import { StoreService } from 'src/app/share/service';
import { COLORS } from 'src/app/share/const';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.less'],
})
export class ApiListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  get apiItems(): ApiItem[] {
    return this.store.getCurNamespaceApiItems();
  }

  get expandeds(): boolean[] {
    return this.store.expandeds;
  }

  colors = COLORS;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}
}
