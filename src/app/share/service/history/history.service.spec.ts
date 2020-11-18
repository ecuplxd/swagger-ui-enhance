import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #load history from local', () => {
    expect(service.load()).toBeUndefined();
  });

  it('should #dump history from local', () => {
    expect(service.dump()).toBeUndefined();
  });

  it('should #add() history item to local if not exits', () => {
    expect(service.historys).toEqual({}, 'init #historys');
    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.historys.test).toBeTruthy();
  });

  it('should #add() history to same kind record', () => {
    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.historys.test.length).toBe(1);

    service.add('', '/api/v1/user', []);

    expect(service.historys.test.length).toBe(1, 'still 1');

    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.historys.test.length).toBe(2, 'change to 2');
  });

  it('should get empty records if no #appId', () => {
    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.get('')).toEqual([]);
  });

  it('should get history by #apiId', () => {
    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.get('test').length).toBe(1, 'not empty');
  });

  it('should get history by #apiId and #name', () => {
    service.add('test', '/api/v1/user', [], 'editorValue');

    expect(service.getHistoryByName('test')).toBeUndefined('not found');

    const name = service.historys.test[0].name;

    expect(service.getHistoryByName('test', name)).toBeTruthy();
  });
});
