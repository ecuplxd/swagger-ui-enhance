import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from 'src/app/share/service';
import { Any } from 'src/app/share/share.model';
import { StoreServiceStub } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiAuthComponent } from './api-auth.component';

describe('ApiAuthComponent', () => {
  let component: ApiAuthComponent;
  let store: StoreService;
  let fixture: ComponentFixture<ApiAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiAuthComponent],
      imports: [BrowserAnimationsModule, ApiModule],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAuthComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new empty cookie to auth info', () => {
    component.auth.cookie = [];
    component.addCookie();

    expect(component.auth.cookie.length).toBe(1);

    component.addCookie();

    expect(component.auth.cookie.length).toBe(2);
  });

  it('should remove cookie by index', () => {
    component.auth.cookie = [];
    component.addCookie();
    component.addCookie();
    component.addCookie();

    component.removeCookie(2);

    expect(component.auth.cookie.length).toBe(2);

    component.removeCookie(1);

    expect(component.auth.cookie.length).toBe(1);
  });

  it('should toggleSetting', () => {
    component.showSetting = false;
    component.toggleSetting({ checked: true } as Any);

    expect(component.showSetting).toBeTrue();

    component.toggleSetting({ checked: false } as Any);

    expect(component.showSetting).toBeFalse();
  });

  it('should toggleProxy', () => {
    component.useProxy = false;
    component.toggleProxy({ checked: true } as Any);

    expect(component.useProxy).toBeTrue();

    component.toggleProxy({ checked: false } as Any);

    expect(component.useProxy).toBeFalse();
  });

  it('should save project auth config', () => {
    component.addCookie();
    spyOn(store, 'setProjectAuth').and.callThrough();
    component.save();

    expect(store.setProjectAuth).toHaveBeenCalledWith(
      component.auth,
      component.useProxy
    );
  });

  it('should set auth data by store', () => {
    const data = {
      useProxy: false,
    };
    spyOn(store, 'getCurPorject').and.returnValue({
      auth: {
        kind: 'cookie',
        cookie: [],
      },
    } as Any);
    component.setAuthData(data as Any);

    expect(component.auth).toEqual({
      kind: 'cookie',
      cookie: [],
    } as Any);
  });
});
