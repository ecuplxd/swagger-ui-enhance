import { Component, Input, OnInit } from '@angular/core';
import { ApiMethod } from '../api.model';

@Component({
  selector: 'app-api-method',
  templateUrl: './api-method.component.html',
  styleUrls: ['./api-method.component.less'],
})
export class ApiMethodComponent implements OnInit {
  @Input() deprecated = false;

  @Input() showMethod = true;

  @Input() method!: ApiMethod;

  constructor() {}

  ngOnInit(): void {}
}
