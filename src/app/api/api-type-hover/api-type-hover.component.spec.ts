import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CopyService, IdService, StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { Page, StoreServiceStub } from 'src/__test__';
import { ApiTypeHoverComponent } from './api-type-hover.component';

@Component({
  selector: 'app-editor',
  template: `<pre>{{ value }}</pre>`,
})
class EditorStubComponent {
  @Input() id!: string;

  @Input() value!: string;

  @Input() minimap = true;

  @Input() resize!: boolean;

  @Output() format = new EventEmitter<string>();
}

describe('ApiTypeHoverComponent', () => {
  let page: Page<ApiTypeHoverComponent>;
  let component: ApiTypeHoverComponent;
  let copyService: CopyService;
  const code = `
export class Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?:
    | 'available'
    | 'pending'
    | 'sold';
}

export class Category {
  id?: number;
  name?: string;
}

export class Tag {
  id?: number;
  name?: string;
}
`;

  const noQuestionCode = `
export class Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status:
    | 'available'
    | 'pending'
    | 'sold';
}

export class Category {
  id: number;
  name: string;
}

export class Tag {
  id: number;
  name: string;
}
`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatSnackBarModule,
        MatSlideToggleModule,
        MatButtonModule,
        HttpClientModule,
      ],
      declarations: [ApiTypeHoverComponent, EditorStubComponent],
      providers: [
        IdService,
        CopyService,
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(ApiTypeHoverComponent);
    page.installData();
    component = page.component;
    copyService = TestBed.inject(CopyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set #code', () => {
    expect(component.code).toBeUndefined('init #code');
    expect(component.codeString).toBe('', 'init #codeString');

    component.code = code;

    expect(component.code).toEqual(code);
    expect(component.codeString).toEqual(code);
  });

  it('should resize editor if set exits code', () => {
    component.resize = false;
    component.code = code;

    expect(component.resize).toBe(false, 'first set');

    component.code = code;

    expect(component.resize).toBe(true, 'second set');
  });

  it('should remove ? in code', () => {
    component.code = code;

    expect(component.noQuestionCode).toEqual('', 'before remove');
    expect(component.removeQuestion).toBe(false, 'before remove');

    component.removeCodeQuestion({ checked: true } as Any);

    expect(component.codeString).toEqual(noQuestionCode, 'after remove');
    expect(component.noQuestionCode).toEqual(noQuestionCode, 'after remove');
    expect(component.removeQuestion).toBe(true, 'before remove');

    component.removeCodeQuestion({ checked: false } as Any);

    expect(component.codeString).toEqual(code, 'use has question code');
  });

  it('should fixed popover', () => {
    component.fixed = false;

    expect(component.fixed).toBe(false, 'before toggle');

    component.fixedPopover({ checked: true } as Any);

    expect(component.fixed).toBe(true, 'second toggle');

    component.fixedPopover({ checked: false } as Any);

    expect(component.fixed).toBe(false, 'third toggle');
  });

  it('should get mock code', () => {
    component.code = code;

    expect(component.codeString).toEqual(code);
    expect(component.showSample).toBe(false);

    component.getMockCode({ checked: true } as Any);

    expect(component.codeString).toEqual('// TODO', 'use sample code');
    expect(component.showSample).toBe(true);

    component.getMockCode({ checked: false } as Any);

    expect(component.codeString).toEqual(
      code,
      'not use example code, fallback raw code'
    );

    component.removeQuestion = true;
    component.removeCodeQuestion({ checked: true } as Any);
    component.getMockCode({ checked: false } as Any);

    expect(component.codeString).toEqual(
      noQuestionCode,
      'not use example code, fallback no question code'
    );
  });

  it('should copy the code', () => {
    component.code = code;
    spyOn(copyService, 'copy');
    spyOn(component.closeMenu, 'emit');
    const de = page.queryDe('.copy-code');
    page.clickDe(de).detectChanges();

    expect(copyService.copy).toHaveBeenCalledWith(code, false);
    expect(component.closeMenu.emit).toHaveBeenCalled();
  });

  it('should not close after copy if set #fixed', () => {
    component.fixed = true;
    component.code = code;
    spyOn(copyService, 'copy');
    spyOn(component.closeMenu, 'emit');
    const de = page.queryDe('.copy-code');
    page.clickDe(de).detectChanges();

    expect(copyService.copy).toHaveBeenCalledWith(code, false);
    expect(component.closeMenu.emit).not.toHaveBeenCalled();
  });

  it('should emit #close cick esc', () => {
    spyOn(component.closeMenu, 'emit');
    window.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Escape',
      })
    );

    expect(component.closeMenu.emit).toHaveBeenCalled();

    window.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter',
      })
    );

    expect(component.closeMenu.emit).toHaveBeenCalledTimes(1);
  });

  it('should close by click btn', () => {
    spyOn(component.closeMenu, 'emit');
    const de = page.queryDe('.close');
    page.clickDe(de).detectChanges();

    expect(component.closeMenu.emit).toHaveBeenCalled();
  });

  it('should use #useFoarmatCode() code', () => {
    component.code = '1';

    expect(component.code).toEqual('1', 'before foramt');

    component.useFoarmatCode('code');

    expect(component.code).toEqual('code', 'after format');

    component.useFoarmatCode('code');

    expect(component.code).toEqual('code', 'nothing to changed');
  });
});
