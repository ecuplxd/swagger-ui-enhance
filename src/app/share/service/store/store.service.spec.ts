import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { ApiItem } from 'src/app/api/api.model';
import { Project } from 'src/app/project/project.model';
import { STORE_DATA_MOCK2 } from 'src/__test__';
import { Any } from '../../share.model';
import { ProxyService } from '../proxy/proxy.service';
import { TypeService } from '../type/type.service';
import { StoreService } from './store.service';

class MatSnackBarStub {
  open(): void {}
}

class LocationStub {
  replaceState(): void {}
}

class ProxyServiceStub {
  proxy(): Observable<Project> {
    return of(STORE_DATA_MOCK2.project);
  }
}

describe('StoreService', () => {
  let service: StoreService;
  let location2: Location;

  const setData = () => {
    service['data'] = STORE_DATA_MOCK2;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TypeService,
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        },
        {
          provide: ProxyService,
          useClass: ProxyServiceStub,
        },
        {
          provide: Location,
          useClass: LocationStub,
        },
      ],
    });

    service = TestBed.inject(StoreService);
    location2 = TestBed.inject(Location);
    setData();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort api by method key', () => {
    setData();

    expect(service.getSortKey()).toEqual('post');

    service.sortIndex++;

    expect(service.getSortKey()).toEqual('put');

    service.sortIndex++;

    expect(service.getSortKey()).toEqual('get');

    service.sortIndex++;

    expect(service.getSortKey()).toEqual('delete');

    service.sortIndex++;

    expect(service.getSortKey()).toEqual('post', 'recycle');
  });

  it('should can transform empty response', () => {
    spyOn(service, 'iterObj').and.callThrough();
    service.transformResponses();

    expect(service.iterObj).toHaveBeenCalledTimes(1);
  });

  it('should get namespace apis from project', () => {});

  it('should get namespace from api tag', () => {});

  it('should find api by id', () => {
    service.getApiItem('test');
  });

  it('should import api by url', () => {
    service.fetchProject('test');
  });

  it('should parse api json file', () => {
    let file = {} as Any;
    service.parseFile(file).catch((err: string) => {
      expect(err.includes('未知的文件类型'));
    });

    file = { type: 'jpg' };
    service.parseFile(file).catch((err: string) => {
      expect(err.includes('请导入 JSON 文件'));
    });

    file = {
      type: 'application/json',
      slice: () => {
        return {
          text: () => Promise.resolve('test'),
        };
      },
    };

    service.parseFile(file).catch((err: string) => {
      expect(err.includes('解析错误'));
    });

    file = {
      type: 'application/json',
      slice: () => {
        return {
          text: () => Promise.resolve(JSON.stringify(STORE_DATA_MOCK2.project)),
        };
      },
    };
    spyOn(service, 'importProject').and.callThrough();
    service.parseFile(file).catch((err: string) => {
      expect(service.importProject).toHaveBeenCalled();
    });
  });

  it('should import project', () => {
    const project = STORE_DATA_MOCK2.projects[2];
    service.importProject(project);
  });

  it('should select project', () => {
    service.selectProject(STORE_DATA_MOCK2.project);
  });

  it('should handle load no dumps data', () => {
    localStorage.clear();
    spyOn(service, 'transformProject');
    service['DUMP_KEY'] = 'test';
    service.loadDumpsData();

    expect(service.transformProject).not.toHaveBeenCalled();

    service['DUMP_KEY'] = 'SWAGGER_UI_ENHANCE';
  });

  it('should check tag empty', () => {
    expect(service.noTag([])).toBe(true);
  });

  it('should transformTag', () => {
    expect(service.transformTag('tag')).toEqual({
      name: 'tag',
      description: '--',
    });
  });

  it('should get tag from api', () => {
    expect(service.getApiTags({} as Any)).toEqual([]);
  });

  it('should transformApi', () => {
    const api = {} as Any;
    const result = service.transformApi(api, {} as Any, '');

    expect(result.__info.description).toEqual('该 API 缺少描述');
  });

  it('should #resolveApiTag()', () => {
    const api = {
      tags: ['test'],
    } as ApiItem;
    service.resolveApiTag(api, new Set<string>());
  });

  it('should toast import result', () => {
    spyOn(service, 'toastMessage').and.callThrough();
    service['projectExit'] = false;
    service.toastImportResult();

    expect(service.toastMessage).toHaveBeenCalledWith('导入成功');
  });

  it('should #addApiIntoNamespace()', () => {
    const project = ({
      namespaces: [
        {
          apiItems: [],
        },
      ],
    } as Any) as Project;
    const apiIndex = 1;
    const api = {
      tags: ['aaa', 'bbb'],
    } as ApiItem;

    service.addApiIntoNamespace(project, api, apiIndex);
  });

  it('should update api operationId in url', () => {
    spyOn(location2, 'replaceState');
    service['data'].apiItems = service['data'].project.namespaces[0].apiItems;
    service.updateUrl();

    expect(location2.replaceState).toHaveBeenCalled();
  });

  it('should get index data from url', () => {
    location.hash = `index#aaaa-0-0-1`;

    service.getIndexFromUrl();

    const { projectIndex, namespaceIndex, apiIndex } = service['data'].index;

    expect(projectIndex).toEqual(0);
    expect(namespaceIndex).toEqual(0);
    expect(apiIndex).toEqual(1);
  });
});
