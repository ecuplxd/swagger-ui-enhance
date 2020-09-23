import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectNamesapce } from 'src/app/project/project.model';

@Component({
  selector: 'app-api-search-result',
  templateUrl: './api-search-result.component.html',
  styleUrls: ['./api-search-result.component.less'],
})
export class ApiSearchResultComponent implements OnInit {
  @Input() namespaces: ProjectNamesapce[] = [];

  @Input() actived = 0;

  @Output() selectApi = new EventEmitter<number[]>();

  constructor() {}

  ngOnInit(): void {}

  select(namespaceIndex: number, apiIndex: number): void {
    this.selectApi.emit([namespaceIndex, apiIndex]);
  }
}
