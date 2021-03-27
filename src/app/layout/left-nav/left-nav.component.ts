import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.less'],
})
export class LeftNavComponent implements OnInit {
  @HostBinding('style.width') get width(): string {
    return this.WIDTH[+this.expand];
  }

  expand = true;

  KEY = 'LEFT_NAV';

  WIDTH = ['66px', '300px'];

  year = new Date().getFullYear();

  constructor() {
    this.expand = JSON.parse(localStorage.getItem(this.KEY) || 'true');
  }

  ngOnInit(): void {
    this.handleExpand();
  }

  // TODO: 优化
  handleExpand(): void {
    const mainEl: HTMLDivElement | null = document.querySelector('.main');
    const apiItemsEl: HTMLDivElement | null = document.querySelector(
      '.api-items'
    );

    if (mainEl) {
      mainEl.style.paddingLeft = this.width;
    }

    if (apiItemsEl) {
      apiItemsEl.style.left = this.width;
    }
  }
}
