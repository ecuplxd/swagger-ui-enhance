import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StoreService } from 'src/app/share/service';
import { StoreData } from 'src/app/share/share.model';
import { AuthInfo } from '../api.model';

@Component({
  selector: 'app-api-auth',
  templateUrl: './api-auth.component.html',
  styleUrls: ['./api-auth.component.less'],
})
export class ApiAuthComponent implements OnInit {
  showSetting = false;

  useProxy = false;

  auth: AuthInfo = {
    kind: 'cookie',
    apiUrl: '',
    token: '',
    cookie: [
      {
        key: '',
        value: '',
      },
    ],
  };

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store
      .getData$()
      .subscribe((data: StoreData) => this.setAuthData(data));
  }

  setAuthData(data: StoreData): void {
    this.useProxy = data.useProxy || false;

    const project = this.store.getCurPorject();

    if (project.auth) {
      this.auth = project.auth;
    }
  }

  addCookie(): void {
    this.auth.cookie.push({
      key: '',
      value: '',
    });
  }

  removeCookie(index: number): void {
    this.auth.cookie.splice(index, 1);
  }

  toggleSetting(toggle: MatSlideToggleChange): void {
    this.showSetting = toggle.checked;
  }

  toggleProxy(toggle: MatSlideToggleChange): void {
    this.useProxy = toggle.checked;
  }

  save(): void {
    this.store.setProjectAuth(this.auth, this.useProxy);
  }
}
