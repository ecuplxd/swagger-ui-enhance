import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiResponses } from '../api.model';
import { MatSelectChange } from '@angular/material/select';
import { TYPE_MAP } from 'src/app/share/const';

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

  constructor() {}

  ngOnInit(): void {}

  handleSelectChange(sel: MatSelectChange): void {}
}
