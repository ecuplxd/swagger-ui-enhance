import { ApiItem } from '../api/api.model';
import { Project, ProjectNamesapce } from '../project/project.model';

export interface StorePayload {
  projectIndex: number;
  namespaceIndex: number;
  apiIndex: number;
}

export interface StoreCache {
  project: Project;
  namespaces: ProjectNamesapce[];
  namespace: ProjectNamesapce;
  apiItems: ApiItem[];
}

export interface StoreObject {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

export interface StoreData {
  projects: Project[];
  cache: StoreCache;
  index: StorePayload;
  expandeds: boolean[];
}
