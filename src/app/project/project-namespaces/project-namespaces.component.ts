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
import { debounceTime, filter } from 'rxjs/operators';

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

  get activedIndex(): number {
    return this.store.namespaceIndex;
  }

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    fromEvent(this.inputRef.nativeElement as HTMLInputElement, 'input')
      .pipe(
        debounceTime(500),
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
