import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from 'src/app/share/service';
import { Page } from 'src/__test__';
import { LayoutModule } from '../../layout.module';
import { HeadRightComponent } from './head-right.component';

@Injectable()
class TranslateServiceStub extends TranslateService {
  reload(): this {
    return this;
  }
}

describe('HeadRightComponent', () => {
  let page: Page<HeadRightComponent>;
  let component: HeadRightComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, LayoutModule],
      declarations: [HeadRightComponent],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.removeItem('locale');
    page = new Page(HeadRightComponent);
    component = page.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have github link', () => {
    const a: HTMLElement = page.query('.github-href');

    expect(a).toBeTruthy();
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('href')).toBe(
      'https://github.com/ecuplxd/swagger-ui-enhance'
    );
    expect(a.title).toBe('https://github.com/ecuplxd/swagger-ui-enhance');
  });

  it('should have change theme el', () => {
    const btn = page.query('.change-theme');

    expect(btn).toBeTruthy();
  });

  it('should have change lang el', () => {
    const btn = page.query('.change-lang');

    expect(btn).toBeTruthy();
  });

  it('should change lang', () => {
    const btn = page.queryDe('.change-lang');
    page.clickDe(btn).detectChanges();

    expect(component.language).toEqual(
      {
        name: '简体中文',
        locale: 'zh-CN',
        alternate: 'zh-Hans',
        country: 'cn',
        fallback: true,
      },
      'pre language'
    );

    const langs: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '.lang-item'
    );
    langs[1].click();
    page.detectChanges();

    expect(component.language).toEqual(
      {
        name: 'English',
        locale: 'en-US',
        country: 'us',
      },
      'cur language'
    );
  });

  it('should change theme', () => {
    expect(component.changeTheme('')).toBeUndefined();
  });
});
