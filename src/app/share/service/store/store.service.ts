import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  StorePayload,
  StoreObject,
  StoreCache,
  StoreData,
} from '../../store.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private projectExit = false;

  private DUMP_KEY = 'SWAGGER_UI_ENHANCE';

  // tslint:disable-next-line: variable-name
  private _projects: Project[] = [];

  public get projects(): Project[] {
    return this._projects;
  }

  // tslint:disable-next-line: variable-name
  private _expandeds: boolean[] = [true];

  public get expandeds(): boolean[] {
    return this._expandeds;
  }

  private namespacesMap: Map<string, number> = new Map();

  private index: StorePayload = {
    projectIndex: 0,
    namespaceIndex: 0,
    apiIndex: 0,
  };

  private cache: StoreCache = {} as StoreCache;

  get projectIndex(): number {
    return this.index.projectIndex;
  }

  get namespaceIndex(): number {
    return this.index.namespaceIndex;
  }

  get apiIndex(): number {
    return this.index.apiIndex;
  }

  constructor(
    private http: HttpClient,
    private typeService: TypeService,
    private snackBar: MatSnackBar
  ) {
    // this.store.fetchProject('assets/api-docs.json');
    this.loadDumpsData();
  }

  fetchProject(url: string): void {
    this.http.get(url).subscribe((res) => {
      this.importProject(res as Project);
    });
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

  importProject(project: Project): this {
    this.transformProject(project);
    this.selectProject(project);

    if (!this.projectExit) {
      this.toastMessage('导入成功');
    }

    return this;
  }

  selectProject(project: Project): this {
    const projects = this.projects;
    const projectIndex = projects.findIndex((item) => item.id === project.id);

    if (projectIndex === -1 || this.projectExit) {
      return this;
    }

    this.projectExit = false;
    this.dispatch('CHANGE_INDEX', {
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

  getNamespaceFromTags(project: Project): this {
    return this;
  }

  getNamespace(project: Project): this {
    this.namespacesMap.clear();
    if (!project.tags) {
      const tags = new Set<string>();
      this.iterObj(project.paths, (_1: string, methods: StoreObject) => {
        this.iterObj(methods, (_2: ApiMethod, api: ApiItem) => {
          api.tags.forEach((tag: string) => tags.add(tag));
        });
      });
      project.tags = Array.from(tags).map((tag) => {
        return {
          name: tag,
          description: '--',
        };
      });
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

    this.iterObj(project.paths, (url: string, methods: StoreObject) => {
      this.iterObj(methods, (method: ApiMethod, api: ApiItem) => {
        api = {
          ...api,
          __id: url + '|' + method,
          __produce: api.produces && api.produces[0],
          __info: {
            description: api.summary,
            method,
            url,
            urlForCopy: '`' + url.replace(/\{/gi, '${') + '`',
          },
        };

        apiItems.push(api);
      });
    });

    apiItems.forEach((api: ApiItem) => {
      this.transformParameters(api.parameters).transformResponses(
        api.responses
      );

      api.tags.forEach((tag: string) => {
        const index = this.namespacesMap.get(tag);

        if (index !== undefined) {
          api.__index = apiIndex++;
          project.namespaces[index].apiItems.push(api);
        }
      });
    });
    return this;
  }

  transformResponses(responses: ApiResponses): this {
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

  iterObj(obj: StoreObject, cb: Function): StoreObject[] {
    return Object.keys(obj)
      .sort()
      .map((key) => cb.call(null, key, obj[key]));
  }

  filterNamespace(keyword: string): this {
    this.getCurNamespaces().filter((namespace) => {
      namespace.matched =
        namespace.name.includes(keyword) ||
        namespace.description.includes(keyword);
    });

    return this;
  }

  toastMessage(message: string): this {
    this.snackBar.open(message, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy-snack-bar',
    });
    return this;
  }

  addProject(project: Project): this {
    // 检测 project 是否已经存在
    this.projectExit = this.projects.some((item) => project.id === item.id);

    let index = this.projects.findIndex((item) => item.id === project.id);
    index = index !== -1 ? index : this.projects.length;

    this.projects[index] = project;
    this.dumpsData();

    if (this.projectExit) {
      this.toastMessage('导入的 API 配置已经存在');
    }

    return this;
  }

  removeProject(index: number): this {
    this.projects.splice(index, 1);

    return this;
  }

  getCurProject(useCache = true): Project {
    if (useCache && this.cache.project) {
      return this.cache.project;
    }

    return this.projects[this.projectIndex] || ({} as Project);
  }

  getCurNamespaces(): ProjectNamesapce[] {
    return this.cache.namespaces || this.getCurProject().namespaces || [];
  }

  getCurNamespace(): ProjectNamesapce {
    return (
      this.cache.namespace ||
      this.getCurNamespaces()[this.namespaceIndex] ||
      ({} as ProjectNamesapce)
    );
  }

  getCurNamespaceApiItems(): ApiItem[] {
    return this.cache.apiItems || this.getCurNamespace().apiItems || [];
  }

  updateCache(): this {
    const project = this.getCurProject(false);
    const namespaces = project.namespaces;
    const namespace = namespaces[this.index.namespaceIndex];

    this.cache = {
      project,
      namespaces,
      namespace,
      apiItems: namespace.apiItems,
    };

    this._expandeds = namespace.apiItems.map(
      (_, index) => index === this.index.apiIndex
    );

    this.dumpsData();

    return this;
  }

  dispatch(name: string, payload: Partial<StorePayload> = {}): this {
    switch (name) {
      case 'CHANGE_INDEX':
        this.index = {
          ...this.index,
          ...payload,
        };
        break;
      default:
        break;
    }

    this.updateCache();

    return this;
  }

  loadDumpsData(): this {
    const configString = localStorage.getItem(this.DUMP_KEY);

    if (configString) {
      const config: StoreData = JSON.parse(configString);
      this._projects = config.projects.map((project) =>
        this.transformProject(project)
      );
      this.cache = config.cache;
      this.index = config.index;
      this._expandeds = config.expandeds;
    }

    return this;
  }

  dumpsData(): this {
    const data: StoreData = {
      projects: this.projects,
      cache: this.cache,
      index: this.index,
      expandeds: this.expandeds,
    };

    localStorage.setItem(this.DUMP_KEY, JSON.stringify(data));

    return this;
  }
}
