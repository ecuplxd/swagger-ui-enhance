import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import {
  ApiItem,
  ApiMethod,
  ApiParameters,
  ApiResponseHeaderValue,
  ApiResponses,
  ApiResponsesValue,
  API_METHODS,
  AuthInfo,
} from 'src/app/api/api.model';
import {
  Project,
  ProjectNamesapce,
  ProjectTag,
} from 'src/app/project/project.model';
import {
  Any,
  AnyObject,
  StoreData,
  StoreIndex,
  StoreIndexKey,
} from '../../share.model';
import { ProxyService } from '../proxy/proxy.service';
import { TranslateService } from '../tr/translate.service';
import { TypeService } from '../type/type.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private projectExit = false;

  private DUMP_KEY = 'SWAGGER_UI_ENHANCE';

  private DEAFULT_NAMESPACE = '__default__';

  private FAVORITE_NAMESPACE = '__favorite__';

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
    useProxy: false,
  };

  private favoriteAPI: Set<string> = new Set();

  private projectSubject$$ = new Subject<StoreData>();

  // TODO
  parseLogs: string[] = [];

  sortIndex = 0;

  sortMethods!: ApiMethod[] | null;

  favoriteNamespace: ProjectNamesapce = {
    id: this.FAVORITE_NAMESPACE,
    name: 'Favorite',
    description: 'Favorite',
    apiItems: [],
    matched: true,
  };

  get favoriteEmpty(): boolean {
    return this.favoriteNamespace.apiItems.length === 0;
  }

  constructor(
    private typeService: TypeService,
    private snackBar: MatSnackBar,
    private proxy: ProxyService,
    private tr: TranslateService,
    private location: Location
  ) {
    this.loadDumpsData();
  }

  private send(): this {
    this.projectSubject$$.next(this.data);
    return this;
  }

  init(): this {
    this.send();
    return this;
  }

  getData$(): Observable<StoreData> {
    return this.projectSubject$$.asObservable();
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

  getCurApiItem(): ApiItem | undefined {
    const {
      apiItems,
      index: { apiIndex },
    } = this.data;
    const apiItem = apiItems[apiIndex];

    return apiItem;
  }

  isPorxyMode(): boolean {
    return this.data.useProxy;
  }

  fetchProject(url: string): Promise<Object> {
    const promise = new Promise<Object>((resolve, reject) => {
      this.proxy
        .proxy(url, 'get', undefined, undefined, undefined, this.isPorxyMode())
        .subscribe(
          (res) => {
            this.importProject(res as Project, url);
            resolve(res);
          },
          (error) => {
            const msg = this.tr.tr('update-fail', '更新失败：');

            this.toastMessage(`${msg}${error.status} ${error.statusText}`);
            reject(error);
          }
        );
    });

    return promise;
  }

  parseFile(file: File): Promise<Any> {
    const promise = new Promise((resolve, reject) => {
      const prefix = this.tr.tr('import-fail', '导入失败：');
      let reason = this.tr.tr('unknown-file-type', '未知的文件类型');

      let errorMessage = prefix + reason;

      if (!file.type) {
        this.toastMessage(errorMessage);
        reject(errorMessage);
        return;
      }

      if (file.type !== 'application/json') {
        reason = this.tr.tr('unknown-file-type', '请导入 JSON 文件');
        errorMessage = prefix + reason;
        this.toastMessage(errorMessage);
        reject(errorMessage);

        return;
      }

      const blob = file.slice();

      blob.text().then((text) => {
        try {
          this.importProject(JSON.parse(text));
          resolve(true);
        } catch (error) {
          reason = this.tr.tr('parse-json-error', '解析错误');
          errorMessage = prefix + reason;
          this.toastMessage(errorMessage);
          reject(errorMessage);
        }
      });
    });

    return promise;
  }

  importProject(project: Project, updateUrl?: string): this {
    if (updateUrl) {
      project.updateUrl = updateUrl;
    }

    this.transformProject(project);
    this.projectExit = false;
    this.selectProject(project);
    this.toastImportResult();

    return this;
  }

  toastImportResult(): this {
    if (!this.projectExit) {
      const msg = this.tr.tr('import-success', '导入成功');
      this.toastMessage(msg);
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
      namespaceIndex: this.favoriteEmpty ? 1 : 0,
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

  resolveApiTag(api: ApiItem, tags: Set<string>): ApiItem {
    if (this.noTag(api.tags)) {
      api.tags = [this.DEAFULT_NAMESPACE];
    }

    api.tags.forEach((tag: string) => tags.add(tag));

    return api;
  }

  getNamespaceFromTags(project: Project): ProjectTag[] {
    const tags = new Set<string>();

    this.iterObj(project.paths, (_1: string, methods: AnyObject) =>
      this.iterObj(methods, (_2: ApiMethod, api: ApiItem) =>
        this.resolveApiTag(api, tags)
      )
    );

    return Array.from(tags).map((tag) => this.transformTag(tag));
  }

  getNamespace(project: Project): this {
    this.namespacesMap.clear();

    if (!project.tags || project.tags.length === 0) {
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
    const apiItems: ApiItem[] = [];

    this.iterObj(project.paths, (url: string, methods: AnyObject) => {
      this.iterObj(methods, (method: ApiMethod, api: ApiItem) => {
        // 处理不合法的请求方法
        if (API_METHODS.includes(method)) {
          const apiItem = this.transformApi(api, method, url);

          apiItems.push(apiItem);

          if (apiItem.__favorite) {
            this.favoriteNamespace.apiItems.push(apiItem);
          }
        }
      });
    });

    let apiIndex = 0;
    apiItems.forEach((api: ApiItem) => {
      this.transformParameters(api.parameters).transformResponses(
        api.responses
      );

      apiIndex = this.addApiIntoNamespace(project, api, apiIndex);
    });
    return this;
  }

  addApiIntoNamespace(
    project: Project,
    api: ApiItem,
    apiIndex: number
  ): number {
    this.getApiTags(api).forEach((tag: string) => {
      const index = this.namespacesMap.get(tag);

      if (index !== undefined) {
        api.__index = apiIndex++;
        project.namespaces[index].apiItems.push(api);
      }
    });

    return apiIndex;
  }

  getApiTags(api: ApiItem): string[] {
    return api.tags || [];
  }

  noTag(tags: string[]): boolean {
    return !tags || tags.length === 0;
  }

  transformApi(api: ApiItem, method: ApiMethod, url: string): ApiItem {
    const apiId = url + '|' + method;

    return {
      ...api,
      __id: apiId,
      __produce: api.produces && api.produces[0],
      __info: {
        description:
          api.summary || this.tr.tr('api-loss-description', '该 API 缺少描述'),
        method,
        url,
        deprecated: api.deprecated,
        urlForCopy: '`' + url.replace(/\{/gi, '${') + '`',
        operationId: api.operationId,
      },
      __favorite: this.favoriteAPI.has(apiId),
      matched: true,
    };
  }

  transformTag(tag: string): ProjectTag {
    return {
      name: tag,
      description:
        tag === this.DEAFULT_NAMESPACE
          ? this.tr.tr('project-default-namespace', '默认 namespace')
          : '--',
    };
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

  setProjectAuth(auth: AuthInfo, useProxy: boolean): void {
    this.data.project.auth = auth;
    this.data.useProxy = useProxy;
    this.data.project.apiUrl = auth.apiUrl;
    this.toastMessage(this.tr.tr('save-success', '保存成功'));
    this.dumpsData();

    document.cookie = '';
    auth.cookie.forEach(
      (item) => (document.cookie = item.key + '=' + item.value)
    );
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
      this.toastMessage(
        this.tr.tr('project-exits', '导入的 API 配置已经存在，更新成功。')
      );
    }

    return this;
  }

  removeProject(index: number): this {
    this.data.projects.splice(index, 1);
    this.updateData({
      projectIndex: 0,
      namespaceIndex: this.favoriteEmpty ? 1 : 0,
      apiIndex: 0,
    });

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
    this.updateUrl(newIndexs.apiIndex);

    return this;
  }

  apiFavoriteIndex(id: string): number {
    return this.favoriteNamespace.apiItems.findIndex((api) => api.__id === id);
  }

  toggleFavorite(apiIndex: number): void {
    const apiItem = this.data.apiItems[apiIndex];

    if (apiItem) {
      const id = apiItem.__id;

      apiItem.__favorite = !apiItem.__favorite;

      if (apiItem.__favorite) {
        this.favoriteAPI.add(id);
        this.favoriteNamespace.apiItems.push(apiItem);
      } else {
        this.favoriteAPI.delete(id);
        this.favoriteNamespace.apiItems.splice(this.apiFavoriteIndex(id), 1);
      }

      this.send();
      this.dumpsData();
    }
  }

  updateUrl(apiIndex: number = 0): void {
    const { projectIndex: i, namespaceIndex: j } = this.data.index;
    const apiItem = this.data.apiItems[apiIndex];

    if (!apiItem) {
      return;
    }

    const operationId = apiItem.__info.operationId;

    this.data.index.apiIndex = apiIndex;
    this.location.replaceState(`index#${operationId}-${i}-${j}-${apiIndex}`);
  }

  getIndexFromUrl(): StoreIndex {
    const hash = location.hash;

    if (hash) {
      const [projectIndex, namespaceIndex, apiIndex] = hash
        .split('-')
        .slice(1)
        .map((item) => parseInt(item, 10) || 0);

      this.data.index.projectIndex = projectIndex;
      this.data.index.namespaceIndex = namespaceIndex;
      this.data.index.apiIndex = apiIndex;
    }

    return this.data.index;
  }

  addFavoriteNamespace(): void {
    this.data.projects.forEach((project) => {
      project.namespaces.unshift(this.favoriteNamespace);
    });
  }

  loadDumpsData(): this {
    const configString = localStorage.getItem(this.DUMP_KEY);

    if (configString) {
      const config: StoreData = JSON.parse(configString);

      this.favoriteAPI = new Set(config.favoriteAPI || []);

      this.data.projects = config.projects.map((project) =>
        this.transformProject(project)
      );
      this.addFavoriteNamespace();
      this.data = config;
    }

    this.getIndexFromUrl();
    this.updateData({ ...this.data.index });

    return this;
  }

  dumpsData(): this {
    const data: Any = Object.assign({}, this.data);

    delete data.project;
    delete data.namespaces;
    delete data.namespace;
    delete data.apiItems;

    data.favoriteAPI = Array.from(this.favoriteAPI);

    localStorage.setItem(this.DUMP_KEY, JSON.stringify(data));

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

  filterApiItems(methods: Set<ApiMethod>): void {
    const empty = methods.size === 0;

    this.data.apiItems.forEach((item) => {
      item.matched = empty ? true : methods.has(item.__info.method);
    });
    this.send();
  }
}
