import { ApiMethod, ApiItem, Schema, Item } from 'src/app/api/api.model';

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
}

export interface ProjectDefinition {
  [key: string]: ProjectDefinitionValue;
}

export interface ProjectDefinitionValue {
  properties: PropertieItem;
  required: string[];
  type: string;
}

export interface PropertieItem {
  [key: string]: PropertieItemValue;
}

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
  name: string;
  description: string;
}

export interface ProjectNamesapce extends ProjectTag {
  apiItems: ApiItem[];
  matched?: boolean;
}

export interface ProjectPath {
  [key: string]: ProjectPathValue;
}

export type ProjectPathValue = {
  [key in ApiMethod]: ApiItem;
};
