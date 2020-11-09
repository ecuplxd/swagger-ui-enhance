import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Any } from 'src/app/share/share.model';
import { API_METHODS } from '../api.model';
import { ApiModule } from '../api.module';
import { ApiMethodComponent } from './api-method.component';

describe('ApiMethodComponent', () => {
  let component: ApiMethodComponent;
  let fixture: ComponentFixture<ApiMethodComponent>;
  let nativeElement: Any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiMethodComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMethodComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show api method, #showMethod=true', () => {
    API_METHODS.forEach((item) => {
      component.method = item;
      fixture.detectChanges();

      const el: HTMLButtonElement = nativeElement.querySelector('button');

      expect(el.innerText).toBe(item.toUpperCase(), 'show api method el');
    });
  });

  it('should not show api method, #showMethod=false', () => {
    component.showMethod = false;
    API_METHODS.forEach((item) => {
      component.method = item;
      fixture.detectChanges();

      const el: HTMLButtonElement = nativeElement.querySelector('button');

      expect(el).toBeNull('not show api method el');
    });
  });

  it('should mark deprecated api method, #deprecated', () => {
    API_METHODS.forEach((item) => {
      component.method = item;
      component.deprecated = false;
      fixture.detectChanges();

      const el: HTMLButtonElement = nativeElement.querySelector('button');

      expect(el.className.includes('deprecated')).toBe(
        false,
        'api method not deprecated'
      );

      component.deprecated = true;
      fixture.detectChanges();

      expect(el.className.includes('deprecated')).toBe(
        true,
        'api method deprecated'
      );
    });
  });
});
