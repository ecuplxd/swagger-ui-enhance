import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as monaco from 'monaco-editor';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
    this.updateValue(value);
  }

  get value(): string {
    return this._value;
  }

  // tslint:disable-next-line: variable-name
  private _size!: Size;
  @Input() set size(size: Size) {
    this._size = size;
    this.reLayoutBySize(size);
  }

  get size(): Size {
    return this._size;
  }

  @Input() set resize(flag: boolean) {
    if (flag) {
      this.updateContainerSize();
    }
  }

  @Input() theme = 'vs-dark';

  @Input() lineNumbers: 'on' | 'off' | 'relative' | 'interval' = 'on';

  @Input() minimap = true;

  @Output() format = new EventEmitter<string>();

  editor!: monaco.editor.IStandaloneCodeEditor;

  editorId!: string;

  MAX_HEIGHT = 400;

  MAX_WIDTH = 550;

  LINE_HEIGHT = 20;

  EDITOR_CONFIG = {
    language: 'typescript',
    fontSize: 14,
    tabSize: 2,
    automaticLayout: true,
  };

  formated = false;

  constructor(private idService: IdService) {
    this.editorId = this.idService.genID();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tryInitEditorFail(this.value);
  }

  ngOnDestroy(): void {}

  initEditor(value: string = ''): void {
    const el = document.getElementById(this.editorId);
    if (!el) {
      return;
    }

    this.editor = monaco.editor.create(el, {
      ...this.EDITOR_CONFIG,
      theme: this.theme,
      value,
      lineNumbers: this.lineNumbers,
      minimap: {
        enabled: this.minimap,
      },
    });

    this.reLayoutBySize();

    this.formatCode();
    this.updateContainerSize = this.decideSizeByValue;
    this.updateValue = (val: string = '') => {
      this.editor.setValue(val);
      this.updateContainerSize();
    };
  }

  formatCode(): void {
    if (this.formated) {
      return;
    }

    of(1)
      .pipe(delay(1000))
      .subscribe(() => {
        this.editor
          .getAction('editor.action.formatDocument')
          .run()
          .then(() => {
            const model = this.editor.getModel();
            this.formated = true;
            if (model) {
              this.format.emit(model.getValue());
            }
          });
      });
  }

  tryInitEditorFail(value: string = ''): boolean {
    if (!this.editor) {
      this.initEditor(value);
    }

    return !this.editor;
  }

  updateContainerSize(): void {
    if (this.tryInitEditorFail()) {
      return;
    }

    this.decideSizeByValue();
  }

  reLayoutBySize(size?: Size): void {
    size = size || this.size;

    if (!this.editor || !size) {
      return;
    }

    this.editor.layout({
      width: size.width,
      height: size.height,
    });
  }

  decideSizeByValue(): void {
    const value = this.editor?.getModel()?.getValue();
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
    if (this.tryInitEditorFail(value)) {
      return;
    }

    this.editor.setValue(value);
    this.updateContainerSize();
  }
}
