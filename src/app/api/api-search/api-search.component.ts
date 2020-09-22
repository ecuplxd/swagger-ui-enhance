import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProjectNamesapce } from 'src/app/project/project.model';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
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

  keywords = '';

  keyword = '';

  filterMethod = '';

  MATCHED_EL_CLASS = '.suggestion-item.actived';

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

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService
  ) {}

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
          if (!this.keywords) {
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

  getMatched(str: string = '', type: string = ''): string {
    if (!str) {
      return '';
    }

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
    const props = ['method', 'url', 'description', 'operationId'];

    this.splitKeyWord();

    namespaces.forEach((namespace) => {
      const { name, description } = namespace;
      namespace.name = this.getMatched(name, 'title');
      namespace.description = this.getMatched(description);
      namespace.matched = name.includes('span') || description.includes('span');

      namespace.apiItems
        .filter((api) => api.__info.method.includes(this.filterMethod))
        .forEach((api) => {
          api.__info.method = api.__info.method.toUpperCase() as ApiMethod;

          props.forEach((prop) => {
            api.__info[prop] = this.getMatched(api.__info[prop]);
          });

          api.__matched = props.some((prop) =>
            api.__info[prop].includes('span')
          );
          api.__matchedIndex = api.__matched ? this.matchedCount++ : -1;
        });

      // TODO: 可以选择匹配的 namespace
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

    this.store.updateData({
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

    if (resetKeyword) {
      this.keywords = '';
      this.keyword = '';
      this.filterMethod = '';
    } else {
      this.splitKeyWord();
    }
  }

  splitKeyWord(): void {
    const keywords = this.keywords.split(' ');

    this.keyword = keywords[0];
    this.filterMethod = keywords[1] || '';
  }

  updateActivedSearchIndex(dir: 'ArrowUp' | 'ArrowDown'): void {
    const delta = dir === 'ArrowUp' ? -1 : 1;
    const index = (this.activedSearchIndex + delta) % this.matchedCount;

    this.activedSearchIndex = index > -1 ? index : this.matchedCount - 1;
    this.scrollToActivedItem();
  }

  scrollToActivedItem(): void {
    this.scroll.to('', 'nearest', this.MATCHED_EL_CLASS);
  }

  selectActivedItem(): void {
    if (this.matchedCount) {
      const el = document.querySelector(this.MATCHED_EL_CLASS);

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
    if (this.keywords && this.matchedCount) {
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
