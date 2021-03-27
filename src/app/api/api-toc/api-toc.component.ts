import { Location } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TOC_ID_PREFIX } from 'src/app/share/const';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { ApiItem, ApiMethod, API_METHODS } from '../api.model';

@Component({
  selector: 'app-api-toc',
  templateUrl: './api-toc.component.html',
  styleUrls: ['./api-toc.component.less'],
})
export class ApiTocComponent implements OnInit {
  @HostBinding('style.width') get width(): string {
    return this.WIDTH[+this.expand];
  }

  @Input() expand = true;

  KEY = 'TOC';

  WIDTH = ['48px', '256px'];

  title = '';

  apiItems: ApiItem[] = [];

  activedIndex!: number;

  ID_PREFIX = TOC_ID_PREFIX;

  selectAll = false;

  selectedMethods: boolean[] = [];

  methods: ApiMethod[] = (API_METHODS as unknown) as ApiMethod[];

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService,
    private location: Location
  ) {
    this.expand = JSON.parse(localStorage.getItem(this.KEY) || 'true');
    this.location.onUrlChange(() => {
      const index = this.store.getIndexFromUrl();

      if (index.apiIndex !== this.activedIndex) {
        this.activedIndex = index.apiIndex;
      }
    });
  }

  ngOnInit(): void {
    this.handleExpand();
    this.store.getData$().subscribe((data) => {
      if (data.namespace.name !== this.title) {
        this.selectAll = false;
        this.selectedMethods = API_METHODS.map(() => false);
      }

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

  sortToc(): void {
    this.store.sortApiItems();
  }

  getSelectedMethods(): Set<ApiMethod> {
    const methods = this.methods.filter(
      (_, index) => this.selectedMethods[index]
    );

    return new Set(methods);
  }

  selectAllMethod(checked: boolean): void {
    this.selectAll = checked;
    this.selectedMethods = this.methods.map(() => checked);
    this.store.filterApiItems(this.getSelectedMethods());
  }

  someSelected(): boolean {
    return this.selectedMethods.filter(Boolean).length > 0 && !this.selectAll;
  }

  updateAllComplete(): void {
    this.selectAll = this.selectedMethods.every(Boolean);
    this.store.filterApiItems(this.getSelectedMethods());
  }

  // TODO: 优化
  handleExpand(): void {
    const mainEl: HTMLDivElement | null = document.querySelector('.main');
    const apiItemsEl: HTMLDivElement | null = document.querySelector(
      '.api-items'
    );

    if (mainEl) {
      mainEl.style.paddingRight = this.width;
    }

    if (apiItemsEl) {
      apiItemsEl.style.right = this.width;
    }
  }

  toggleFavorite(index: number): void {
    this.store.addToFavorite(index);
  }
}
