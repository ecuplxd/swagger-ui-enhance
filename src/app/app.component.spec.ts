import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { StoreServiceStub } from 'src/__test__';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { StoreService } from './share/service';
import { Any } from './share/share.model';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: StoreServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppModule],
      providers: [
        {
          provide: StoreService,
          useClass: StoreServiceStub,
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(StoreService) as StoreServiceStub;
    fixture.detectChanges();

    tick(600);

    expect(app).toBeTruthy();

    flush();
  }));

  it('should parse drop files', () => {
    spyOn(store, 'parseFile').and.callThrough();
    const files = [1] as Any;
    app.parseFiles(files);

    expect(store.parseFile).toHaveBeenCalled();
  });
});
