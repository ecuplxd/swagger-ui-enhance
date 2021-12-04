import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SEARCH_RESULT_MOCK } from 'src/__test__';
import { ApiModule } from '../../api.module';
import { ApiSearchResultComponent } from './api-search-result.component';

describe('ApiSearchResultComponent', () => {
  let component: ApiSearchResultComponent;
  let fixture: ComponentFixture<ApiSearchResultComponent>;

  const setNamespaces = (): HTMLElement[] => {
    component.namespaces = SEARCH_RESULT_MOCK;
    fixture.detectChanges();

    const matLists: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      'mat-list'
    );

    return matLists;
  };

  const getSuggestionItems = (
    namespaceEl: HTMLElement,
    selector = '.suggestions'
  ): NodeListOf<Element> => {
    const items = namespaceEl.querySelectorAll(selector);
    return items;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ApiModule],
      declarations: [ApiSearchResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.namespaces).toEqual([], 'init #namespaces');
    expect(component.actived).toBe(0, 'init #actived');
    expect(component).toBeTruthy();
  });

  it('should show matched namespace', () => {
    const matLists: HTMLElement[] = setNamespaces();

    expect(component.namespaces[0].matched).toBe(true);
    expect(matLists[0].className.includes('hidden')).toBe(
      false,
      '0 namespace matched'
    );

    expect(component.namespaces[1].matched).toBe(true);
    expect(matLists[1].className.includes('hidden')).toBe(
      false,
      '1 namespace matched'
    );
  });

  it('should hidden no matched namespace', () => {
    const matLists: HTMLElement[] = setNamespaces();

    expect(component.namespaces[2].matched).toBe(false);
    expect(matLists[2].className.includes('hidden')).toBe(
      true,
      '2 namespace not matched'
    );
  });

  it('should show matched api', () => {
    const matLists: HTMLElement[] = setNamespaces();
    const items: NodeListOf<Element> = getSuggestionItems(matLists[0]);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      expect(component.namespaces[0].apiItems[i].__matched).toBe(
        true,
        `${i} api item matched`
      );
      expect(item.className.includes('hidden')).toBe(
        false,
        `${i} api item matched`
      );
    }
  });

  it('should hidden no matched api', () => {
    const matLists: HTMLElement[] = setNamespaces();
    const items: NodeListOf<Element> = getSuggestionItems(matLists[2]);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      expect(component.namespaces[2].apiItems[i].__matched).toBe(false);
      expect(item.className.includes('hidden')).toBe(
        true,
        `${i} api item not matched`
      );
    }
  });

  it('should matched item hightlight matched keywork', () => {
    setNamespaces();

    const matchedItems: HTMLDivElement[] = fixture.nativeElement.querySelectorAll(
      '.suggestions:not(.hidden)'
    );

    for (let i = 0; i < matchedItems.length; i++) {
      const item = matchedItems[i];

      const matched: HTMLSpanElement | null = item.querySelector('.matched');
      expect(matched!.innerText).toBe('pet');
    }
  });

  it('should actived item show request button', () => {
    const matLists: HTMLElement[] = setNamespaces();
    const items: NodeListOf<Element> = getSuggestionItems(
      matLists[0],
      '.suggestion-item'
    );

    const requestBtn0 = items[0].querySelector('app-api-request') as Element;
    const requestBtn1 = items[1].querySelector('app-api-request') as Element;

    const opacity0 = window.getComputedStyle(requestBtn0, null).opacity;
    const opacity1 = window.getComputedStyle(requestBtn1, null).opacity;

    expect(requestBtn0).toBeTruthy();
    expect(opacity0).toBe('1');

    expect(requestBtn1).toBeTruthy();
    expect(opacity1).toBe('0');
  });

  it('should emit #selectApi when select a api item', () => {
    setNamespaces();

    spyOn(component.selectApi, 'emit').and.callThrough();

    const item = fixture.debugElement.query(By.css('.suggestion-item'));
    item.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectApi.emit).toHaveBeenCalledWith([0, 0]);
  });

  it('should mark deprecated api', () => {
    const matLists: HTMLElement[] = setNamespaces();
    const items: NodeListOf<Element> = getSuggestionItems(matLists[0]);

    expect(items[0].className.includes('deprecated')).toBe(
      false,
      '0 api is not deprecated'
    );
    expect(items[1].className.includes('deprecated')).toBe(
      false,
      '1 api is not deprecated'
    );
    expect(items[3].className.includes('deprecated')).toBe(
      true,
      '3 api is deprecated'
    );
  });

  it('should mark actived api item', () => {
    component.actived = 1;

    const matLists: HTMLElement[] = setNamespaces();
    const items: NodeListOf<Element> = getSuggestionItems(
      matLists[0],
      '.suggestion-item'
    );

    expect(items[0].className.includes('actived')).toBe(
      false,
      '0 not cur actived item'
    );
    expect(items[1].className.includes('actived')).toBe(
      true,
      '1 cur actived item'
    );
  });
});
