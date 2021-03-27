import {
  ApiItem,
  ApiMethod,
  AuthInfo,
  Item,
  Schema,
} from 'src/app/api/api.model';
import { GObject } from '../share/share.model';

export interface Project {
  updateUrl: string; // 用于更新
  definitions: ProjectDefinition;
  basePath: string;
  host: string;
  info: ProjectInfo;
  paths: ProjectPath;
  schemes: string[];
  swagger: string;
  tags: ProjectTag[];

  id: string;
  display: string;
  namespaces: ProjectNamesapce[];
  auth: AuthInfo;
  apiUrl: string;
}

export type ProjectDefinition = GObject<ProjectDefinitionValue>;

export interface ProjectDefinitionValue {
  properties: PropertieItem;
  required: string[];
  type: string;
}

export type PropertieItem = GObject<PropertieItemValue>;

export interface PropertieItemValue {
  type: string;
  format: string;
  description: string;
  enum: string[];
  example: string;
  schema?: Schema;
  $ref?: string;
  items?: Item;
  display: string;
}

export interface ProjectInfo {
  description: string;
  version: string;
  title: string;
}

export interface ProjectTag {
  id?: string;
  name: string;
  description: string;
}

export interface ProjectNamesapce extends ProjectTag {
  apiItems: ApiItem[];
  matched?: boolean;
}

export type ProjectPath = GObject<ProjectPathValue>;

export type ProjectPathValue = {
  [key in ApiMethod]: ApiItem;
};
