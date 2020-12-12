import { TestBed } from '@angular/core/testing';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not tr el if no i18n mark', () => {
    const div = document.createElement('div');
    div.innerText = 'haha';
    service.trEl(div);

    expect(div.innerText).toEqual('haha');
  });

  it('should tr el if have i18n mark', () => {
    const div = document.createElement('div');
    div.setAttribute('tr', 'copy');
    div.innerText = '复制';

    service.locale = 'en-US';
    service.trEl(div);

    expect(div.innerText).toEqual('Copy');
  });

  it('should tr el attr if have i18n attr mark', () => {
    const div = document.createElement('div');
    div.setAttribute('tr', 'copy|title');

    service.locale = 'en-US';
    service.trEl(div);

    expect(div.getAttribute('title')).toEqual('Copy');
  });

  it('should #getTranslateText() get undefined if invalid locale & key', () => {
    service.locale = 'invalid';

    expect(service.tr('not exits')).toBeUndefined('not exits');
  });

  it('should reload page change lang', () => {
    const div = document.createElement('div');
    div.setAttribute('tr', 'copy|title');
    document.body.appendChild(div);
    spyOn(service, 'trEl');
    service.reload();

    expect(service.trEl).toHaveBeenCalled();
  });
});
