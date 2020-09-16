import { ApiItem } from '../api/api.model';
import { Project, ProjectNamesapce } from '../project/project.model';

export interface StoreIndex {
  projectIndex: number;
  namespaceIndex: number;
  apiIndex: number;
  [key: string]: number;
}

export interface StoreData {
  projects: Project[];
  project: Project;
  namespaces: ProjectNamesapce[];
  namespace: ProjectNamesapce;
  apiItems: ApiItem[];
  index: StoreIndex;
  expandeds: boolean[];
}

export interface StoreObject {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}
