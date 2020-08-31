function createHightlight(name, key) {
  if (!name) {
    return name;
  }

  const colors = {
    export: '#c586c0',
    class: '#569cd6',
    id: '#9cdcfe',
    type: '#4ec9b0',
    undefined: '#4ec9b0',
    text: '#ce9178',
    '{': '#d4d4d4',
    ':': '#d4d4d4',
    ';': '#d4d4d4',
    '[]': '#d4d4d4',
    ' | ': '#d4d4d4',
    '}': '#d4d4d4',
    '?': '#d4d4d4',
  };

  let result = '';

  if (name.includes('[]') && name !== '[]') {
    result += createHightlight(name.split('[]')[0], 'type');
    result += createHightlight('[]');
    return result;
  }

  if (name.includes(' | ') && name !== ' | ') {
    return name
      .split(' | ')
      .map((item) => createHightlight(item, 'text'))
      .join(createHightlight(' | '));
  }

  return `<span style="color: ${colors[key || name]};">${name}</span>`;
}

/* 
export class Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold ';
}

export class Category {
  id?: number;
  name?: string;
}

export class Tag {
  id: number;
  name: string;
}
*/
class TypeHelper {
  TYPE_MAP = {
    string: 'string',
    integer: 'number',
    file: 'File',
    boolean: 'boolean',
    object: 'Object',
    array: '[]',
  };

  type = '';
  refType = false;

  constructor(parameter) {
    this.type = this.getType(parameter);
  }

  static getExports(name, types) {
    name = name.replace('[]', '');
    const type = types[name];
    let exports = [
      `${createHightlight('export')} ${createHightlight(
        'class'
      )} ${createHightlight(name, 'type')} ${createHightlight('{')}`,
    ];
    for (const key in type) {
      if (type.hasOwnProperty(key) && !key.startsWith('__')) {
        const required = type.__required[key] ? '' : createHightlight('?');
        exports.push(
          `  ${createHightlight(key, 'id')}${createHightlight(
            required
          )}${createHightlight(':')} ${createHightlight(
            '' + type[key],
            'type'
          )}${createHightlight(';')}`
        );
      }
    }
    exports.push(createHightlight('}') + '\n');

    exports.push(
      ...type.__refTypes
        .filter((item) => item !== name) // Note: 处理循环引用
        .map((item) => TypeHelper.getExports(item, types))
    );

    return exports.join('\n');
  }

  getTypeName(ref) {
    this.refType = true;
    return ref.substr(ref.lastIndexOf('/') + 1);
  }

  isArray(type) {
    return type === 'array';
  }

  isString(type) {
    return type === 'string';
  }

  getStringEnum(enums) {
    return enums.map((item) => `'${item}'`).join(' | ');
  }

  getType(parameter) {
    if (parameter.schema || parameter.$ref) {
      return this.getTypeFromSchema(parameter.schema || parameter);
    }
    let type = parameter.type;
    if (!type) {
      return '';
    }
    const isArray = this.isArray(type);
    type = isArray ? '' : this.TYPE_MAP[parameter.type];
    const items = parameter.items;
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

  getTypeFromSchema(schema) {
    let ref;
    if (schema.$ref) {
      ref = schema.$ref;
    } else {
      if (schema.items) {
        ref = schema.items.$ref;
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
}
