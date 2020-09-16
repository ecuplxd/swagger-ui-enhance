import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/share/service';
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

  // TODO
  idPrefix = 'api-item-';

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data) => {
      this.title = data.namespace.name;
      this.apiItems = data.apiItems;
      this.activedIndex = data.index.apiIndex;
      // bugfix
      // this.scrollTo(data.index.apiIndex);
    });
  }

  changeActivedIndex(index: number): void {
    if (index === this.activedIndex) {
      return;
    }

    this.store.dispatch('CHANGE_INDEX', {
      apiIndex: index,
    });
  }

  scrollTo(index: number): void {
    const el = document.getElementById(this.idPrefix + index);
    if (el) {
      el.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }
}
