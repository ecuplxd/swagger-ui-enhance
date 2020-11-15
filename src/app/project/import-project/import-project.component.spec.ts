import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { hasClass, Page, StoreServiceStub } from 'src/__test__';
import { ProjectModule } from '../project.module';
import { ImportProjectComponent } from './import-project.component';

describe('ImportProjectComponent', () => {
  let page: Page<ImportProjectComponent>;
  let component: ImportProjectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, ProjectModule, FormsModule],
      declarations: [ImportProjectComponent],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(ImportProjectComponent, false);
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.byUrl).toBe(true, 'default #byUrl');
    expect(component.byLocal).toBe(false, 'default #byLocal');
    expect(component.url).toEqual('', 'init #url');
    expect(component.destroy).toBe(false, 'init #destroy');
    expect(component.loading).toBe(false, 'init #loading');
    expect(component.demoUrl).toEqual('https://petstore.swagger.io/v2/swagger.json', 'init #demoUrl');
  });

  it('should #url use default #demoUrl if no project', fakeAsync(() => {
    page.installEmptyData();

    tick();

    const urlInput = page.query<HTMLInputElement>('input.update-url');

    expect(urlInput.value).toEqual('https://petstore.swagger.io/v2/swagger.json');
    expect(component.url).toEqual('https://petstore.swagger.io/v2/swagger.json');

    flush();
  }));

  it('should #url use project.updateUrl', fakeAsync(() => {
    /* expect split */
    expect(component.url).toEqual('', 'init');

    page.installData();

    tick();

    const urlInput = page.query<HTMLInputElement>('input.update-url');

    expect(urlInput.value).toEqual('https://petstore.swagger.io/v2/swagger.json');
    expect(component.url).toEqual('https://petstore.swagger.io/v2/swagger.json');

    /* expect split */
    page.store.useProject(1);
    page.doNgOnInit().detectChanges();

    tick();

    expect(urlInput.value).toEqual('', 'project no #updateUrl');
    expect(component.url).toEqual('', 'project no #updateUrl');

    page.store.useProject(0);
    flush();
  }));

  it('should disabled button in #loading or !#url', () => {
    component.loading = true;
    page.detectChanges();

    let btnDisabled = page.getAttr<HTMLButtonElement>('button', 'disabled');

    expect(btnDisabled).toBe('true');

    component.loading = false;
    component.url = '';
    page.detectChanges();

    btnDisabled = page.getAttr<HTMLButtonElement>('button', 'disabled');

    expect(btnDisabled).toBe('true');

    component.url = '1';
    page.detectChanges();

    btnDisabled = page.getAttr<HTMLButtonElement>('button', 'disabled');

    expect(btnDisabled).toBeFalsy();
  });

  it('should loading button have loading class', () => {
    component.loading = true;
    page.detectChanges();

    const fetchBtn = page.query<HTMLButtonElement>('button');

    expect(hasClass(fetchBtn, 'loading')).toBe(true);
  });

  it('should only #fetchFile() #url valid', () => {
    spyOn(page.store, 'fetchProject').and.callThrough();

    page.detectChanges();
    component.url = '';

    const fetchBtn = page.query<HTMLButtonElement>('button');
    page.click(fetchBtn);

    expect(page.store.fetchProject).not.toHaveBeenCalled();

    component.url = 'www.baidu.com';
    page.click(fetchBtn);

    expect(page.store.fetchProject).toHaveBeenCalledWith('www.baidu.com');
  });

  xit('should select input text when focus', () => {

  });

  it('should re gen new file input if select file', fakeAsync(() => {
    component.byLocal = true;
    page.detectChanges();

    const fileInput = page.query<HTMLInputElement>('input.file-input');
    const payload: Any = { target: { files: [] } };
    const payload2: Any = { target: { files: null } };
    const payload3: Any = { target: { files: [1] } };

    /* expect split */
    component.parseFile(payload);
    page.detectChanges();

    expect(fileInput).toEqual(page.query<HTMLInputElement>('input.file-input'));

    /* expect split */
    component.parseFile(payload2);
    page.detectChanges();

    expect(fileInput).toEqual(page.query<HTMLInputElement>('input.file-input'));


    /* expect split */
    expect(component.destroy).toBe(false, 'before parse');

    component.parseFile(payload3);
    page.detectChanges();

    expect(component.destroy).toBe(true, 'in parse');

    tick(600);

    expect(component.destroy).toBe(false, 'finished');
    expect(fileInput).not.toEqual(page.query<HTMLInputElement>('input.file-input'));

    flush();
  }));

  it('should #byUrl and #byLocal mutual exclusion', () => {
    component.byUrl = true;
    component.byLocal = false;
    page.detectChanges();

    expect(page.query<HTMLDivElement>('.import-by-url')).toBeTruthy('#byUrl=true');
    expect(page.query<HTMLDivElement>('.import-by-local')).toBeFalsy('#byLocal=false');

    component.byUrl = false;
    component.byLocal = true;
    page.detectChanges();

    expect(page.query<HTMLDivElement>('.import-by-url')).toBeFalsy('#byUrl=false');
    expect(page.query<HTMLDivElement>('.import-by-local')).toBeTruthy('#byLocal=true');
  });
});
