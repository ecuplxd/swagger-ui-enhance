import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import * as monaco from 'monaco-editor';
import { Size } from 'src/app/api/api.model';
import { IdService } from '../../service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  private _value!: string;
  @Input() set value(value: string) {
    this._value = value;
    if (!value) {
      return;
    }
    this.updateValue(value);
  }
  get value(): string {
    return this._value;
  }

  @Input() theme = 'vs-dark';

  @Input() lineNumbers: 'on' | 'off' | 'relative' | 'interval' = 'on';

  @Input() minimap = true;

  // TODO：优化
  @Input() set size(size: Size) {
    setTimeout(() => {
      this.updateContainerSize('', size);
    }, 100);
  }

  @Input() set resize(flag: boolean) {
    if (flag) {
      console.log('resize');
      this.updateContainerSize('true');
    }
  }

  @Output() format = new EventEmitter<string>();

  editor!: monaco.editor.IStandaloneCodeEditor;

  editorId!: string;

  MAX_HEIGHT = 400;
  MAX_WIDTH = 500;
  LINE_HEIGHT = 20;

  constructor(private idService: IdService) {
    this.editorId = this.idService.genID();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tryInitEditorFail();
  }

  ngOnDestroy(): void {}

  initEditor(): void {
    const el = document.getElementById(this.editorId);

    if (el) {
      this.editor = monaco.editor.create(el, {
        theme: this.theme,
        value: this.value,
        lineNumbers: this.lineNumbers,
        language: 'typescript',
        fontSize: 14,
        tabSize: 2,
        automaticLayout: true,
        minimap: {
          enabled: this.minimap,
        },
      });

      this.formatCode();

      this.updateValue = (value: string = '') => {
        this.editor.setValue(value);
        this.updateContainerSize(value);
      };
    }
  }

  formatCode(): void {
    setTimeout(() => {
      this.editor
        .getAction('editor.action.formatDocument')
        .run()
        .then(() => {
          const model = this.editor.getModel();
          if (model) {
            this.format.emit(model.getValue());
          }
        });
    }, 100);
  }

  tryInitEditorFail(): boolean {
    if (!this.editor) {
      this.initEditor();
    }

    return !this.editor;
  }

  updateContainerSize(value: string, size?: Size): void {
    if (this.tryInitEditorFail()) {
      return;
    }

    if (!value && size) {
      this.editor.layout({
        width: size.width,
        height: size.height,
      });
      return;
    }

    if (value === '// TODO') {
      return;
    }

    const line: number = this.editor.getModel()?.getLineCount() || 0;
    let height = (line + 2) * this.LINE_HEIGHT;
    height = height > this.MAX_HEIGHT ? this.MAX_HEIGHT : height;

    this.editor.layout({
      width: this.MAX_WIDTH,
      height,
    });
  }

  updateValue(value: string = ''): void {
    if (this.tryInitEditorFail()) {
      return;
    }

    this.editor.setValue(value);
    this.updateContainerSize(value);
  }
}
