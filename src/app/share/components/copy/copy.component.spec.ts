import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from 'src/__test__';
import { ShareModule } from '../..';
import { CopyService } from '../../service';
import { CopyComponent } from './copy.component';

class CopyServiceStub {
  copy(): void {}
}

describe('CopyComponent', () => {
  let component: CopyComponent;
  let copyService: CopyService;
  let fixture: ComponentFixture<CopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ShareModule],
      declarations: [CopyComponent],
      providers: [
        {
          provide: CopyService,
          useClass: CopyServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyComponent);
    component = fixture.componentInstance;
    copyService = TestBed.inject(CopyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBe('', 'init #value');
    expect(component.title).toBe('复制', 'init #title');
    expect(component.selector).toBeUndefined('init #selector');
  });

  it('should set copy tip', () => {
    const copyIconEl: HTMLElement = fixture.nativeElement.querySelector(
      'mat-icon'
    );

    expect(copyIconEl.title).toEqual('复制', 'default title');

    component.title = '复制描述';
    fixture.detectChanges();

    expect(copyIconEl.title).toEqual('复制描述');
  });

  it('should copy by #value', () => {
    component.value = 'value';
    fixture.detectChanges();

    spyOn(copyService, 'copy');
    const copyIconDe = fixture.debugElement.query(By.css('mat-icon'));
    click(copyIconDe);

    expect(copyService.copy).toHaveBeenCalledWith('value', false);
  });

  it('should copy by #selector', () => {
    component.selector = 'mat-icon';
    fixture.detectChanges();

    spyOn(copyService, 'copy');
    const copyIconDe = fixture.debugElement.query(By.css('mat-icon'));
    click(copyIconDe);

    expect(copyService.copy).toHaveBeenCalledWith('mat-icon', true);
  });
});
