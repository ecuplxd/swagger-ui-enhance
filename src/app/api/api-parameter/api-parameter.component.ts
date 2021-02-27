import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdService } from 'src/app/share/service';
import { ApiParameters } from '../api.model';

@Component({
  selector: 'app-api-parameter',
  templateUrl: './api-parameter.component.html',
  styleUrls: ['./api-parameter.component.less'],
})
export class ApiParameterComponent implements OnInit {
  @Input() parameters: ApiParameters[] = [];

  @Output() genId = new EventEmitter<string>();

  copyItemClass!: string;

  hadParameters = true;

  constructor(private idService: IdService) {
    this.copyItemClass = this.idService.genID();
  }

  ngOnInit(): void {
    this.hadParameters = this.parameters && this.parameters.length !== 0;
    this.genId.emit(this.copyItemClass);
  }
}
