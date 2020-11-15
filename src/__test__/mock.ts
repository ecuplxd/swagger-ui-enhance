import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/project/project.model';
import { StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';
import { STORE_DATA_MOCK } from './storeData';

export const STORE_DATA_EMPTY_MOCK: StoreData = {
  projects: [],
  project: {} as Project,
  namespaces: [],
  namespace: {
    name: 'name',
    description: 'description',
    apiItems: [],
    matched: true,
  },
  apiItems: [],
  expandeds: [],
  index: {
    projectIndex: 0,
    namespaceIndex: 0,
    apiIndex: 1,
  },
};

@Injectable()
export class StoreServiceStub extends StoreService {
  setMockData(data: StoreData): this {
    // tslint:disable-next-line: no-string-literal
    this['data'] = data;

    return this;
  }

  useEmptyData(): this {
    this.setMockData(STORE_DATA_EMPTY_MOCK).init();

    return this;
  }

  useNotEmptyData(): this {
    this.setMockData(STORE_DATA_MOCK).init();

    return this;
  }

  getData$(): Observable<StoreData> {
    // tslint:disable-next-line: no-string-literal
    return of(this['data']);
  }

  useProject(index: number): this {
    this.updateData({
      projectIndex: index,
    });

    return this;
  }
}
