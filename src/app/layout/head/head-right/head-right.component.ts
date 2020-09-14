import { Component, OnInit } from '@angular/core';
import { Language } from '../../layout.model';

@Component({
  selector: 'app-head-right',
  templateUrl: './head-right.component.html',
  styleUrls: ['./head-right.component.less'],
})
export class HeadRightComponent implements OnInit {
  languages: Language[] = [
    {
      name: '简体中文',
      locale: 'zh-CN',
      alternate: 'zh-Hans',
      country: 'cn',
    },
    {
      name: 'English',
      locale: 'en',
      country: 'us',
      fallback: true,
    },
    {
      name: 'Deutsch',
      locale: 'de-DE',
      country: 'de',
    },
    {
      name: 'Français',
      locale: 'fr-FR',
      country: 'fr',
    },
    {
      name: 'Русский',
      locale: 'ru-RU',
      alternate: 'ru',
      country: 'ru',
    },
    {
      name: '한국어',
      locale: 'ko-KR',
      alternate: 'ko',
      country: 'kr',
    },
    {
      name: '日本語',
      locale: 'ja-JP',
      alternate: 'ja',
      country: 'jp',
    },
    {
      name: 'Help translate',
      locale: 'eo-UY',
      country: 'uy',
    },
  ];

  language: Language = this.languages[0];

  constructor() {}

  ngOnInit(): void {}

  changeLanguages(language: Language): void {
    this.language = language;
  }

  changeTheme(color: string): void {}
}
