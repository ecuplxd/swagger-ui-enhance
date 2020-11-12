import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdService } from 'src/app/share/service';
import { STORE_DATA_MOCK } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiParameterComponent } from './api-parameter.component';

describe('ApiParameterComponent', () => {
  let component: ApiParameterComponent;
  let fixture: ComponentFixture<ApiParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiParameterComponent],
      providers: [IdService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.copyItemClass).toBeTruthy('init create a copy id');
    expect(component.hadParameters).toBe(false, 'init not had parameters');
  });

  it('should show no parameters tip if #hadParameters=false', () => {
    const tr: HTMLTableRowElement = fixture.nativeElement.querySelector(
      '.no-data'
    );
    const div: HTMLDivElement = fixture.nativeElement.querySelector(
      '.description'
    );
    const copy = fixture.nativeElement.querySelector(
      '.parameter-fields app-copy'
    );

    expect(tr).toBeTruthy('show no parameters el');
    expect(div).toBeNull('no parameters to show');
    expect(copy).toBeNull(
      'no parameters, not show copy all parameter fields el'
    );
  });

  it('should show api parameters table if #hadParameters=true', () => {
    fixture = TestBed.createComponent(ApiParameterComponent);
    component = fixture.componentInstance;
    component.parameters = STORE_DATA_MOCK.apiItems[7].parameters;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hadParameters).toBe(true);

    const tr: HTMLTableRowElement = fixture.nativeElement.querySelector(
      '.no-data'
    );
    const copy = fixture.nativeElement.querySelector(
      '.parameter-fields app-copy'
    );
    const parameterItems: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.parameter-item'
    );
    const parameterTypes: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      'app-api-type'
    );
    const descriptions: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.description'
    );
    const parameterIns: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.parameter-in'
    );

    expect(component.hadParameters).toBe(true, 'api have parameters');
    expect(tr).toBeNull('hvae parameters, not show no parameters tip el');
    expect(copy).toBeTruthy(
      'hvae parameters, show copy all parameter fields el'
    );
    expect(parameterItems.length).toEqual(component.parameters.length);
    expect(parameterTypes.length).toEqual(component.parameters.length);
    expect(descriptions.length).toEqual(component.parameters.length);
    expect(parameterIns.length).toEqual(component.parameters.length);

    parameterTypes.forEach((item) =>
      expect(item).toBeTruthy('had parameter type el')
    );
    parameterIns.forEach((item, index) =>
      expect(item.innerText).toEqual('(' + component.parameters[index].in + ')')
    );
    descriptions.forEach((item, index) =>
      expect(item.innerText).toEqual(
        component.parameters[index].description as string
      )
    );
  });
});
