import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/api/api.model';
import { GObject } from '../../share.model';
import { RequestHistory } from './history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historys: GObject<RequestHistory[]> = {};

  constructor() {}

  // TODO
  load(): void {}

  // TODO
  dump(): void {}

  add(
    apiId: string,
    url: string,
    urlParams: ApiUrl[],
    editorValue: string = ''
  ): void {
    const historyItem: RequestHistory = {
      name: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      url,
      urlParams: JSON.parse(JSON.stringify(urlParams)),
      editorValue,
    };

    if (!this.historys[apiId]) {
      this.historys[apiId] = [historyItem];
      return;
    }

    this.historys[apiId].push(historyItem);
  }

  get(apiId: string): RequestHistory[] {
    const historys = this.historys[apiId] || [];
    return historys;
  }

  getHistoryByName(
    appId: string,
    name: string = ''
  ): RequestHistory | undefined {
    return this.get(appId).find((item) => item.name === name);
  }
}
