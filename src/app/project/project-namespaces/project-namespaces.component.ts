import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ProjectNamesapce } from '../project.model';
import { StoreService } from 'src/app/share/service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-project-namespaces',
  templateUrl: './project-namespaces.component.html',
  styleUrls: ['./project-namespaces.component.less'],
})
export class ProjectNamespacesComponent implements OnInit, AfterViewInit {
  // https://angular.io/api/core/ViewChildren#description
  // https://angular.io/api/core/QueryList
  @ViewChildren('apis') apis!: QueryList<ElementRef>;

  @ViewChild('inputRef') inputRef!: ElementRef;

  @Input() namespaces: ProjectNamesapce[] = [];

  keyword = '';

  activedIndex!: number;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getData$().subscribe((data) => {
      this.activedIndex = data.index.namespaceIndex;
    });
  }

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    fromEvent(this.inputRef.nativeElement as HTMLInputElement, 'input')
      .pipe(
        filter(() => !!this.keyword),
        debounceTime(500),
        distinctUntilChanged()
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
