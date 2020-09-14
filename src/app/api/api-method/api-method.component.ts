import { Component, Input, OnInit } from '@angular/core';
import { COLORS } from 'src/app/share/const';
import { ApiMethod } from '../api.model';

@Component({
  selector: 'app-api-method',
  templateUrl: './api-method.component.html',
  styleUrls: ['./api-method.component.less'],
})
export class ApiMethodComponent implements OnInit {
  @Input() showMethod = true;

  @Input() method!: ApiMethod;

  colors = COLORS;

  constructor() {}

  ngOnInit(): void {}
}
