import { Injectable } from '@angular/core';

import { TypeService } from '../type/type.service';

import {
  Project,
  ProjectNamesapce,
  ProjectTag,
} from 'src/app/project/project.model';
import {
  ApiItem,
  ApiMethod,
  ApiResponses,
  ApiParameters,
  ApiResponsesValue,
  ApiResponseHeaderValue,
} from 'src/app/api/api.model';
import {
  StoreIndex,
  AnyObject,
  StoreData,
  StoreIndexKey,
} from '../../share.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProxyService } from '../proxy/proxy.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private projectExit = false;

  private DUMP_KEY = 'SWAGGER_UI_ENHANCE';

  private namespacesMap: Map<string, number> = new Map();

  private data: StoreData = {
    projects: [],
    project: {} as Project,
    namespaces: [],
    namespace: {} as ProjectNamesapce,
    apiItems: [],
    index: {
      projectIndex: 0,
      namespaceIndex: 0,
      apiIndex: 0,
    },
    expandeds: [],
  };

  private projectSubject = new Subject<StoreData>();

  sortIndex = 0;

  sortMethods!: ApiMethod[] | null;

  constructor(
    private typeService: TypeService,
    private snackBar: MatSnackBar,
    private proxy: ProxyService
  ) {
    this.loadDumpsData();

    setTimeout(() => {
      this.send();
    }, 0);
  }

  private send(): this {
    this.projectSubject.next(this.data);
    return this;
  }

  getData$(): Observable<StoreData> {
    return this.projectSubject.asObservable();
  }

  getApiItem(id: string): ApiItem | undefined {
    return this.data.apiItems.find((item) => item.__id === id);
  }

  getCurPorject(): Project {
    return this.data.project;
  }

  getCurProjectId(): string {
    return this.data.project.id;
  }

  getCurNamespaces(): ProjectNamesapce[] {
    return this.data.namespaces;
  }

  fetchProject(url: string): Promise<Object> {
    const promise = new Promise<Object>((resolve, reject) => {
      this.proxy.proxy(url, 'get').subscribe(
        (res) => {
          this.importProject(res as Project, url);
          resolve(res);
        },
        (error) => {
          this.toastMessage(`更新失败：${error.status} ${error.statusText}`);
          console.log(error);
          reject(error);
        }
      );
    });

    return promise;
  }

  parseFile(file: File): void {
    const blob = file.slice();

    blob.text().then((text) => {
      try {
        this.importProject(JSON.parse(text));
      } catch (error) {
        console.log(error);
        this.toastMessage('导入失败：解析错误');
      }
    });
  }

  importProject(project: Project, updateUrl?: string): this {
    if (updateUrl) {
      project.updateUrl = updateUrl;
    }

    this.transformProject(project);
    this.selectProject(project);

    if (!this.projectExit) {
      this.toastMessage('导入成功');
    }

    return this;
  }

  selectProject(project: Project): this {
    const projectIndex = this.data.projects.findIndex(
      (item) => item.id === project.id
    );

    if (projectIndex === -1 || this.projectExit) {
      return this;
    }

    this.projectExit = false;

    this.updateData({
      projectIndex,
      namespaceIndex: 0,
      apiIndex: 0,
    });

    return this;
  }

  transformProject(project: Project): Project {
    this.getProjectInfo(project)
      .getNamespace(project)
      .getNamespaceApis(project)
      .addProject(project);

    this.typeService.getTypes(project.id, project.definitions);

    return project;
  }

  getProjectInfo(project: Project): this {
    const { title, version } = project.info;
    const id = encodeURIComponent(title + version);

    project.display = title + ' ' + version;
    project.id = id;
    return this;
  }

  getNamespaceFromTags(project: Project): ProjectTag[] {
    const tags = new Set<string>();
    this.iterObj(project.paths, (_1: string, methods: AnyObject) => {
      this.iterObj(methods, (_2: ApiMethod, api: ApiItem) => {
        api.tags.forEach((tag: string) => tags.add(tag));
      });
    });
    return Array.from(tags).map((tag) => {
      return {
        name: tag,
        description: '--',
      };
    });
  }

  getNamespace(project: Project): this {
    this.namespacesMap.clear();
    if (!project.tags) {
      project.tags = this.getNamespaceFromTags(project);
    }
    project.namespaces = project.tags.map((tag: ProjectTag, index: number) => {
      this.namespacesMap.set(tag.name, index);
      return {
        ...tag,
        apiItems: [],
        matched: true,
      };
    });
    return this;
  }

  getNamespaceApis(project: Project): this {
    let apiIndex = 0;

    const apiItems: ApiItem[] = [];

    this.iterObj(project.paths, (url: string, methods: AnyObject) => {
      this.iterObj(methods, (method: ApiMethod, api: ApiItem) => {
        api = {
          ...api,
          __id: url + '|' + method,
          __produce: api.produces && api.produces[0],
          __info: {
            description: api.summary || '该 API 缺少描述',
            method,
            url,
            deprecated: api.deprecated,
            urlForCopy: '`' + url.replace(/\{/gi, '${') + '`',
            operationId: api.operationId,
          },
        };

        apiItems.push(api);
      });
    });

    apiItems.forEach((api: ApiItem) => {
      this.transformParameters(api.parameters).transformResponses(
        api.responses
      );

      const tags = api.tags || [];
      tags.forEach((tag: string) => {
        const index = this.namespacesMap.get(tag);

        if (index !== undefined) {
          api.__index = apiIndex++;
          project.namespaces[index].apiItems.push(api);
        }
      });
    });
    return this;
  }

  transformResponses(responses: ApiResponses = {}): this {
    this.iterObj(responses, (code: number, value: ApiResponsesValue) => {
      value.code = +code;

      if (value.headers) {
        this.iterObj(
          value.headers,
          (header: string, headerValue: ApiResponseHeaderValue) => {
            headerValue.header = header;
          }
        );
      }
    });

    return this;
  }

  transformParameters(parameters: ApiParameters[] = []): this {
    parameters.forEach((parameter) => {
      const required = parameter.required ? '' : '?';
      parameter.display = parameter.name + required;
    });

    return this;
  }

  iterObj(obj: AnyObject, cb: Function): AnyObject[] {
    return Object.keys(obj)
      .sort()
      .map((key) => cb.call(null, key, obj[key]));
  }

  filterNamespace(keyword: string): this {
    this.data.namespaces.filter((namespace) => {
      namespace.matched =
        namespace.name.includes(keyword) ||
        namespace.description.includes(keyword);
    });

    return this;
  }

  toastMessage(message: string): this {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy-snack-bar',
    });
    return this;
  }

  addProject(project: Project): this {
    // 检测 project 是否已经存在
    const projects = this.data.projects;

    this.projectExit = projects.some((item) => project.id === item.id);

    let index = projects.findIndex((item) => item.id === project.id);
    index = index !== -1 ? index : projects.length;

    projects[index] = project;
    this.dumpsData();

    if (this.projectExit) {
      this.toastMessage('导入的 API 配置已经存在，更新成功。');
    }

    return this;
  }

  removeProject(index: number): this {
    this.data.projects.splice(index, 1);
    return this;
  }

  updateData(newIndexs: Partial<StoreIndex>): this {
    const { projects, index } = this.data;

    ['projectIndex', 'namespaceIndex', 'apiIndex']
      .map((key) => [key, newIndexs[key as StoreIndexKey]])
      .filter(
        (keyIndexs) =>
          keyIndexs[1] !== undefined &&
          keyIndexs[1] !== index[keyIndexs[0] as StoreIndexKey]
      )
      .forEach((keyIndex) => {
        const key = keyIndex[0] as StoreIndexKey;
        const newIndex = keyIndex[1] as number;

        index[key] = newIndex;
      });

    const project = projects[index.projectIndex] || {};
    const namespaces = project.namespaces || [];
    const namespace = namespaces[index.namespaceIndex] || {};
    const apiItems = namespace.apiItems || [];

    this.data.project = project;
    this.data.namespaces = namespaces;
    this.data.namespace = namespace;
    this.data.apiItems = apiItems;

    if (newIndexs.namespaceIndex !== undefined) {
      this.sortMethods = null;
    }

    if (newIndexs.apiIndex !== undefined) {
      this.data.expandeds = apiItems.map((_, i) => i === newIndexs.apiIndex);
    }

    this.send();
    this.dumpsData();

    return this;
  }

  loadDumpsData(): this {
    const configString = localStorage.getItem(this.DUMP_KEY);

    if (configString) {
      const config: StoreData = JSON.parse(configString);
      this.data.projects = config.projects.map((project) =>
        this.transformProject(project)
      );
      this.data = config;
    }

    this.updateData({ ...this.data.index });

    return this;
  }

  dumpsData(): this {
    localStorage.setItem(this.DUMP_KEY, JSON.stringify(this.data));

    return this;
  }

  getSortKey(): string {
    if (!this.sortMethods) {
      this.sortMethods = Array.from(
        new Set(this.data.apiItems.map((item) => item.__info.method))
      );
    }

    if (this.sortIndex >= this.sortMethods.length) {
      this.sortIndex = 0;
    }

    const sortKey = this.sortMethods[this.sortIndex];

    return sortKey;
  }

  sortApiItems(): void {
    const sortKey = this.getSortKey();

    this.data.apiItems.sort((a, b) => {
      const aMethod = a.__info.method === sortKey;
      const bMethod = b.__info.method === sortKey;
      return aMethod === bMethod ? 0 : aMethod > bMethod ? -1 : 1;
    });
    this.sortIndex++;
    this.send();
  }
}
