import { TestBed } from '@angular/core/testing';
import { ApiParameters, Schema } from 'src/app/api/api.model';
import { Any } from '../../share.model';
import { TypeService } from './type.service';

// tslint:disable-next-line: typedef
class Properties {
  [x: string]: string;
  type = 'string';
}

class Definitions {
  [x: string]: Any;
  test = {
    properties: new Properties(),
    required: [],
    type: 'string',
  };
}

Properties.prototype.c = 'test';
Definitions.prototype.c = 'test';

describe('TypeService', () => {
  let service: TypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #getProjectTypes()', () => {
    expect(service.getProjectTypes('aa')).toEqual({}, 'not found project aa');
  });

  it('should #getType()', () => {
    const parameter = {
      type: 'string',
      items: {
        type: '[]',
      },
    } as ApiParameters;

    expect(service.getType(parameter)).toEqual('string[]');
  });

  it('should #getTypes()', () => {
    const object1 = new Definitions() as Any;
    service.getTypes('aa', object1);

    expect(service.types.get('aa')).toEqual({
      Test: {
        __required: {},
        __example: {
          type: '',
        },
        __refTypes: [],
        __refMap2Key: new Map(),
        __mock: {},
        type: '',
      },
    });
  });

  it('should #formalTypeName()', () => {
    expect(service.formalTypeName('')).toEqual('');
  });

  it('should #getTypeFromSchema()', () => {
    const schema = {
      items: {
        type: 'string',
      },
    } as Schema;

    expect(service.getTypeFromSchema(schema)).toEqual('string');
  });

  it('should #mock() code', () => {
    expect(service.mock('undefined')).toEqual('__undefined__');
    expect(service.mock(undefined)).toEqual('__undefined__');
    expect(service.mock(null)).toEqual(null);
    expect(service.mock('null')).toEqual(null);
    expect(service.mock('enum')).toEqual({});
  });

  it('should #getExports()', () => {
    const visits = new Set<string>();
    visits.add('name');

    expect(service.getExports('aa', 'name[]', {}, visits)).toEqual('');

    const types = new Map();
    types.set('aa', {
      User: {
        __refTypes: ['Pet'],
        __refMap2Key: new Map(),
      },
    });
    service.types = types;

    expect(service.getExports('aa', 'User[]', {}, visits))
      .toEqual(`export class User {
}

`);
  });
});
