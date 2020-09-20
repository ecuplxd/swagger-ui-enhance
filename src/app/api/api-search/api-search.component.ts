import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProjectNamesapce } from 'src/app/project/project.model';
import { StoreService } from 'src/app/share/service';
import { ApiMethod } from '../api.model';

@Component({
  selector: 'app-api-search',
  templateUrl: './api-search.component.html',
  styleUrls: ['./api-search.component.less'],
})
export class ApiSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('triggle') triggle!: MatMenuTrigger;

  @ViewChild('inputRef') inputRef!: ElementRef;

  namespaces: ProjectNamesapce[] = [];

  activedSearchIndex = 0;

  matchedCount = 0;

  keyword = '';

  matchedElClass = '.suggestion-item.actived';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.updateActivedSearchIndex(event.key);
        break;
      case '/':
        this.focusInput();
        break;
      case 'Escape':
        this.blurInput();
        break;
      case 'Enter':
      case 'ArrowRight':
        this.selectActivedItem();
        break;
      default:
        break;
    }
  }

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    fromEvent(this.inputRef.nativeElement as HTMLInputElement, 'input')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        filter(() => {
          if (!this.keyword) {
            this.hideSearchResult();
            return false;
          }
          return true;
        })
      )
      .subscribe(() => {
        this.search();
      });
  }

  getMatched(str: string, type: string = ''): string {
    const cls = `token matched ${type}`.trim();
    return str.replace(
      new RegExp(this.keyword, 'ig'),
      `<span class="${cls}">$&</span>`
    );
  }

  // TODO: search.service
  filterNamespaces(): ProjectNamesapce[] {
    const namespaces: ProjectNamesapce[] = JSON.parse(
      JSON.stringify(this.store.getCurNamespaces())
    );

    namespaces.forEach((namespace) => {
      namespace.name = this.getMatched(namespace.name, 'title');
      namespace.description = this.getMatched(namespace.description);

      namespace.matched =
        namespace.name.includes('span') ||
        namespace.description.includes('span');

      namespace.apiItems.forEach((api) => {
        api.__info.method = this.getMatched(
          api.__info.method.toUpperCase()
        ) as ApiMethod;
        api.__info.url = this.getMatched(api.__info.url);
        api.__info.description = this.getMatched(api.__info.description);

        api.__matched =
          api.__info.method.includes('span') ||
          api.__info.url.includes('span') ||
          api.__info.description.includes('span');
        api.__matchedIndex = api.__matched ? this.matchedCount++ : -1;
      });

      // TODO
      // if (!namespace.matched) {
      //   namespace.matched = namespace.apiItems.some((api) => api.__matched);
      // }
      namespace.matched = namespace.apiItems.some((api) => api.__matched);
    });

    this.namespaces = namespaces;

    return namespaces;
  }

  search(): void {
    this.reset();
    this.filterNamespaces();

    if (this.matchedCount) {
      this.showSearchResult();
    } else {
      this.hideSearchResult();
    }
  }

  handleSelect(indexs: number[]): void {
    this.reset(true);
    this.hideSearchResult();

    this.store.dispatch('CHANGE_INDEX', {
      namespaceIndex: indexs[0],
      apiIndex: indexs[1],
    });
  }

  showSearchResult(): void {
    if (this.triggle.menuOpen) {
      return;
    }

    this.triggle.openMenu();
  }

  hideSearchResult(): void {
    this.triggle.closeMenu();
  }

  reset(resetKeyword: boolean = false): void {
    this.activedSearchIndex = 0;
    this.matchedCount = 0;
    this.keyword = resetKeyword ? '' : this.keyword;
  }

  updateActivedSearchIndex(dir: 'ArrowUp' | 'ArrowDown'): void {
    const delta = dir === 'ArrowUp' ? -1 : 1;
    const index = (this.activedSearchIndex + delta) % this.matchedCount;
    this.activedSearchIndex = index > -1 ? index : this.matchedCount - 1;
    // TODO：需要更精确的时间（dom 更新后）
    setTimeout(() => {
      this.scrollToActivedItem();
    }, 0);
  }

  scrollToActivedItem(): void {
    const el = document.querySelector(this.matchedElClass);
    if (!el) {
      return;
    }

    // bugfix
    el.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  selectActivedItem(): void {
    if (this.matchedCount) {
      const el = document.querySelector(this.matchedElClass);
      if (!el) {
        return;
      }
      const namespaceIndex = el.getAttribute('data-namespace');
      const apiIndex = el.getAttribute('data-api');
      if (namespaceIndex && apiIndex) {
        this.handleSelect([+namespaceIndex, +apiIndex]);
      }
    }
  }

  blurInput(): void {
    this.inputRef.nativeElement.blur();
  }

  focusInput(): void {
    this.inputRef.nativeElement.focus();
  }

  handleFocus(): void {
    if (this.keyword && this.matchedCount) {
      this.showSearchResult();
    }
  }

  handleBlur(): void {
    // Trick: 当鼠标点击结果项，首先触发完 blur 会执行 reset 导致元素被隐藏，handleSelect 无法执行
    setTimeout(() => {
      // this.hideSearchResult();
    }, 500);
  }
}
