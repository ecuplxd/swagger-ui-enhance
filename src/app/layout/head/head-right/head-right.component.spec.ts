import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from 'src/app/share/service';
import { LayoutModule } from '../../layout.module';
import { HeadRightComponent } from './head-right.component';

describe('HeadRightComponent', () => {
  let component: HeadRightComponent;
  let fixture: ComponentFixture<HeadRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, LayoutModule],
      declarations: [HeadRightComponent],
      providers: [
        TranslateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have github link', () => {
    const a: HTMLElement = fixture.nativeElement.querySelector('.github-href');

    expect(a).toBeTruthy();
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('href')).toBe(
      'https://github.com/ecuplxd/swagger-ui-enhance'
    );
    expect(a.title).toBe('https://github.com/ecuplxd/swagger-ui-enhance');
  });

  it('should have change theme el', () => {
    const btn = fixture.nativeElement.querySelector('.change-theme');

    expect(btn).toBeTruthy();
  });

  it('should have change lang el', () => {
    const btn = fixture.nativeElement.querySelector('.change-lang');

    expect(btn).toBeTruthy();
  });

  // TODO
  xit('should change lang', () => {
    const btn = fixture.debugElement.query(By.css('.change-lang'));
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.language).toEqual(
      {
        name: '简体中文',
        locale: 'zh-CN',
        alternate: 'zh-Hans',
        country: 'cn',
      },
      'pre language'
    );

    const langs: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '.lang-item'
    );
    langs[1].click();

    expect(component.language).toEqual(
      {
        name: 'English',
        locale: 'en',
        country: 'us',
        fallback: true,
      },
      'cur language'
    );
  });

  it('should change theme', () => {
    expect(component.changeTheme('')).toBeUndefined();
  });
});
