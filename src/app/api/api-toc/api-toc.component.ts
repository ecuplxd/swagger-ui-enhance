import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/share/service';
import { ApiItem } from '../api.model';

@Component({
  selector: 'app-api-toc',
  templateUrl: './api-toc.component.html',
  styleUrls: ['./api-toc.component.less'],
})
export class ApiTocComponent implements OnInit {
  get title(): string {
    return this.store.getCurNamespace().name;
  }

  get apiItems(): ApiItem[] {
    return this.store.getCurNamespaceApiItems();
  }

  get activedIndex(): number {
    return this.store.apiIndex;
  }

  idPrefix = 'api-item-';

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  changeActivedIndex(index: number): void {
    this.store.dispatch('CHANGE_INDEX', {
      apiIndex: index,
    });
  }

  scrollTo(index: number): void {
    this.changeActivedIndex(index);
    const el = document.getElementById(this.idPrefix + index);
    if (el) {
      el.scrollIntoView();
    }
  }
}
