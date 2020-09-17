import { ApiItem } from '../api/api.model';
import { Project, ProjectNamesapce } from '../project/project.model';

export interface StoreIndex {
  projectIndex: number;
  namespaceIndex: number;
  apiIndex: number;
}

export type StoreIndexKey = 'projectIndex' | 'namespaceIndex' | 'apiIndex';

export interface StoreData {
  projects: Project[];
  project: Project;
  namespaces: ProjectNamesapce[];
  namespace: ProjectNamesapce;
  apiItems: ApiItem[];
  index: StoreIndex;
  expandeds: boolean[];
}

// 使用泛型定义
export interface GObject<T> {
  [key: string]: T;
}

export type AnyObject = GObject<Any>;
export type BoolObject = GObject<boolean>;
export type NumberObject = GObject<number>;
export type StringObject = GObject<string>;
export type StringsObject = GObject<string[]>;
export type ObjectObject = GObject<ObjectObject>;

// tslint:disable-next-line: no-any
export type Any = any;
