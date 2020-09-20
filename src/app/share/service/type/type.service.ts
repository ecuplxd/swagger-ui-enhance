import { Injectable } from '@angular/core';
import {
  PropertieItemValue,
  ProjectDefinition,
} from 'src/app/project/project.model';
import {
  Schema,
  ApiType,
  ApiParameters,
  ApiTypeValue,
} from 'src/app/api/api.model';
import { TYPE_MAP } from '../../const';
import { Any, AnyObject } from '../../share.model';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  TYPE_MAP = TYPE_MAP;

  type = '';

  refType = false;

  types: Map<string, ApiType> = new Map();

  constructor() {}

  getExports(projectId: string, name: string, mock: AnyObject = {}): string {
    const noArrayName = name.replace('[]', '');

    const type: ApiTypeValue = this.getProjectTypes(projectId)[noArrayName];
    const exports = [`export class ${noArrayName} {`];

    for (const key in type) {
      if (type.hasOwnProperty(key) && !key.startsWith('__')) {
        const required = type.__required[key] ? '' : '?';

        mock[key] = this.mock(type[key]);
        exports.push(`  ${key}${required}: ${type[key]};`);
      }
    }

    exports.push('}\n');
    exports.push(
      ...type.__refTypes
        .filter((item: string) => item !== noArrayName) // Note: 处理循环引用
        .map((item: string) => {
          const key = type.__refMap2Key.get(item);

          if (!key) {
            return '';
          }

          const isArray = type[key].includes('[]');

          return this.getExports(
            projectId,
            item,
            isArray ? mock[key][0] : mock[key]
          );
        })
    );

    return exports.join('\n');
  }

  getTypeName(ref: string): string {
    this.refType = ref.startsWith('#');
    const type = ref.substr(ref.lastIndexOf('/') + 1);
    return decodeURIComponent(type).trim();
  }

  isArray(type: string): boolean {
    return type === 'array';
  }

  isString(type: string): boolean {
    return type === 'string';
  }

  getProjectTypes(projectId: string): ApiType {
    return this.types.get(projectId) || {};
  }

  // TODO：优化
  getTypes(projectId: string, definitions: ProjectDefinition): this {
    const types: ApiType = {};

    for (const definition in definitions) {
      if (definitions.hasOwnProperty(definition)) {
        const config = definitions[definition];

        const refTypes = new Set<string>();

        types[definition] = {
          __required: {},
          __example: {},
          __refTypes: [],
          __refMap2Key: new Map(),
          __mock: {},
        };

        if (config.required) {
          config.required.map((item) => {
            types[definition].__required[item] = true;
          });
        }

        for (const filed in config.properties) {
          if (config.properties.hasOwnProperty(filed)) {
            const filedConfig = config.properties[filed];
            const type = this.getType(filedConfig);
            types[definition][filed] = type;
            types[definition].__example[filed] = filedConfig.example || type;

            if (this.refType) {
              refTypes.add(type.replace('[]', ''));
              types[definition].__refMap2Key.set(type.replace('[]', ''), filed);
            }
          }
        }

        types[definition].__refTypes = Array.from(refTypes);
      }
    }

    this.types.set(projectId, types);

    return this;
  }

  getStringEnum(enums: string[]): string {
    return '\n' + enums.map((item) => `  | '${item}'`).join('\n');
    // return enums.map((item) => `'${item}'`).join(' | ');
  }

  getType(parameter: ApiParameters | PropertieItemValue): string {
    this.refType = false;

    if (parameter.schema || parameter.$ref) {
      return this.getTypeFromSchema(parameter.schema || parameter);
    }

    let type = parameter.type;
    if (!type) {
      return '';
    }

    const isArray = this.isArray(type);
    const items = parameter.items;
    type = isArray ? '' : this.TYPE_MAP[parameter.type];

    if (items) {
      if (items.enum && this.isString(items.type)) {
        return this.getStringEnum(items.enum);
      }

      if (items.type) {
        type += items.type;
      } else {
        type += this.getTypeFromSchema(items);
      }

      if (isArray) {
        type += this.TYPE_MAP[parameter.type];
      }
    }

    if (parameter.enum && this.isString(type)) {
      return this.getStringEnum(parameter.enum);
    }
    return type;
  }

  getTypeFromSchema(
    schema: Schema | ApiParameters | PropertieItemValue
  ): string {
    let ref;

    if (schema.$ref) {
      ref = schema.$ref;
    } else {
      if (schema.items) {
        ref = schema.items.$ref || schema.items.type;
      } else {
        return this.TYPE_MAP[schema.type];
      }
    }

    const typeName = this.getTypeName(ref);
    if (this.isArray(schema.type)) {
      return typeName + '[]';
    }
    return typeName;
  }

  // TODO：是否有社区方案
  mock(type: string): Any {
    // enum
    if (type && type.includes('|')) {
      return type.trim().split('|').filter(Boolean)[0].trim().replace(/'/g, '');
    }

    // const isClass = type && /[A-Z]/.test(type[0]);
    // 中文[]
    const typeSplits = typeof type === 'string' ? type.split('[]') : [];

    if (typeSplits[0] !== 'string' && typeSplits[1] !== undefined) {
      return [{}];
    }

    switch (type) {
      case 'string':
        return 'string';
      case 'string[]':
        return ['string1', 'string2'];
      case 'number':
        return 1;
      case 'boolean':
        return true;
      case 'undefined':
      case undefined:
        return '__undefined__';
      case 'null':
      case null:
        return null;
      default:
        return {};
    }
  }
}
