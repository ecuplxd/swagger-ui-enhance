import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryService } from 'src/app/share/service';
import { DialogService } from 'src/app/share/service/dialog/dialog.service';
import { RequestHistory } from 'src/app/share/service/history/history.model';
import { ApiItem } from '../../api.model';

@Component({
  selector: 'app-api-request-history',
  templateUrl: './api-request-history.component.html',
  styleUrls: ['./api-request-history.component.less'],
})
export class ApiRequestHistoryComponent implements OnInit {
  @Input() apiItem!: ApiItem;

  @Input() outlined = true;

  @Input() fromRequest = false;

  @Output() selectHistory = new EventEmitter<RequestHistory>();

  historys: RequestHistory[] = [];

  empty = false;

  constructor(
    private historyService: HistoryService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  getHistory(): void {
    this.historys = this.historyService.get(this.apiItem.__id);
    this.empty = this.historys.length === 0;
  }

  request(history: RequestHistory): void {
    if (this.fromRequest) {
      this.selectHistory.emit(history);
      return;
    }

    this.dialogService.openRequestDialog(this.apiItem, history);
  }
}
