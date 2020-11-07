import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Any } from 'src/app/share/share.model';
import { ApiInfo } from '../api.model';
import { ApiModule } from '../api.module';
import { ApiInfoComponent } from './api-info.component';

describe('ApiInfoComponent', () => {
  let component: ApiInfoComponent;
  let fixture: ComponentFixture<ApiInfoComponent>;
  let nativeElement: Any;
  const apiInfo = {
    url: 'url',
    urlForCopy: 'urlForCopy',
    method: 'get',
    description: 'description',
  } as ApiInfo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiInfoComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    component.api = apiInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show api method, #showMethod=true', () => {
    const methodEl: HTMLElement = nativeElement.querySelector('.method');

    expect(methodEl.innerText).toBe('GET');
  });

  it('should not show api method, #showMethod=false', () => {
    component.showMethod = false;
    fixture.detectChanges();

    const methodEl: HTMLElement = nativeElement.querySelector('.method');

    expect(methodEl.innerText).toBe('');
  });

  it('should show api url, #showUrl=true', () => {
    const span: HTMLSpanElement = nativeElement.querySelector('.code');

    expect(span.innerText).toBe('urlForCopy');
  });

  it('should not show api url, #showUrl=false', () => {
    component.showUrl = false;
    fixture.detectChanges();

    const span = nativeElement.querySelector('.code');

    expect(span).toBeNull();
  });

  it('should show api description, #showDescription=true', () => {
    const span: HTMLSpanElement = nativeElement.querySelector('.sub-title');

    expect(span.innerText).toBe('description');
    expect(span.title).toBe('description');
  });

  it('should not show api description, #showDescription=false', () => {
    component.showDescription = false;
    fixture.detectChanges();

    const span: HTMLSpanElement = nativeElement.querySelector('.sub-title');

    expect(span).toBeNull();
  });

  it('shoud show api in one line style, #twoLine=false', () => {
    const el: HTMLElement = nativeElement;

    expect(el.className.includes('two-line')).toBeFalse();
  });

  it('should show api in two line style, #twoLine=true', () => {
    component.twoLine = true;
    fixture.detectChanges();

    const el: HTMLElement = nativeElement;

    expect(el.className.includes('two-line')).toBeTrue();
  });

  it('should can copy api url and description, #copyable=true', () => {
    component.showUrl = true;
    component.showDescription = true;
    fixture.detectChanges();

    const span: HTMLSpanElement = nativeElement.querySelector('.code');
    const copy = nativeElement.querySelector('.api-url app-copy');
    const copyDescription = nativeElement.querySelector(
      '.api-description app-copy'
    );

    expect(span.title).toBe('urlForCopy');
    expect(span.innerText).toContain('urlForCopy');
    expect(span.className.includes('mr-8')).toBeFalse();
    expect(copy).toBeTruthy();
    expect(copyDescription).toBeTruthy();
  });

  it('should can not copy api url, #copyable=false', () => {
    fixture = TestBed.createComponent(ApiInfoComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    component.api = apiInfo;
    component.copyable = false;
    fixture.detectChanges();

    const span: HTMLSpanElement = nativeElement.querySelector('.code');
    const copy = nativeElement.querySelector('.api-url app-copy');
    const copyDescription = nativeElement.querySelector(
      '.api-description app-copy'
    );

    expect(span.title).toBe('url');
    expect(span.innerText).toBe('url');
    expect(span.className.includes('mr-8')).toBeTrue();
    expect(copy).toBeNull();
    expect(copyDescription).toBeNull();
  });

  it('should mark deprecated api', () => {
    const div: HTMLDivElement = nativeElement.querySelector('.api-info');

    expect(div.className.includes('deprecated')).toBeFalse();

    component.api.deprecated = true;
    fixture.detectChanges();

    expect(div.className.includes('deprecated')).toBeTrue();
  });
});
