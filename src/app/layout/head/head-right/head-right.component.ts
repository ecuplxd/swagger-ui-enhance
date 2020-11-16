import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/share/service';
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
      fallback: true,
    },
    {
      name: 'English',
      locale: 'en-US',
      country: 'us',
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
  ];

  language: Language = this.languages[0];

  constructor(private translate: TranslateService) {
    const locale = this.translate.getLocale();
    const language = this.languages.find((item) => item.locale === locale);
    this.language = language || this.languages[0];
  }

  ngOnInit(): void {}

  // TODO
  changeLanguages(language: Language): void {
    this.translate.setLocale(language.locale).reload();
  }

  // TODO
  changeTheme(color: string): void {}
}
