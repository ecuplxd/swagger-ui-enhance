import { Observable, of } from 'rxjs';
import { Project } from 'src/app/project/project.model';
import { StoreData } from 'src/app/share/share.model';

export const storeDataEmptyMock: StoreData = {
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

export class StoreServiceStub {
  getData$(): Observable<StoreData> {
    return of(storeDataEmptyMock);
  }
}
