import { Component, OnInit, Input } from '@angular/core';
import { Any } from '../../share.model';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.less'],
})
export class SimpleTableComponent implements OnInit {
  @Input() headers: string[] = [];

  @Input() keys: string[] = [];

  @Input() datas: Any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
