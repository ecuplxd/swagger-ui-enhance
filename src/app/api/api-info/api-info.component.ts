import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { ApiInfo } from '../api.model';

@Component({
  selector: 'app-api-info',
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.less'],
})
export class ApiInfoComponent implements OnInit {
  @HostBinding('class') get className(): string {
    return this.twoLine ? 'two-line align-center' : '';
  }

  /* Api 信息 */
  @Input() api!: ApiInfo;

  @Input() showMethod = true;

  @Input() showUrl = true;

  @Input() showDescription = true;

  @Input() twoLine = false;

  /* 是否可复制内容 */
  @Input() copyable = true;

  constructor() {}

  ngOnInit(): void {}
}
