import { Component, Input, OnInit } from '@angular/core';
import { TYPE_MAP } from 'src/app/share/const';
import { ApiResponses } from '../api.model';

@Component({
  selector: 'app-api-response',
  templateUrl: './api-response.component.html',
  styleUrls: ['./api-response.component.less'],
})
export class ApiResponseComponent implements OnInit {
  @Input() responses: ApiResponses = {};

  @Input() produce = 'application/json';

  @Input() produces: string[] = [];

  types = TYPE_MAP;

  get responsesEmpty(): boolean {
    return !this.responses || Object.keys(this.responses).length === 0;
  }

  constructor() {}

  ngOnInit(): void {}
}
