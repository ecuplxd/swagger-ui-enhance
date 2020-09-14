import { Component, OnInit, Input } from '@angular/core';
import { PropertieItemValue } from 'src/app/project/project.model';
import { TypeService, IdService, StoreService } from 'src/app/share/service';
import { ApiParameters, ApiResponsesValue } from '../api.model';

@Component({
  selector: 'app-api-type',
  templateUrl: './api-type.component.html',
  styleUrls: ['./api-type.component.less'],
})
export class ApiTypeComponent implements OnInit {
  @Input() parameter!: ApiParameters | PropertieItemValue | ApiResponsesValue;

  type = '';

  refType = false;

  enumType = false;

  showTypeDetail = false;

  openOnHover = true;

  code = '';

  parameterID!: string;

  get id(): string {
    if (this.parameter.display) {
      return (
        this.parameter.display +
        (this.type ? ': ' + (this.refType ? '' : this.type) : '')
      );
    }
    return '';
  }

  constructor(
    private typeService: TypeService,
    private idService: IdService,
    private store: StoreService
  ) {
    this.parameterID = this.idService.genID();
  }

  ngOnInit(): void {
    // tslint:disable-next-line: no-any
    this.type = this.typeService.getType(
      this.parameter as ApiParameters | PropertieItemValue
    );
    this.enumType = this.type.includes('|');
    this.refType = this.typeService.refType;
  }

  lazyGetType(): void {
    if (this.refType && !this.code) {
      const projectId = this.store.getCurProject().id;
      this.code = this.typeService.getExports(projectId, this.type);
    }
  }

  close(): void {
    this.showTypeDetail = false;
  }
}
