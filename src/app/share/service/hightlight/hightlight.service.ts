import { Injectable } from '@angular/core';
import { StringObject } from '../../share.model';

@Injectable({
  providedIn: 'root',
})
export class HightlightService {
  colors: StringObject = {
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

  constructor() {
    this.createHightlight = this.createHightlight.bind(this);
  }

  createHightlight(name: string, key?: string): string {
    if (!name) {
      return name;
    }

    let result = '';

    if (name.includes('[]') && name !== '[]') {
      result += this.createHightlight(name.split('[]')[0], 'type');
      result += this.createHightlight('[]');
      return result;
    }

    if (name.includes(' | ') && name !== ' | ') {
      return name
        .split(' | ')
        .map((item) => this.createHightlight(item, 'text'))
        .join(this.createHightlight(' | '));
    }

    return `<span style="color: ${this.colors[key || name]};">${name}</span>`;
  }
}
