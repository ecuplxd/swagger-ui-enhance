import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.less'],
})
export class SimpleTableComponent implements OnInit {
  @Input() headers: string[] = [];

  @Input() keys: string[] = [];

  // tslint:disable-next-line: no-any
  @Input() datas: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
