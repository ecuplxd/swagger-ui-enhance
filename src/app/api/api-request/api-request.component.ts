import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { ApiItem } from '../api.model';

@Component({
  selector: 'app-api-request',
  templateUrl: './api-request.component.html',
  styleUrls: ['./api-request.component.less'],
})
export class ApiRequestComponent implements OnInit {
  @Input() apiId!: string;

  @Input() apiItem!: ApiItem;

  @Input() showHistory = true;

  constructor(
    private dialogService: DialogService,
    private store: StoreService
  ) {}

  ngOnInit(): void {}

  request(): void {
    const apiItem = this.apiItem || this.store.getApiItem(this.apiId);
    this.dialogService.openRequestDialog(apiItem);
  }
}
