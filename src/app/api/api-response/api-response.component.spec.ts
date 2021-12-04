import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { STORE_DATA_MOCK } from 'src/__test__';
import { ApiModule } from '../api.module';
import { ApiResponseComponent } from './api-response.component';

describe('ApiResponseComponent', () => {
  let component: ApiResponseComponent;
  let fixture: ComponentFixture<ApiResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiResponseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.produce).toBe(
      'application/json',
      'default is application/json'
    );
    expect(component.produces).toEqual([], 'init is []');
    expect(component.responses).toEqual({}, 'init is {}');
    expect(component).toBeTruthy();
  });

  it('should show no response tip', () => {
    const noData: HTMLTableRowElement = fixture.nativeElement.querySelector(
      '.no-data'
    );
    const description: HTMLDivElement = fixture.nativeElement.querySelector(
      '.description'
    );

    expect(noData).toBeTruthy('have no data tip el');
    expect(description).toBeNull();
  });

  it('should show responses table', () => {
    component.responses = STORE_DATA_MOCK.apiItems[2].responses;
    fixture.detectChanges();

    const noData: HTMLTableRowElement = fixture.nativeElement.querySelector(
      '.no-data'
    );
    const description: HTMLDivElement = fixture.nativeElement.querySelector(
      '.description'
    );
    const trs: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll(
      '.response-item'
    );

    const keys = Object.keys(component.responses);

    expect(noData).toBeNull('have responses');
    expect(description).toBeTruthy();
    expect(trs.length).toEqual(keys.length);

    for (let i = 0; i < keys.length; i++) {
      const response = component.responses[+keys[i]];
      const tr = trs[i];

      const keyEl: HTMLDivElement | null = tr.querySelector('.response-key');
      const typeEl = tr.querySelector('app-api-type');
      const descriptionEl: HTMLDivElement | null = tr.querySelector(
        '.description'
      );

      expect(keyEl!.innerText.trim()).toBe(keys[i]);
      expect(typeEl).toBeTruthy('have response type el');
      expect(descriptionEl!.innerText.trim()).toBe(response.description);
    }
  });

  it('should not show reponse headers if no headers data', () => {
    component.responses = STORE_DATA_MOCK.apiItems[2].responses;
    fixture.detectChanges();

    const el: HTMLTableElement = fixture.nativeElement.querySelector(
      '.response-headers'
    );

    expect(el).toBeNull();
  });

  it('should show reponse headers if have reponse headers data', () => {
    component.responses = STORE_DATA_MOCK.namespaces[2].apiItems[3].responses;
    fixture.detectChanges();

    const response_200 = component.responses[200];

    const header200 = fixture.nativeElement.querySelector(
      '.header200'
    ) as HTMLTableRowElement;
    const header400 = fixture.nativeElement.querySelector(
      '.header400'
    ) as HTMLTableRowElement;

    expect(header200).toBeTruthy('response 200 have headers info');
    expect(header400).toBeNull('response 400 no headers info');

    const headerItems = header200.querySelectorAll('.response-header-item');

    const headers = Object.keys(response_200.headers!);

    expect(headerItems.length).toEqual(headers.length);

    for (let i = 0; i < headers.length; i++) {
      const key = headers[i];
      const header = response_200.headers![key];

      const keyEl = headerItems[i]?.querySelector(
        '.header-key'
      ) as HTMLDivElement;
      const typeEl = headerItems[i]?.querySelector(
        '.header-type'
      ) as HTMLDivElement;
      const descriptionEl = headerItems[i]?.querySelector(
        '.header-description'
      ) as HTMLDivElement;

      expect(keyEl.innerText).toEqual(key);
      expect(descriptionEl.innerText.trim()).toEqual(header.description);
      expect(typeEl.innerText.trim()).toEqual(component.types[header.type]);
    }
  });
});
