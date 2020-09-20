import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ProjectNamesapce } from '../project.model';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { NAMESPACE_ID_PREFIX } from 'src/app/share/const';

@Component({
  selector: 'app-project-namespaces',
  templateUrl: './project-namespaces.component.html',
  styleUrls: ['./project-namespaces.component.less'],
})
export class ProjectNamespacesComponent implements OnInit, AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef;

  @Input() namespaces: ProjectNamesapce[] = [];

  keyword = '';

  activedIndex!: number;

  ID_PREFIX = NAMESPACE_ID_PREFIX;

  constructor(
    private store: StoreService,
    private scroll: ScrollInoViewService
  ) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data) => {
      this.activedIndex = data.index.namespaceIndex;

      setTimeout(() => {
        this.scroll.to(this.ID_PREFIX + this.activedIndex);
      }, 0);
    });
  }

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    fromEvent(this.inputRef.nativeElement as HTMLInputElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => !!this.keyword)
      )
      .subscribe(() => {
        this.filterNamespaces();
      });
  }

  select(namespaceIndex: number): void {
    this.store.dispatch('CHANGE_INDEX', {
      namespaceIndex,
      apiIndex: 0,
    });
  }

  filterNamespaces(): void {
    this.store.filterNamespace(this.keyword);
  }
}
