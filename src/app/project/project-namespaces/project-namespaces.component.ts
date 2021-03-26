import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NAMESPACE_ID_PREFIX } from 'src/app/share/const';
import { ScrollInoViewService, StoreService } from 'src/app/share/service';
import { ProjectNamesapce } from '../project.model';

@Component({
  selector: 'app-project-namespaces',
  templateUrl: './project-namespaces.component.html',
  styleUrls: ['./project-namespaces.component.less'],
})
export class ProjectNamespacesComponent implements OnInit, AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef;

  @Input() namespaces: ProjectNamesapce[] = [];

  @Input() expand = true;

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
      this.scroll.to(this.ID_PREFIX + this.activedIndex);
    });
  }

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    fromEvent(this.inputRef.nativeElement as HTMLInputElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.filterNamespaces();
      });
  }

  select(namespaceIndex: number): void {
    this.store.updateData({
      namespaceIndex,
      apiIndex: 0,
    });
  }

  filterNamespaces(): void {
    this.store.filterNamespace(this.keyword);
  }
}
