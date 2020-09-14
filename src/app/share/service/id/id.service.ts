import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  constructor() {}

  genID(): string {
    return 'id-' + Math.random().toString(36).substr(2);
  }
}
