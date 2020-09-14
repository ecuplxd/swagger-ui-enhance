import { Component, OnInit, Input } from '@angular/core';
import { IdService } from 'src/app/share/service';

import { ApiParameters } from '../api.model';

@Component({
  selector: 'app-api-parameter',
  templateUrl: './api-parameter.component.html',
  styleUrls: ['./api-parameter.component.less'],
})
export class ApiParameterComponent implements OnInit {
  @Input() parameters: ApiParameters[] = [];

  copyItemClass!: string;

  constructor(private idService: IdService) {
    this.copyItemClass = this.idService.genID();
  }

  ngOnInit(): void {}
}
