const path = require('path');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (this.resourcePath.includes('api-toc.component.html')) {
    console.log(111);
  }

  const parse = new Parse(source, this.resourcePath);

  return parse.transform();
};

class Parse {
  static SPLIT_CHARTS = ['!', '[', '|', '?', '('];

  source = '';

  resourcePath = '';

  basename = '';

  inserts = {};

  constructor(source, resourcePath) {
    this.source = source;
    this.resourcePath = resourcePath;
    this.basename = path.basename(resourcePath);
  }

  transform() {
    this.parseMustache()
      .parseNgDirective()
      .parseDirective()
      .parseEventBinding()
      .parseTwoWayBinding()
      .parseBinding()
      .parseRef();

    const temps = Object.keys(this.inserts)
      .map((index) => parseInt(index, 10))
      .filter((index) => index >= 0)
      .sort((a, b) => a - b)
      .reverse()
      .map((index) => ({ index, text: this.inserts[index] }));

    temps.forEach((item) => {
      const pre = this.source.substring(0, item.index);
      const last = this.source.substring(item.index);

      this.source = pre + item.text + last;
    });

    return this.source;
  }

  findInsertIndex(last, sep = '>') {
    for (let i = last; i > 0; i--) {
      if (this.source[i] === sep) {
        return i;
      }
    }

    return -1;
  }

  getName(name, key) {
    Parse.SPLIT_CHARTS.forEach((chart) => {
      name = name.split(chart)[0];
    });

    name = name.trim();

    return ` ng-bind-${key || name}=${name} `;
  }

  getLine(source) {
    const match = source.match(/\\n/gi);
    const line = (match ? match.length : 0) + 1;

    return ` ng-html-line=${this.basename}:${line} `;
  }

  /*
    <div>{{ xx }}</div>
    <div>{{ !xx }}</div>
    <div>{{ xx.xx }}</div>
    <div>{{ xx ? a : b }}</div>
    <div>{{ xx | date: xxx }}</div>
  */
  parseMustache() {
    const reg = /\{\{(.+?)\}\}/g;
    const matches = [...this.source.matchAll(reg)];

    matches.forEach((match) => {
      const insertIndex = this.findInsertIndex(match.index);

      this.inserts[insertIndex] =
        this.getName(match[1]) +
        this.getLine(this.source.substr(0, match.index + match[0].length));
    });

    return this;
  }

  /*
    <div *ngFor="let a of xxxx"></div>
    <div *ngIf="xx"></div>
  */
  parseNgDirective() {
    return this;
  }

  /*
    <div *aaa="x"></div>
  */
  parseDirective() {
    return this;
  }

  /*
    <div (a) = " xxx() "></div>
    <div (a)="xxx($event, arg2, ...)"></div>
  */
  parseEventBinding() {
    // source 已被转译
    const reg = /\s+?\(.+?\)\s*=\\"\s*(.+?)\s*\\"\s*?/g;
    const matches = [...this.source.matchAll(reg)];

    matches.forEach((match) => {
      this.inserts[match.index] =
        this.getName(match[1], this.getKey(match[0])) +
        this.getLine(this.source.substr(0, match.index + match[0].length));
    });

    return this;
  }

  getKey(template) {
    const key = template.split('=')[0].trim();

    return key.replace('(', '').replace(')', '');
  }

  /*
    <div [(a)]="x"></div>
  */
  parseTwoWayBinding() {
    return this;
  }

  /*
    <div [a]="x"></div>
    <div [ngClass]="{}"></div>
  */
  parseBinding() {
    return this;
  }

  /*
    <div #ref></div>
  */
  parseRef() {
    return this;
  }
}
